
@ -1,95 +1 @@
"use client"; // Add this at the top

import React, { useState, useEffect } from 'react';

type StaffMember = {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  employmentType: string;
  remuneration: string;
  training: string;
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
      id: prompt('Enter ID:') || '', // Prompt returns null if canceled, so default to an empty string
      name: prompt('Enter Name:') || '',
      role: prompt('Enter Role:') || '',
      qualifications: prompt('Enter Qualifications:') || '',
      employmentType: prompt('Enter Employment Type:') || '',
      remuneration: prompt('Enter Remuneration:') || '',
      training: prompt('Enter Training:') || '',
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
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Qualifications</th>
            <th className="px-4 py-2">Employment Type</th>
            <th className="px-4 py-2">Remuneration</th>
            <th className="px-4 py-2">Training</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id} className="border-t">
              <td className="px-4 py-2">{staff.id}</td>
              <td className="px-4 py-2">{staff.name}</td>
              <td className="px-4 py-2">{staff.role}</td>
              <td className="px-4 py-2">{staff.qualifications}</td>
              <td className="px-4 py-2">{staff.employmentType}</td>
              <td className="px-4 py-2">{staff.remuneration}</td>
              <td className="px-4 py-2">{staff.training}</td>
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
