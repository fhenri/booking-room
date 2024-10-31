"use client"

import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Room } from "@/types/room"

export const columns: ColumnDef<Room>[] = [
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
    accessorKey: "id",
    header: "Calendar Id",
    size: 50,
    enableHiding: true,
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
