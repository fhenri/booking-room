"use client"

import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef, Row } from "@tanstack/react-table"
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Capacity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    filterFn: (row: Row<Room>, id, filters: string[]) => {
      const roomCapacity = row.original.capacity
      let isMatched = false;

      filters.map(value => {
        const values = value.split("-")
        const min = parseInt(values[0])
        const max = parseInt(values[1])
        if (roomCapacity >= min && max && max >= roomCapacity) {
          isMatched = true;
        }
      })

      return isMatched;
    },
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
