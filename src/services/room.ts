import getRedisClient from '@/lib/redis';
import { Room } from '@/types/room';

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
