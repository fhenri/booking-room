import getRedisClient from '@/lib/redis';
import { Room } from '@/types/room';
import { listEvent } from './event';
import { calendar_v3 as googleCalendar } from "@googleapis/calendar";
import { parse, isBefore,  isAfter } from "date-fns";

export const setRoom = async (room: Room): Promise<void> => {
    const redisClient = await getRedisClient();
    await redisClient.hSet(`room:${room.id}`, room);
};

export const getRoom = async (id: string): Promise<Room | null> => {
    const redisClient = await getRedisClient();
    const data = await redisClient.hGetAll(`room:${id}`);
    return data as unknown as Room || null;
};

export const deleteRoom = async (id: string): Promise<void> => {
  const redisClient = await getRedisClient();
  await redisClient.del(`room:${id}`);
};

export const getAllRooms = async (): Promise<Room[]> => {
  const redisClient = await getRedisClient();
  const keys = await redisClient.keys('room:*');
  const rooms = await Promise.all(keys.map((key) => redisClient.hGetAll(key)));
  return rooms as unknown as Room[];
};

export const getAvailableRoom = async (
  date?: string, 
  timeFrom?: string,
  timeTo?: string,
  capacity?: string,
): Promise<Room[]> => {

  let rooms = await getAllRooms()

  // we first filter on capacity and remove room with not enough seats
  if (capacity) {
    rooms = rooms.filter(room => room.capacity >= parseInt(capacity, 10));
  }

  const startTime = parse(`${date} ${timeFrom}`, 'yyyy-MM-dd HH:mm', new Date());
  const endTime = parse(`${date} ${timeTo}`, 'yyyy-MM-dd HH:mm', new Date());

  // deal with async code
  const roomPromises = rooms.map(async room => {
    const events = await listEvent(room.id, date, 1)
    const hasConflict = events.some((event: googleCalendar.Schema$Event) => {
      const eventStart = new Date(event.start?.dateTime || '');
      const eventEnd = new Date(event.end?.dateTime || '');
      return isBefore(startTime, eventEnd) && isAfter(endTime, eventStart)
    })
    return { room, hasConflict };
  })

  const roomResults = await Promise.all(roomPromises);
  rooms = roomResults.filter(({ hasConflict }) => !hasConflict).map(({ room }) => room);

  return rooms;
}
