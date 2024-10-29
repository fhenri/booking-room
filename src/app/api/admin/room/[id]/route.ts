import { HttpStatusCode } from 'axios';  
import { NextRequest, NextResponse } from "next/server"
import { getRoom, setRoom, deleteRoom } from '@/services/room';
import { Room } from '@/types/room';

export async function GET(
    _: NextRequest, 
    { params }: { params: { id: string } }
) {
    try {  
        const room = await getRoom(params.id);  
        if (!room || Object.keys(room).length === 0) {  
            return NextResponse.json(
                { message: `Room ${params.id} not found` }, 
                { status: HttpStatusCode.NotFound });  
        }  
        return NextResponse.json({ room });  
    } catch (error) {  
        return NextResponse.json(
            { message: error }, 
            { status: HttpStatusCode.BadRequest }
        );  
    }  
}  
  
export async function PUT(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {  
    try {
        const { name, capacity, calendarId } = await request.json();

        if (!name || !capacity || !calendarId) {
            return NextResponse.json(
                { message: 'Missing required fields' }, 
                { status: HttpStatusCode.BadRequest }
            );
        }
    
        const room: Room = { 
            id: params.id, 
            name, 
            capacity: parseInt(capacity, 10), 
            calendarId 
        };
        await setRoom(room);
        return NextResponse.json({ room });  

    } catch (error) {  
        return NextResponse.json(
            { message: error }, 
            { status: HttpStatusCode.BadRequest }
        );
    }  
}  
  
export async function DELETE(
    _: NextRequest, 
    { params }: { params: { id: string } }
) {  
    try {  
        const room = await getRoom(params.id);  
        if (!room || Object.keys(room).length === 0) {  
            return NextResponse.json(
                { message: `Room ${params.id} not found` }, 
                { status: HttpStatusCode.NotFound }
            );  
        }  
        await deleteRoom(params.id);  
        return NextResponse.json(
            { message: `Product ${params.id} has been deleted` },
        );
    } catch (error) {  
        console.error("cannot delete room:", error)
        return NextResponse.json(
            { message: error }, 
            { status: HttpStatusCode.BadRequest }
        );  
    }  
}
