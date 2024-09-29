// components/AddStaffModal.tsx

'use client';

import React, { useState } from 'react';

type TrainingCourse = {
  courseName: string;
  completionDate: string;
  status: string;
};

type StaffMember = {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  employmentType: string;
  remuneration: string;
  training: TrainingCourse[]; // Updated to array of TrainingCourse
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
    training: [], // Initialize as an empty array
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  // Training Courses Handlers
  const addTrainingCourse = () => {
    setStaff({
      ...staff,
      training: [
        ...staff.training,
        { courseName: '', completionDate: '', status: '' },
      ],
    });
  };

  const handleTrainingChange = (
    index: number,
    field: keyof TrainingCourse,
    value: string
  ) => {
    const updatedTraining = [...staff.training];
    updatedTraining[index][field] = value;
    setStaff({
      ...staff,
      training: updatedTraining,
    });
  };

  const removeTrainingCourse = (index: number) => {
    const updatedTraining = staff.training.filter((_, i) => i !== index);
    setStaff({
      ...staff,
      training: updatedTraining,
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
      training: [],
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
      <div className="bg-white rounded-lg shadow-lg z-50 w-full max-w-md mx-auto p-6 overflow-y-auto max-h-screen">
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          {/* Training Courses */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Training Courses
            </label>
            {staff.training.map((course, index) => (
              <div key={index} className="mb-2 border p-2 rounded">
                <input
                  type="text"
                  placeholder="Course Name"
                  value={course.courseName}
                  onChange={(e) =>
                    handleTrainingChange(index, 'courseName', e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded mb-2"
                />
                <input
                  type="date"
                  placeholder="Completion Date"
                  value={course.completionDate}
                  onChange={(e) =>
                    handleTrainingChange(
                      index,
                      'completionDate',
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border rounded mb-2"
                />
                <select
                  value={course.status}
                  onChange={(e) =>
                    handleTrainingChange(index, 'status', e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded mb-2"
                >
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Not Started">Not Started</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeTrainingCourse(index)}
                  className="text-red-500"
                >
                  Remove Course
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTrainingCourse}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Training Course
            </button>
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
