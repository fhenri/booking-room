import { NextRequest, NextResponse } from "next/server"
import { createCalendar } from '@/services/google-calendar';
import { setRoom, getAllRooms } from '@/services/room';
import { Room } from '@/types/room';

export async function POST(request: NextRequest) {

    const { name, capacity } = await request.json();
    if (!name || !capacity) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const calendarId = await createCalendar(name)
    if (!calendarId) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const room: Room = {
      id: calendarId,
      name,
      capacity: parseInt(capacity, 10),
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
