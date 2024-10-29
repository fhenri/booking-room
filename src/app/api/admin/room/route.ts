import { NextRequest, NextResponse } from "next/server"
import { setRoom, getAllRooms } from '@/services/room';
import { Room } from '@/types/room';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
    const { name, capacity, calendarId } = await request.json();

    if (!name || !capacity || !calendarId) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const room: Room = {
      id: nanoid(),
      name,
      capacity: parseInt(capacity, 10),
      calendarId,
    };

    await setRoom(room);
    return NextResponse.json(
        { room },
        { status: 201 }
    );

}

export async function GET() {
    const rooms = await getAllRooms();
    return NextResponse.json(
        { rooms },
        { status: 200 }
    )
}
