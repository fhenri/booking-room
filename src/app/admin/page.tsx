"use client"

import AddRoomForm from "@/components/form/AddRoomForm";
import { columns } from "./column"
import { DataTable } from "./data-table"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { Room } from "@/types/room"

const AdminPage = () => {
    
  /*
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/room`);
  const data = await response.json(); 
  */

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { toast } = useToast()

  const fetchRooms = async () => {
    setIsDataLoading(true)
    const response = await fetch('/api/admin/room');
    const data = await response.json();
    setRooms(data.rooms);
    setIsDataLoading(false)
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleRoomAdded = async (formData: FormData): Promise<Room | null> => {
    setIsAddingRoom(true);
    const roomData = {
      name: formData.get('name'),
      capacity: formData.get('capacity'),
    };

    // Make the API call to create a new room
    const response = await fetch("/api/admin/room", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    });

    setIsAddingRoom(false)
    if (response.ok) {
        const newRoom = await response.json();
        setRooms((prevRooms) => [...prevRooms, newRoom.room]);
        toast({
          duration: 2000,
          title: "Room added to the list",
        })
          return newRoom;
    } else {
      console.error(response)
      toast({
        duration: 2000,
        variant: "destructive",
        title: "Failed to add room",
        description: "There was a problem with your request. Please try again",
      })
      return null;
    }

  };

  const handleRoomDeleted = async (roomId: string) => {
    setRooms(rooms.filter( room => room.id !== roomId ))
    const response = await fetch(`/api/admin/room/${roomId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      toast({
        duration: 2000,
        title: "Room removed from the list",
      })
    } else {
      toast({
        duration: 2000,
        variant: "destructive",
        title: "Cannot remove room from the list",
        description: "There was a problem with your request. Please try again",
      })
    }
  };


    return (
      <div className="container mx-auto py-10">
        <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          Review Rooms
        </h2>
        <DataTable columns={columns} data={rooms} onRoomDeleted={handleRoomDeleted} isDataLoading={isDataLoading}/>
        <Separator className="my-4" />
        <AddRoomForm onRoomAdded={handleRoomAdded} isLoading={isAddingRoom}/>
      </div>
    )
};

export default AdminPage;