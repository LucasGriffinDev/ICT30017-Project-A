'use client';

import React, { useState, useEffect } from 'react';

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
  training: TrainingCourse[];
};

export default function StaffManagement() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaffIndex, setCurrentStaffIndex] = useState<number | null>(
    null
  );
  const [staff, setStaff] = useState<StaffMember>({
    id: '',
    name: '',
    role: '',
    qualifications: '',
    employmentType: '',
    remuneration: '',
    training: [],
  });

  useEffect(() => {
    const storedStaff = localStorage.getItem('staffList');
    if (storedStaff) {
      const parsedStaffList = JSON.parse(storedStaff);

      const updatedStaffList = parsedStaffList.map((staff) => {
        if (!Array.isArray(staff.training)) {
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

  const saveToLocalStorage = (updatedList: StaffMember[]) => {
    localStorage.setItem('staffList', JSON.stringify(updatedList));
  };

  const deleteStaff = (id: string) => {
    const updatedList = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedList);
    saveToLocalStorage(updatedList);
  };

  const openAddStaffModal = () => {
    setIsEditing(false);
    setStaff({
      id: '',
      name: '',
      role: '',
      qualifications: '',
      employmentType: '',
      remuneration: '',
      training: [],
    });
    setIsModalOpen(true);
  };

  const openEditStaffModal = (index: number) => {
    setIsEditing(true);
    setCurrentStaffIndex(index);
    setStaff({ ...staffList[index] });
    setIsModalOpen(true);
  };

  const handleSaveStaff = () => {
    if (!staff.id || !staff.name) {
      alert('ID and Name are required.');
      return;
    }

    if (!Array.isArray(staff.training)) {
      staff.training = [];
    }

    const updatedList = [...staffList];
    if (isEditing && currentStaffIndex !== null) {
      updatedList[currentStaffIndex] = staff;
    } else {
      if (staffList.some((s) => s.id === staff.id)) {
        alert('A staff member with this ID already exists.');
        return;
      }
      updatedList.push(staff);
    }

    setStaffList(updatedList);
    saveToLocalStorage(updatedList);
    setIsModalOpen(false);
    setStaff({
      id: '',
      name: '',
      role: '',
      qualifications: '',
      employmentType: '',
      remuneration: '',
      training: [],
    });
    setIsEditing(false);
    setCurrentStaffIndex(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

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
    handleSaveStaff();
  };

  return (
    <main className="flex flex-col items-center p-8">
      <div className="w-full max-w-[60%] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">
          Staff Management
        </h1>
        <button
          onClick={openAddStaffModal}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Staff
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="bg-white rounded-lg shadow-lg z-50 w-full max-w-md mx-auto p-6 overflow-y-auto max-h-screen">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? 'Edit Staff Member' : 'Add Staff Member'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">ID</label>
                  <input
                    type="text"
                    name="id"
                    value={staff.id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                    disabled={isEditing}
                  />
                </div>
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
                          handleTrainingChange(
                            index,
                            'courseName',
                            e.target.value
                          )
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
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {isEditing ? 'Update Staff' : 'Save Staff'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Staff Table with Edit and Delete Buttons */}
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
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditStaffModal(rowIndex)}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStaff(staff.id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {staffList.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="border px-4 py-2 text-center text-gray-500"
                  >
                    No staff members available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
