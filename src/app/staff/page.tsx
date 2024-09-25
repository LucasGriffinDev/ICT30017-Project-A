"use client"; // Add this at the top

import React, { useState, useEffect } from 'react';

type ReserveMember = {
  facility: string;
  reservation: string;
  member: string;
};

export default function ReservationManagement() {
  // Specify that reserveList is an array of ReserveMember objects
  const [reserveList, setReserveList] = useState<ReserveMember[]>([]);

  useEffect(() => {
    // Fetch reserve data when the component mounts
    fetch('/api/reserve')
      .then((response) => response.json())
      .then((data) => setReserveList(data));
  }, []);

  // Specify that facility is a string
  const deleteReserve = (facility: string) => {
    fetch(`/api/reserve/${facility}`, {
      method: 'DELETE',
    }).then(() => {
      // Filter out the reserve member with the matching ID
      setReserveList(reserveList.filter((reserve) => reserve.facility !== facility));
    });
  };

  const addReserve = () => {
    // Ensure the newReserve object conforms to the ReserveMember type
    const newReserve: ReserveMember = {
      facility: prompt('Enter ID:') || '', // Prompt returns null if canceled, so default to an empty string
      reservation: prompt('Enter Name:') || '',
      member: prompt('Enter Role:') || '',
      qualifications: prompt('Enter Qualifications:') || '',
      employmentType: prompt('Enter Employment Type:') || '',
      remuneration: prompt('Enter Remuneration:') || '',
      training: prompt('Enter Training:') || '',
    };
    
    fetch('/api/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReserve),
    }).then((response) => response.json())
      .then((data) => setReserveList([...reserveList, data]));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl">Reservation Management</h1>
      <button onClick={addReserve} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Reservation</button>
      <table className="table-auto mt-8 w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Facility</th>
            <th className="px-4 py-2">Reservation</th>
            <th className="px-4 py-2">Member</th>
          </tr>
        </thead>
        <tbody>
          {reserveList.map((reserve) => (
            <tr key={reserve.facility} className="border-t">
              <td className="px-4 py-2">{reserve.facility}</td>
              <td className="px-4 py-2">{reserve.reservation}</td>
              <td className="px-4 py-2">{reserve.member}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteReserve(reserve.facility)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
