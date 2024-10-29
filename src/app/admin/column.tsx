"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Room } from "@/types/room"

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "id",
    header: "Generated Id",
  },
  {
    accessorKey: "name",
    header: "Room Name",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "calendarId",
    header: "Google Calendar Id",
  },
]
