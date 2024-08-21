"use client"; // Add this at the top

import React, { useState, useEffect } from 'react';

// Define a type for the staff member objects
type StaffMember = {
  Room: string;
  Availability: string;
  Occupant: string;
};

export default function StaffManagement() {
  // Specify that staffList is an array of StaffMember objects
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  useEffect(() => {
    // Fetch staff data when the component mounts
    fetch('/api/staff')
      .then((response) => response.json())
      .then((data) => setStaffList(data));
  }, []);

  // Specify that id is a string
  const deleteStaff = (id: string) => {
    fetch(`/api/staff/${id}`, {
      method: 'DELETE',
    }).then(() => {
      // Filter out the staff member with the matching ID
      setStaffList(staffList.filter((staff) => staff.id !== id));
    });
  };

  const addStaff = () => {
    // Ensure the newStaff object conforms to the StaffMember type
    const newStaff: StaffMember = {
      id: prompt('Enter Room:') || '', // Prompt returns null if canceled, so default to an empty string
      name: prompt('Enter Availability:') || '',
      Occupant: prompt('Enter Occupant:') || '',
    };
    
    fetch('/api/staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStaff),
    }).then((response) => response.json())
      .then((data) => setStaffList([...staffList, data]));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl">Staff Management</h1>
      <button onClick={addStaff} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Staff</button>
      <table className="table-auto mt-8 w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Room</th>
            <th className="px-4 py-2">Availability</th>
            <th className="px-4 py-2">Occupant</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id} className="border-t">
              <td className="px-4 py-2">{staff.Room}</td>
              <td className="px-4 py-2">{staff.Availability}</td>
              <td className="px-4 py-2">{staff.Occupant}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteStaff(staff.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
