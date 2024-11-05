import { HttpStatusCode } from 'axios';  
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getRoom, setRoom, deleteRoom } from '@/services/room';
import { Room } from '@/types/room';

export const GET = auth(async (request, params) => {
    try {
        const roomId = params.params?.id as string
        const room = await getRoom(roomId);  
        if (!room || Object.keys(room).length === 0) {  
            return NextResponse.json(
                { message: `Room ${roomId} not found` }, 
                { status: HttpStatusCode.NotFound });  
        }  
        return NextResponse.json({ room });  
    } catch (error) {  
        return NextResponse.json(
            { message: error }, 
            { status: HttpStatusCode.BadRequest }
        );  
    }  
})
  
export const PUT = auth(async (request, params) => {
    try {
        const { name, capacity } = await request.json();
        const roomId = params.params?.id as string

        const thisRoom = await getRoom(roomId)
        if (!thisRoom || Object.keys(thisRoom).length === 0) {  
            return NextResponse.json(
                { message: `Room ${roomId} not found` }, 
                { status: HttpStatusCode.NotFound });  
        }  

        const room: Room = { 
            id: roomId, 
            name: name ? name : thisRoom.name,
            capacity: capacity ? parseInt(capacity, 10) : thisRoom.capacity 
        };
        await setRoom(room);
        return NextResponse.json({ room });
    } catch (error) {  
        return NextResponse.json(
            { message: error }, 
            { status: HttpStatusCode.BadRequest }
        );
    }  
})

export const DELETE = auth(async (request, params) => {
    try {
        const roomId = params.params?.id as string

        if (!roomId) {
            return NextResponse.json(
                { message: "Missing Room Identifier" }, 
                { status: HttpStatusCode.NotFound }
            );  
        }

        const room = await getRoom(roomId);  
        if (!room || Object.keys(room).length === 0) {  

            return NextResponse.json(
                { message: `Room ${roomId} not found` }, 
                { status: HttpStatusCode.NotFound }
            );  
        }  

        await deleteRoom(roomId);  
        return NextResponse.json(
            { message: `Product ${roomId} has been deleted` },
        );
    } catch (error) {  
        console.error("cannot delete room:", error)
        return NextResponse.json(
            { message: error }, 
            { status: HttpStatusCode.BadRequest }
        );  
    }  
})
