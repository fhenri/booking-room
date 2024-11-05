import { NextRequest, NextResponse } from "next/server"
import { listEvent, deleteEvent } from '@/services/event';

export async function GET (request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const roomId = searchParams.get("roomId")

    if (!roomId) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const startDate = searchParams.get("startDate") || undefined
    const schedules = await listEvent(roomId, startDate);
    return NextResponse.json(
        { schedules },
        { status: 200 }
    )
}

export async function DELETE (request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const roomId = searchParams.get("roomId")
    const eventId = searchParams.get("eventId")

    if (!roomId || !eventId) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const schedules = await deleteEvent(roomId, eventId);
    return NextResponse.json(
        { schedules },
        { status: 200 }
    )
}
