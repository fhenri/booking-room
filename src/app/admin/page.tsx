import { columns } from "./column"
import { DataTable } from "./data-table"
import { getAllRooms } from '@/services/room';


const AdminPage = async () => {
    
    const data = await getAllRooms()
    // build an array of plain objects.
    const rooms = data.map(room => {
        return JSON.parse(JSON.stringify(room))
    })
    
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={rooms} />
      </div>
    )
};

export default AdminPage;