"use client"; // Add this at the top

import React, { useState, useEffect } from 'react';

type RoomMember = {
  id: string;
  Availability: string;
  Occupant: string;
};

type ReservationMember = {
  Facility: string;
  Reservation: string;
  Member: string;
};

export default function RoomManagement() {
  const [roomList, setRoomList] = useState<RoomMember[]>([]);
  const [reservationList, setReservationList] = useState<ReservationMember[]>([]);

  useEffect(() => {
  fetch('/api/facility')
      .then((response) => response.json())
      .then((data) => setRoomList(data));     
  []);

 useEffect(() => {
    fetch('/api/Reservation')
      .then((response) => response.json())
      .then((data) => setReservationList(data));
  }, []);

  const deleteRoom = (id: string) => {
    fetch(`/api/facility/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setRoomList(roomList.filter((room) => room.id !== id));
    });
  };

  const addRoom = () => {
    const newRoom: RoomMember = {
      id: prompt('Enter Room ID:') || '', // Prompt returns null if canceled, so default to an empty string
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



  const deleteReservation = (Facility: string) => {
    fetch(`/api/reservation/${Facility}`, {
      method: 'DELETE',
    }).then(() => {
      setReservationList(reservationList.filter((reservation) => reservation.Facility !== Facility));
    });
  };

  const addReservation = () => {
    const newReservation: ReservationMember = {
      Facility: prompt('Enter Facility:') || '', // Prompt returns null if canceled, so default to an empty string
      Reservation: prompt('Enter Reservation:') || '',
      Member: prompt('Enter Member:') || '',
    };
    
    fetch('/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReservation),
    }).then((response) => response.json())
      .then((data) => setReservationList([...reservationList, data]));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl">Facility Management</h1>

       <h2 className="text-3xl">Room Management</h2>
       <button onClick={addRoom} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Room</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Room</th>
            <th className="px-4 py-2">Availability</th>
            <th className="px-4 py-2">Occupant</th>
          </tr>
        </thead>
        <tbody>
           {roomList.map((room) => (
            <tr key={room.id} className="border-t">
              <td className="px-4 py-2">{room.id}</td>
              <td className="px-4 py-2">{room.Availability}</td>
              <td className="px-4 py-2">{room.Occupant}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteRoom(room.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
      ))}
        </tbody>
      </table>

       <h2 className="text-3xl">Facility Reservations</h2>
      <button onClick={addReservation} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Reservation</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Facility</th>
            <th className="px-4 py-2">Reservation</th>
            <th className="px-4 py-2">Member</th>
          </tr>
        </thead>
        <tbody>
           {reservationList.map((reservation) => (
            <tr key={reservation.Facility} className="border-t">
              <td className="px-4 py-2">{reservation.Facility}</td>
              <td className="px-4 py-2">{reservation.Reservation}</td>
              <td className="px-4 py-2">{reservation.Member}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteReservation(reservation.Facility)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
      ))}
        </tbody>
      </table>
    </main>
  );
}
