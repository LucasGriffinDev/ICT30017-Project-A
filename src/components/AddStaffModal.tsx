'use client';

import React, { useState } from 'react';

type StaffMember = {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  employmentType: string;
  remuneration: string;
  training: string;
};

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: StaffMember) => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [staff, setStaff] = useState<StaffMember>({
    id: '',
    name: '',
    role: '',
    qualifications: '',
    employmentType: '',
    remuneration: '',
    training: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!staff.id || !staff.name) {
      alert('ID and Name are required.');
      return;
    }
    onSave(staff);
    onClose();
    // Reset the form
    setStaff({
      id: '',
      name: '',
      role: '',
      qualifications: '',
      employmentType: '',
      remuneration: '',
      training: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg z-50 w-full max-w-md mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Add Staff Member</h2>
        <form onSubmit={handleSubmit}>
          {/* ID */}
          <div className="mb-4">
            <label className="block text-gray-700">ID</label>
            <input
              type="text"
              name="id"
              value={staff.id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={staff.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={staff.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Qualifications */}
          <div className="mb-4">
            <label className="block text-gray-700">Qualifications</label>
            <input
              type="text"
              name="qualifications"
              value={staff.qualifications}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Employment Type */}
          <div className="mb-4">
            <label className="block text-gray-700">Employment Type</label>
            <input
              type="text"
              name="employmentType"
              value={staff.employmentType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Remuneration */}
          <div className="mb-4">
            <label className="block text-gray-700">Remuneration</label>
            <input
              type="text"
              name="remuneration"
              value={staff.remuneration}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Training */}
          <div className="mb-4">
            <label className="block text-gray-700">Training</label>
            <input
              type="text"
              name="training"
              value={staff.training}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
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
  );
};

export default AddStaffModal;
