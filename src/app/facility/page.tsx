// pages/facility.js

'use client';

import React, { useState, useEffect } from 'react';

interface Room {
  id: number;
  availability: string;
  occupant: string;
}

interface Reservation {
  id: number;
  facility: string;
  date: string;
  member: string;
}

interface MaintenanceRequest {
  id: number;
  room: string;
  request: string;
  status: string;
}

interface Utility {
  id: number;
  month: string;
  gas: number;
  water: number;
  electricity: number;
}

export default function FacilityManagement() {
  // Room Management State
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoom, setNewRoom] = useState<Room>({
    id: 0,
    availability: '',
    occupant: '',
  });
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [isEditingRoom, setIsEditingRoom] = useState(false);

  // Reservation Management State
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [newReservation, setNewReservation] = useState<Reservation>({
    id: 0,
    facility: '',
    date: '',
    member: '',
  });
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [isEditingReservation, setIsEditingReservation] = useState(false);

  // Maintenance Management State
  const [maintenanceRequests, setMaintenanceRequests] = useState<
    MaintenanceRequest[]
  >([]);
  const [newMaintenanceRequest, setNewMaintenanceRequest] =
    useState<MaintenanceRequest>({
      id: 0,
      room: '',
      request: '',
      status: '',
    });
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [isEditingMaintenance, setIsEditingMaintenance] = useState(false);

  // Utility Management State
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [newUtility, setNewUtility] = useState<Utility>({
    id: 0,
    month: '',
    gas: 0,
    water: 0,
    electricity: 0,
  });
  const [showUtilityModal, setShowUtilityModal] = useState(false);
  const [isEditingUtility, setIsEditingUtility] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load rooms
      const storedRooms = localStorage.getItem('rooms');
      if (storedRooms) setRooms(JSON.parse(storedRooms));

      // Load reservations
      const storedReservations = localStorage.getItem('reservations');
      if (storedReservations) setReservations(JSON.parse(storedReservations));

      // Load maintenance requests
      const storedMaintenanceRequests = localStorage.getItem(
        'maintenanceRequests'
      );
      if (storedMaintenanceRequests)
        setMaintenanceRequests(JSON.parse(storedMaintenanceRequests));

      // Load utilities
      const storedUtilities = localStorage.getItem('utilities');
      if (storedUtilities) setUtilities(JSON.parse(storedUtilities));
    }
  }, []);

  // Room Management Functions
  const handleRoomInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const addOrUpdateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedRooms;
    if (isEditingRoom) {
      updatedRooms = rooms.map((room) =>
        room.id === newRoom.id ? newRoom : room
      );
    } else {
      const nextId =
        rooms.length > 0 ? Math.max(...rooms.map((room) => room.id)) + 1 : 1;
      updatedRooms = [...rooms, { ...newRoom, id: nextId }];
    }
    setRooms(updatedRooms);
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));

    // Reset form
    setNewRoom({ id: 0, availability: '', occupant: '' });
    setIsEditingRoom(false);
    setShowRoomModal(false);
  };

  const editRoom = (room: Room) => {
    setNewRoom(room);
    setIsEditingRoom(true);
    setShowRoomModal(true);
  };

  const deleteRoom = (id: number) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
  };

  // Reservation Management Functions
  const handleReservationInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewReservation({ ...newReservation, [e.target.name]: e.target.value });
  };

  const addOrUpdateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedReservations;
    if (isEditingReservation) {
      updatedReservations = reservations.map((reservation) =>
        reservation.id === newReservation.id ? newReservation : reservation
      );
    } else {
      const nextId =
        reservations.length > 0
          ? Math.max(...reservations.map((r) => r.id)) + 1
          : 1;
      updatedReservations = [
        ...reservations,
        { ...newReservation, id: nextId },
      ];
    }
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));

    // Reset form
    setNewReservation({ id: 0, facility: '', date: '', member: '' });
    setIsEditingReservation(false);
    setShowReservationModal(false);
  };

  const editReservation = (reservation: Reservation) => {
    setNewReservation(reservation);
    setIsEditingReservation(true);
    setShowReservationModal(true);
  };

  const deleteReservation = (id: number) => {
    const updatedReservations = reservations.filter(
      (reservation) => reservation.id !== id
    );
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  };

  // Maintenance Management Functions
  const handleMaintenanceInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewMaintenanceRequest({
      ...newMaintenanceRequest,
      [e.target.name]: e.target.value,
    });
  };

  const addOrUpdateMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedMaintenanceRequests;
    if (isEditingMaintenance) {
      updatedMaintenanceRequests = maintenanceRequests.map((request) =>
        request.id === newMaintenanceRequest.id
          ? newMaintenanceRequest
          : request
      );
    } else {
      const nextId =
        maintenanceRequests.length > 0
          ? Math.max(...maintenanceRequests.map((r) => r.id)) + 1
          : 1;
      updatedMaintenanceRequests = [
        ...maintenanceRequests,
        { ...newMaintenanceRequest, id: nextId },
      ];
    }
    setMaintenanceRequests(updatedMaintenanceRequests);
    localStorage.setItem(
      'maintenanceRequests',
      JSON.stringify(updatedMaintenanceRequests)
    );

    // Reset form
    setNewMaintenanceRequest({ id: 0, room: '', request: '', status: '' });
    setIsEditingMaintenance(false);
    setShowMaintenanceModal(false);
  };

  const editMaintenance = (request: MaintenanceRequest) => {
    setNewMaintenanceRequest(request);
    setIsEditingMaintenance(true);
    setShowMaintenanceModal(true);
  };

  const deleteMaintenance = (id: number) => {
    const updatedMaintenanceRequests = maintenanceRequests.filter(
      (request) => request.id !== id
    );
    setMaintenanceRequests(updatedMaintenanceRequests);
    localStorage.setItem(
      'maintenanceRequests',
      JSON.stringify(updatedMaintenanceRequests)
    );
  };

  // Utility Management Functions
  const handleUtilityInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewUtility({ ...newUtility, [e.target.name]: e.target.value });
  };

  const addOrUpdateUtility = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedUtilities;
    if (isEditingUtility) {
      updatedUtilities = utilities.map((utility) =>
        utility.id === newUtility.id ? newUtility : utility
      );
    } else {
      const nextId =
        utilities.length > 0 ? Math.max(...utilities.map((u) => u.id)) + 1 : 1;
      updatedUtilities = [...utilities, { ...newUtility, id: nextId }];
    }
    setUtilities(updatedUtilities);
    localStorage.setItem('utilities', JSON.stringify(updatedUtilities));

    // Reset form
    setNewUtility({ id: 0, month: '', gas: 0, water: 0, electricity: 0 });
    setIsEditingUtility(false);
    setShowUtilityModal(false);
  };

  const editUtility = (utility: Utility) => {
    setNewUtility(utility);
    setIsEditingUtility(true);
    setShowUtilityModal(true);
  };

  const deleteUtility = (id: number) => {
    const updatedUtilities = utilities.filter((utility) => utility.id !== id);
    setUtilities(updatedUtilities);
    localStorage.setItem('utilities', JSON.stringify(updatedUtilities));
  };

  // Render Modals
  const renderModal = (
    isVisible: boolean,
    onClose: () => void,
    onSubmit: (e: React.FormEvent) => void,
    title: string,
    content: React.ReactNode
  ) => {
    if (!isVisible) return null;
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4 text-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-lg">
            <form onSubmit={onSubmit}>
              <div className="bg-white px-4 pt-5 pb-4">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div className="grid grid-cols-1 gap-4">{content}</div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isEditingRoom ||
                  isEditingReservation ||
                  isEditingMaintenance ||
                  isEditingUtility
                    ? 'Update'
                    : 'Add'}
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-col items-center p-8">
      <div className="w-full max-w-[60%] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-900 text-center">
          Facility Management
        </h1>

        {/* Room Management Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Room Management</h2>
          <button
            onClick={() => setShowRoomModal(true)}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Add Room
          </button>
          {renderModal(
            showRoomModal,
            () => {
              setShowRoomModal(false);
              setIsEditingRoom(false);
              setNewRoom({ id: 0, availability: '', occupant: '' });
            },
            addOrUpdateRoom,
            isEditingRoom ? 'Edit Room' : 'Add Room',
            <>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Availability
                </label>
                <select
                  name="availability"
                  value={newRoom.availability}
                  onChange={handleRoomInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="">Select Availability</option>
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Occupant
                </label>
                <input
                  type="text"
                  name="occupant"
                  value={newRoom.occupant}
                  onChange={handleRoomInputChange}
                  className="border rounded w-full py-2 px-3"
                  placeholder="Enter occupant name (if any)"
                />
              </div>
            </>
          )}
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Room ID
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Availability
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Occupant
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, index) => (
                  <tr
                    key={room.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="border px-4 py-2">{room.id}</td>
                    <td className="border px-4 py-2">{room.availability}</td>
                    <td className="border px-4 py-2">{room.occupant}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => editRoom(room)}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {rooms.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="border px-4 py-2 text-center text-gray-500"
                    >
                      No rooms available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Reservation Management Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Facility Reservations</h2>
          <button
            onClick={() => setShowReservationModal(true)}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Add Reservation
          </button>
          {renderModal(
            showReservationModal,
            () => {
              setShowReservationModal(false);
              setIsEditingReservation(false);
              setNewReservation({ id: 0, facility: '', date: '', member: '' });
            },
            addOrUpdateReservation,
            isEditingReservation ? 'Edit Reservation' : 'Add Reservation',
            <>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Facility
                </label>
                <input
                  type="text"
                  name="facility"
                  value={newReservation.facility}
                  onChange={handleReservationInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newReservation.date}
                  onChange={handleReservationInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Member
                </label>
                <input
                  type="text"
                  name="member"
                  value={newReservation.member}
                  onChange={handleReservationInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                />
              </div>
            </>
          )}
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Reservation ID
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Facility
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Date
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Member
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr
                    key={reservation.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="border px-4 py-2">{reservation.id}</td>
                    <td className="border px-4 py-2">{reservation.facility}</td>
                    <td className="border px-4 py-2">{reservation.date}</td>
                    <td className="border px-4 py-2">{reservation.member}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => editReservation(reservation)}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteReservation(reservation.id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="border px-4 py-2 text-center text-gray-500"
                    >
                      No reservations available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Maintenance Management Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Maintenance Requests</h2>
          <button
            onClick={() => setShowMaintenanceModal(true)}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Add Request
          </button>
          {renderModal(
            showMaintenanceModal,
            () => {
              setShowMaintenanceModal(false);
              setIsEditingMaintenance(false);
              setNewMaintenanceRequest({
                id: 0,
                room: '',
                request: '',
                status: '',
              });
            },
            addOrUpdateMaintenance,
            isEditingMaintenance
              ? 'Edit Maintenance Request'
              : 'Add Maintenance Request',
            <>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Room
                </label>
                <input
                  type="text"
                  name="room"
                  value={newMaintenanceRequest.room}
                  onChange={handleMaintenanceInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Request
                </label>
                <input
                  type="text"
                  name="request"
                  value={newMaintenanceRequest.request}
                  onChange={handleMaintenanceInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={newMaintenanceRequest.status}
                  onChange={handleMaintenanceInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </>
          )}
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Request ID
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Room
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Request
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Status
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {maintenanceRequests.map((request, index) => (
                  <tr
                    key={request.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="border px-4 py-2">{request.id}</td>
                    <td className="border px-4 py-2">{request.room}</td>
                    <td className="border px-4 py-2">{request.request}</td>
                    <td className="border px-4 py-2">{request.status}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => editMaintenance(request)}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMaintenance(request.id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {maintenanceRequests.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="border px-4 py-2 text-center text-gray-500"
                    >
                      No maintenance requests available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Utility Management Section */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Utility Management</h2>
          <button
            onClick={() => setShowUtilityModal(true)}
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            Add Utility
          </button>
          {renderModal(
            showUtilityModal,
            () => {
              setShowUtilityModal(false);
              setIsEditingUtility(false);
              setNewUtility({
                id: 0,
                month: '',
                gas: 0,
                water: 0,
                electricity: 0,
              });
            },
            addOrUpdateUtility,
            isEditingUtility ? 'Edit Utility' : 'Add Utility',
            <>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Month
                </label>
                <input
                  type="month"
                  name="month"
                  value={newUtility.month}
                  onChange={handleUtilityInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Gas
                </label>
                <input
                  type="number"
                  name="gas"
                  value={newUtility.gas}
                  onChange={handleUtilityInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Water
                </label>
                <input
                  type="number"
                  name="water"
                  value={newUtility.water}
                  onChange={handleUtilityInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Electricity
                </label>
                <input
                  type="number"
                  name="electricity"
                  value={newUtility.electricity}
                  onChange={handleUtilityInputChange}
                  required
                  className="border rounded w-full py-2 px-3"
                  min="0"
                />
              </div>
            </>
          )}
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Utility ID
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Month
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Gas
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Water
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Electricity
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {utilities.map((utility, index) => (
                  <tr
                    key={utility.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="border px-4 py-2">{utility.id}</td>
                    <td className="border px-4 py-2">{utility.month}</td>
                    <td className="border px-4 py-2">{utility.gas}</td>
                    <td className="border px-4 py-2">{utility.water}</td>
                    <td className="border px-4 py-2">{utility.electricity}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => editUtility(utility)}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUtility(utility.id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {utilities.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="border px-4 py-2 text-center text-gray-500"
                    >
                      No utilities available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
