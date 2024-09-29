// pages/staff.js

'use client';

import React, { useState, useEffect } from 'react';
import AddStaffModal from '../../components/AddStaffModal'; // Adjust the path based on your folder structure
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
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load staff data from local storage when the component mounts
    const storedStaff = localStorage.getItem('staffList');
    if (storedStaff) {
      setStaffList(JSON.parse(storedStaff));
    }
  }, []);

  useEffect(() => {
    // Save staff data to local storage whenever it changes
    localStorage.setItem('staffList', JSON.stringify(staffList));
  }, [staffList]);

  const deleteStaff = (id: string) => {
    const updatedList = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedList);
  };

  const addStaff = (newStaff: StaffMember) => {
    // Check if ID already exists
    if (staffList.some((staff) => staff.id === newStaff.id)) {
      alert('A staff member with this ID already exists.');
      return;
    }
    setStaffList([...staffList, newStaff]);
  };

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">
        Staff Management
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Staff
      </button>
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addStaff}
      />
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
                <button
                  onClick={() => deleteStaff(staff.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
