"use client";

import React, { useState, useEffect } from 'react';
import nextId from 'react-id-generator';

type StaffMember = {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  employmentType: string;
  remuneration: string;
  training: string;
};

const generateRandomID = (): string => {
  return nextId();
};

export default function StaffManagement() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  useEffect(() => {
    fetch('/api/staff')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStaffList(data);
        } else {
          console.error("Expected an array but got:", data);
          setStaffList([]); 
        }
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
        setStaffList([]);
      });
  }, []);

  const deleteStaff = (id: string) => {
    fetch(`/api/staff/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setStaffList(staffList.filter((staff) => staff.id !== id));
    });
  };

  const addStaff = () => {
    const newStaff: StaffMember = {
      id: generateRandomID(),
      name: prompt('Enter Name:') || 'None',
      role: prompt('Enter Role:') || 'None',
      qualifications: prompt('Enter Qualifications:') || 'None',
      employmentType: prompt('Enter Employment Type:') || 'None',
      remuneration: prompt('Enter Remuneration:') || 'None',
      training: prompt('Enter Training:') || 'None',
    };

    fetch('/api/staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStaff),
    })
    .then((response) => response.json())
    .then((data) => setStaffList([...staffList, data]))
    .catch((error) => console.error("Error adding new staff:", error));
  };

  const modifyStaff = (staff: StaffMember) => {
    const updatedStaff = {
      ...staff,
      name: prompt('Enter Name:', staff.name) || staff.name,
      role: prompt('Enter Role:', staff.role) || staff.role,
      qualifications: prompt('Enter Qualifications:', staff.qualifications) || staff.qualifications,
      employmentType: prompt('Enter Employment Type:', staff.employmentType) || staff.employmentType,
      remuneration: prompt('Enter Remuneration:', staff.remuneration) || staff.remuneration,
      training: prompt('Enter Training:', staff.training) || staff.training,
    };

    fetch(`/api/staff/${staff.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStaff),
    })
    .then(() => {
      setStaffList(staffList.map((item) => (item.id === staff.id ? updatedStaff : item)));
    })
    .catch((error) => console.error("Error modifying staff:", error));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h2 className="text-2xl font-bold mb-4">Manage Your Staff</h2>
      <button onClick={addStaff} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Staff</button>
      <table className="table-auto mt-8 w-full text-left">
        <thead className="bg-emerald-600">
          <tr>
            <th className="px-4 py-2 text-white">ID</th>
            <th className="px-4 py-2 text-white">Name</th>
            <th className="px-4 py-2 text-white">Role</th>
            <th className="px-4 py-2 text-white">Qualifications</th>
            <th className="px-4 py-2 text-white">Employment Type</th>
            <th className="px-4 py-2 text-white">Remuneration</th>
            <th className="px-4 py-2 text-white">Training</th>
            <th className="px-4 py-2 text-white">Actions</th>
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
              <td className="px-4 py-2 flex items-center space-x-2">
                <button onClick={() => modifyStaff(staff)} className="bg-yellow-500 text-white p-1 rounded text-sm px-2">Edit</button>
                <button onClick={() => deleteStaff(staff.id)} className="bg-red-500 text-white p-1 rounded text-sm px-2">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
