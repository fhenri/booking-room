"use client"

import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Room } from "@/types/room"

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "id",
    header: "Generated Id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "calendarId",
    header: "Google Calendar Id",
  },
  {
    id: "actions",
    enableHiding: false,
    //cell: ({ row }) => {
    cell: function Cell({ row, table}) {
      const mroom = row.original

      const handleDelete = () => {
        table.options.meta?.deleteRoom(mroom.id);
      };
  
      return (
        <Trash className="ml-2 h-4 w-4" onClick={handleDelete}/>
      )
    },
  },
]
