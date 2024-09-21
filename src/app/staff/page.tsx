"use client";

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


let nextCustomID = 1;

const generateCustomID = (): string => {
  return (nextCustomID++).toString(); 
};

export default function StaffManagement() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [newStaff, setNewStaff] = useState<StaffMember>({
    id: '',
    name: '',
    role: '',
    qualifications: '',
    employmentType: '',
    remuneration: '',
    training: '',
  });
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


  const openAddModal = () => {
    setNewStaff({
      id: generateCustomID(),
      name: '',
      role: '',
      qualifications: '',
      employmentType: '',
      remuneration: '',
      training: '',
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (staff: StaffMember) => {
    setEditingStaff(staff);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingStaff) {
      const { name, value } = e.target;
      setEditingStaff((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };


  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const staffToAdd = { ...newStaff, id: generateCustomID() };

    fetch('/api/staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staffToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        setStaffList([...staffList, data]);
        closeAddModal();
      })
      .catch((error) => console.error("Error adding new staff:", error));
  };


  const handleEditStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      fetch(`/api/staff/${editingStaff.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingStaff),
      })
        .then(() => {
          setStaffList(
            staffList.map((item) =>
              item.id === editingStaff.id ? editingStaff : item
            )
          );
          closeEditModal();
        })
        .catch((error) => console.error("Error editing staff:", error));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h2 className="text-2xl font-bold mb-4">Manage Your Staff</h2>
      <button onClick={openAddModal} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Add Staff
      </button>
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
                <button
                  onClick={() => openEditModal(staff)}
                  className="bg-yellow-500 text-white p-1 rounded text-sm px-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStaff(staff.id)}
                  className="bg-red-500 text-white p-1 rounded text-sm px-2"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Staff</h3>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newStaff.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={newStaff.role}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Qualifications</label>
                <input
                  type="text"
                  name="qualifications"
                  value={newStaff.qualifications}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                <input
                  type="text"
                  name="employmentType"
                  value={newStaff.employmentType}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Remuneration</label>
                <input
                  type="text"
                  name="remuneration"
                  value={newStaff.remuneration}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Training</label>
                <input
                  type="text"
                  name="training"
                  value={newStaff.training}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {isEditModalOpen && editingStaff && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Staff</h3>
            <form onSubmit={handleEditStaff} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingStaff.name}
                  onChange={handleEditInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={editingStaff.role}
                  onChange={handleEditInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Qualifications</label>
                <input
                  type="text"
                  name="qualifications"
                  value={editingStaff.qualifications}
                  onChange={handleEditInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                <input
                  type="text"
                  name="employmentType"
                  value={editingStaff.employmentType}
                  onChange={handleEditInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Remuneration</label>
                <input
                  type="text"
                  name="remuneration"
                  value={editingStaff.remuneration}
                  onChange={handleEditInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Training</label>
                <input
                  type="text"
                  name="training"
                  value={editingStaff.training}
                  onChange={handleEditInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
