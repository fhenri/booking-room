"use client"

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Room } from "@/types/room"

interface AddRoomFormProps {
    onRoomAdded: (formData: FormData) => Promise<Room | null>;
  }
  
  const AddRoomForm: React.FC<AddRoomFormProps> = ({ onRoomAdded }) => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
    
        const form = event.currentTarget; 
        const formData = new FormData(form);
        const newRoom = await onRoomAdded(formData);
        if (newRoom) {
            form.reset();
        }
      };
    
    return (
        <section className="bg-white dark:bg-gray-900">
        <div className="py-2 mx-auto max-w-2xl lg:py-16">
            <form name="addRoom" id="addRoom" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="w-full">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                    </div>
                    <div className="w-full">
                        <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
                        <input type="number" name="capacity" id="capacity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="3" required />
                    </div>
                </div>
                <Button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center">
                  Add room
                </Button>
            </form>
        </div>
      </section>
    )
}

export default AddRoomForm