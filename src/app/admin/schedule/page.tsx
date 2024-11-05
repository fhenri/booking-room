"use client"

import React, {useEffect, useState} from "react";
import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { format, startOfWeek } from "date-fns";

interface RoomEvent {
    id: string;
    text: string;
    start: string;
    end: string;
}

const CalendarView = (
    { roomId, startDate, setIsDataLoading }: 
    { roomId: string, startDate: Date, setIsDataLoading: (loading: boolean) => void }
) => { 
    const [calendar, setCalendar] = useState(null);
    const [events, setEvents] = useState<RoomEvent[]>([]);

    const startWeek = format(startOfWeek(startDate), 'yyyy-MM-dd'); 

    const fetchEvents = async () => {
        setIsDataLoading(true)
        const params = new URLSearchParams({
            'roomId': roomId,
            'startDate': startWeek
        });
        const response = await fetch(`/api/admin/schedule?${params}`);
        const data = await response.json();
        const filteredEvents = data.schedules.map((schedule: any) => ({
            id: schedule.id,
            text: schedule.summary,
            start: schedule.start.dateTime,
            end: schedule.end.dateTime
        }));
        setEvents(filteredEvents);
        setIsDataLoading(false)
      };
    
      useEffect(() => {
        fetchEvents();
      }, [startDate]);
    
      const onEventClick = async (args: DayPilot.CalendarEventClickArgs) => {
        if (!calendar) return; // Ensure calendar is set
        const e = args.e

        const modal = await DayPilot.Modal.confirm(`Delete event<br/> ${e.text()}`);

        if (!modal.result) { return; }
        setIsDataLoading(true)

        const eventId = e.data.id;
        const params = new URLSearchParams({
            'roomId': roomId,
            'eventId': eventId
        });
        const response = await fetch(`/api/admin/schedule?${params}`, {
            method: 'DELETE',
          });

        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        setIsDataLoading(false)
    };

    return (
        <DayPilotCalendar
            viewType={"Week"}
            startDate={startWeek}
            timeRangeSelectedHandling={"Enabled"}
            events={events}
            onEventClick={onEventClick}
            controlRef={setCalendar}
        />
    );
}

const DatePicker = (
    { date, onDateChange, isDataLoading }: { 
        date: Date | undefined; 
        onDateChange: (date: Date) => void;
        isDataLoading: boolean }
) => {
   
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
          { isDataLoading ? <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
            <p className="ml-2 justify-center items-center">Loading...</p></> 
          : <><CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            </> }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
                if (date) {
                    onDateChange(date);
                }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
}

const SchedulePage = () => {
    const searchParam = useSearchParams();
    const roomId = searchParam.get("room")!;
    const [date, setDate] = React.useState<Date>(new Date())
    const [isDataLoading, setIsDataLoading] = useState(true);

    return (
        <div className="container mx-auto py-10">
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Review Meeting Room Schedule
            </h2>
            <div className="flex flex-col items-center space-y-4">
                <CalendarView roomId={ roomId } startDate={ date } setIsDataLoading={ setIsDataLoading }/>
                <div className="content-center">
                    <DatePicker date={date} onDateChange={setDate} isDataLoading={isDataLoading} />
                </div>
            </div>
        </div>
    )
}

export default SchedulePage
