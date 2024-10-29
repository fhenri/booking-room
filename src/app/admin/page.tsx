'use client'

import React, { useState } from 'react';

const AdminPage = () => {
    
    const [roomName, setRoomName] = useState<string>("");
    const [data, setData] = useState(null);

    const handleChange = async (e) => {
        setRoomName(e.target.value);
        //const roomName = e.target.value
        console.log(`find room: `, roomName)
        fetch(`/api/admin/room/${roomName}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }

    return (
        <div>
            Select the room
            <input 
                type="text" 
                name="room-name" 
                value={ roomName }
                placeholder='Select Your Meeting Room'
                onChange={ handleChange }
            />

        {data ? (
        <p style={{ fontSize: '50px' }}>
            Hello: {data.message}
        </p>
        ) : (
        <p>Loading...</p>
        )}
        </div>
    );
};

export default AdminPage;