"use client"; // Add this at the top

import React, { useState, useEffect } from 'react';

type RoomMember = {
  Room: string;
  Availability: string;
  Occupant: string;
};

export default function RoomManagement() {
  const [roomList, setRoomList] = useState<RoomMember[]>([]);

  useEffect(() => {
    fetch('/api/facility')
      .then((response) => response.json())
      .then((data) => setRoomList(data));
  }, []);

  const deleteRoom = (room: string) => {
    fetch(`/api/facility/${room}`, {
      method: 'DELETE',
    }).then(() => {
      setRoomList(roomList.filter((room) => room.room !== room));
    });
  };

  const addRoom = () => {
    const newRoom: RoomMember = {
      Room: prompt('Enter Room:') || '', // Prompt returns null if canceled, so default to an empty string
      Availability: prompt('Enter Availability:') || '',
      Occupant: prompt('Enter Occupant:') || '',
    };
    
    fetch('/api/facility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRoom),
    }).then((response) => response.json())
      .then((data) => setRoomList([...roomList, data]));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl">Facility Management</h1>
      <button onClick={addRoom} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Room</button>
      <table className="table-auto mt-8 w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Room</th>
            <th className="px-4 py-2">Availability</th>
            <th className="px-4 py-2">Occupant</th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((room)) => (
            <tr key={room.room} className="border-t">
              <td className="px-4 py-2">{room.Room}</td>
              <td className="px-4 py-2">{room.Availability}</td>
              <td className="px-4 py-2">{room.Occupant}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteRoom(room.room)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
