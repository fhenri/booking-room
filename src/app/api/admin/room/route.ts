import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createCalendar } from '@/services/calendar';
import { setRoom, getAllRooms } from '@/services/room';
import { Room } from '@/types/room';

export const POST = auth(async (request) => {

    if (!request.auth) {
        return Response.json({ message: "Not authenticated" }, { status: 401 })
    }

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

})

export const GET = auth(async (request) => {

    if (!request.auth) {
        return Response.json({ message: "Not authenticated" }, { status: 401 })
    }
        
    const rooms = await getAllRooms();
    return NextResponse.json(
        { rooms },
        { status: 200 }
    )
})
