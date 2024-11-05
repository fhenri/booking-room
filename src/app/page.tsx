'use client'

import { useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash } from "lucide-react"
import { Room } from "@/types/room"
import { ReloadIcon } from '@radix-ui/react-icons'

export default function MeetingInviteForm() {
  const [guests, setGuests] = useState<string[]>([])
  const [newGuest, setNewGuest] = useState('')
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string>()
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isMeetingCreation, setIsMeetingCreation] = useState(false);
  
  const { toast } = useToast()

  const checkAvailableRoom = async (
    capacity: number
  ) => {
    setIsDataLoading(true)

    const dateElement = document.getElementById('date') as HTMLInputElement;
    const timeFromElement = document.getElementById('timeFrom') as HTMLInputElement;
    const timeToElement = document.getElementById('timeTo') as HTMLInputElement;
  
    const params = new URLSearchParams({
      'capacity': capacity.toString(),
      'date': dateElement?.value,
      'timeFrom': timeFromElement?.value,
      'timeTo': timeToElement?.value,
    });

    const response = await fetch(`/api/schedule?${params}`);
    const data = await response.json();
    setRooms(data.rooms);
    setIsDataLoading(false)
  }

  const createMeeting = async () => {
    setIsMeetingCreation(true)

    const titleElement = document.getElementById('title') as HTMLInputElement;
    const dateElement = document.getElementById('date') as HTMLInputElement;
    const timeFromElement = document.getElementById('timeFrom') as HTMLInputElement;
    const timeToElement = document.getElementById('timeTo') as HTMLInputElement;
    const descriptionElement = document.getElementById('description') as HTMLInputElement;
    
    if (!dateElement.value || !titleElement.value || !timeFromElement.value || !selectedRoom) {
      toast({
        variant: "destructive",
        title: "Meeting created successfully",
        description: "Make sure to fill in all required fields",
      })
      setIsMeetingCreation(false)
      return;
    }

    const meetingData = {
      title: titleElement?.value,
      date: dateElement?.value,
      timeFrom: timeFromElement?.value,
      timeTo: timeToElement?.value,
      description: descriptionElement?.value,
      guests: guests,
      roomId: selectedRoom,
    };

    const response = await fetch('/api/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meetingData),
    });


    setIsMeetingCreation(false)
    const result = await response.json();

    // Reset form fields
    setGuests([]);
    setNewGuest('');
    setSelectedRoom(''); 
    
    titleElement.value = '';
    dateElement.value = '';
    timeFromElement.value = '';
    timeToElement.value = '';
    descriptionElement.value = '';
    
    toast({
      title: "Meeting created successfully",
      description: result.event.message,
    })
  }

  const addGuest = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGuest && !guests.includes(newGuest)) {
      const updatedGuests = [...guests, newGuest]; 
      setGuests(updatedGuests);
      setNewGuest('');
      checkAvailableRoom(updatedGuests.length); 
    }
  }

  const removeGuest = (guest: string) => {
    const updatedGuests = guests.filter(g => g !== guest); 
    setGuests(updatedGuests);
    checkAvailableRoom(updatedGuests.length);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Create Meeting Invite</h1>
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter Meeting Title" required />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" onChange={() => checkAvailableRoom(guests.length)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeFrom">Time From</Label>
            <Input id="timeFrom" type="time" onChange={() => checkAvailableRoom(guests.length)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeTo">Time To</Label>
            <Input id="timeTo" type="time" onChange={() => checkAvailableRoom(guests.length)} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter Meeting Description" rows={4} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Guests</Label>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex space-x-2">
                    <Input
                        id="guests"
                        type="email"
                        placeholder="Enter Guest Email"
                        value={newGuest}
                        onChange={(e) => setNewGuest(e.target.value)}
                      />
                    <Button type="submit" variant="secondary" onClick={addGuest}>Add</Button>
                  </TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
            </Table>
            <ScrollArea className="h-[110px]">
              <Table>
                <TableBody>
                  {guests.map((guest) => (
                    <TableRow key={guest}>
                      <TableCell>{guest}</TableCell>
                      <TableCell className="w-[100px]">
                        <Trash className="ml-2 h-4 w-4" 
                              onClick={() => removeGuest(guest)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="room">Select Meeting Room</Label>
          <Select onValueChange={(value) => setSelectedRoom(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Meeting Room" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel> -- Available Room -- </SelectLabel>
                {isDataLoading ? (
                <div className="flex flex-col justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                  <p className="ml-2 justify-center items-center">Loading...</p>
                </div>
                ) : (rooms && rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    { room.name }
                  </SelectItem>))
                )}                
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center" onClick={createMeeting} disabled={isMeetingCreation}>
          { isMeetingCreation ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Please wait ...</>
          : "Create Meeting Invite" }
        </Button>
      </form>
    </div>
  )
}
