// pages/staff.js

'use client';

import React, { useState, useEffect } from 'react';
import AddStaffModal from '../../components/AddStaffModal'; // Adjust the path based on your folder structure

// Define the TrainingCourse type
type TrainingCourse = {
  courseName: string;
  completionDate: string;
  status: string;
};

// Update the StaffMember type
type StaffMember = {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  employmentType: string;
  remuneration: string;
  training: TrainingCourse[]; // Changed from string to array of TrainingCourse
};

export default function StaffManagement() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load staff data from local storage when the component mounts
    const storedStaff = localStorage.getItem('staffList');
    if (storedStaff) {
      const parsedStaffList = JSON.parse(storedStaff);

      // Transform the data if necessary
      const updatedStaffList = parsedStaffList.map((staff) => {
        // If staff.training is not an array, initialize it
        if (!Array.isArray(staff.training)) {
          // Attempt to parse the string if possible
          try {
            staff.training = JSON.parse(staff.training);
            if (!Array.isArray(staff.training)) {
              staff.training = [];
            }
          } catch (error) {
            staff.training = [];
          }
        }
        return staff;
      });
      setStaffList(updatedStaffList);
    }
  }, []);

  // Function to save to local storage
  const saveToLocalStorage = (updatedList: StaffMember[]) => {
    localStorage.setItem('staffList', JSON.stringify(updatedList));
  };

  const deleteStaff = (id: string) => {
    const updatedList = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedList);
    saveToLocalStorage(updatedList); // Save after deleting
  };

  const addStaff = (newStaff: StaffMember) => {
    // Ensure training is an array
    if (!Array.isArray(newStaff.training)) {
      newStaff.training = [];
    }

    // Check if ID already exists
    if (staffList.some((staff) => staff.id === newStaff.id)) {
      alert('A staff member with this ID already exists.');
      return;
    }
    const updatedList = [...staffList, newStaff];
    setStaffList(updatedList);
    saveToLocalStorage(updatedList); // Save after adding
  };

  return (
    <main className="flex flex-col items-center p-8">
      <div className="w-full max-w-[60%] mx-auto">
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
        <div className="overflow-x-auto w-full mt-8">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-2xl font-bold bg-blue-900 text-white border-b">
                  ID
                </th>
                <th className="px-4 py-2 text-2xl font-bold bg-blue-900 text-white border-b">
                  Name
                </th>
                <th className="px-4 py-2 text-2xl font-bold bg-blue-900 text-white border-b">
                  Role
                </th>
                <th className="px-4 py-2 text-2xl font-bold bg-blue-900 text-white border-b">
                  Qualifications
                </th>
                <th className="px-4 py-2 text-2xl font-bold bg-blue-900 text-white border-b">
                  Employment Type
                </th>
                <th className="px-4 py-2 text-2xl font-bold bg-blue-900 text-white border-b">
                  Remuneration
                </th>
                <th className="px-4 py-2 text-2xl font-bold bg-blue-900 text-white border-b">
                  Training
                </th>
                <th className="px-4 py-2 text-2xl font-bold bg-blue-900 text-white border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, rowIndex) => (
                <tr
                  key={staff.id}
                  className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="border px-4 py-2">{staff.id}</td>
                  <td className="border px-4 py-2">{staff.name}</td>
                  <td className="border px-4 py-2">{staff.role}</td>
                  <td className="border px-4 py-2">{staff.qualifications}</td>
                  <td className="border px-4 py-2">{staff.employmentType}</td>
                  <td className="border px-4 py-2">{staff.remuneration}</td>
                  <td className="border px-4 py-2">
                    {staff.training && staff.training.length > 0 ? (
                      <ul>
                        {staff.training.map((course, index) => (
                          <li key={index}>
                            {course.courseName} ({course.status})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'No training courses'
                    )}
                  </td>
                  <td className="border px-4 py-2">
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
        </div>
      </div>
    </main>
  );
}
