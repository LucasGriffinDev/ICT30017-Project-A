// pages/facility.js

'use client';

import React, { useState, useEffect } from 'react';

// Define the types
type RoomMember = {
  id: string;
  Availability: string;
  Occupant: string;
};

type ReserveMember = {
  facility: string;
  Reservation: string;
  Member: string;
};

type MaintenanceMember = {
  Room: string;
  Request: string;
  Status: string;
};

type UtilityMember = {
  Month: string;
  Gas: string;
  Water: string;
  Electricity: string;
};

export default function RoomManagement() {
  const [roomList, setRoomList] = useState<RoomMember[]>([]);
  const [reserveList, setReserveList] = useState<ReserveMember[]>([]);
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceMember[]>(
    []
  );
  const [utilityList, setUtilityList] = useState<UtilityMember[]>([]);

  useEffect(() => {
    fetch('/api/facility')
      .then((response) => response.json())
      .then((data) => setRoomList(data));
  }, []);

  const deleteRoom = (id: string) => {
    fetch(`/api/facility/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setRoomList(roomList.filter((room) => room.id !== id));
    });
  };

  const addRoom = () => {
    const newRoom: RoomMember = {
      id: prompt('Enter Room ID:') || '',
      Availability: prompt('Enter Availability:') || '',
      Occupant: prompt('Enter Occupant:') || '',
    };

    fetch('/api/facility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRoom),
    })
      .then((response) => response.json())
      .then((data) => setRoomList([...roomList, data]));
  };

  useEffect(() => {
    fetch('/api/reserve')
      .then((response) => response.json())
      .then((data) => setReserveList(data));
  }, []);

  const deleteReserve = (facility: string) => {
    fetch(`/api/reserve/${facility}`, {
      method: 'DELETE',
    }).then(() => {
      setReserveList(
        reserveList.filter((reserve) => reserve.facility !== facility)
      );
    });
  };

  const addReserve = () => {
    const newReserve: ReserveMember = {
      facility: prompt('Enter Facility:') || '',
      Reservation: prompt('Enter Reservation:') || '',
      Member: prompt('Enter Member:') || '',
    };

    fetch('/api/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReserve),
    })
      .then((response) => response.json())
      .then((data) => setReserveList([...reserveList, data]));
  };

  useEffect(() => {
    fetch('/api/maintenance')
      .then((response) => response.json())
      .then((data) => setMaintenanceList(data));
  }, []);

  const deleteMaintenance = (Room: string) => {
    fetch(`/api/maintenance/${Room}`, {
      method: 'DELETE',
    }).then(() => {
      setMaintenanceList(
        maintenanceList.filter((maintenance) => maintenance.Room !== Room)
      );
    });
  };

  const addMaintenance = () => {
    const newMaintenance: MaintenanceMember = {
      Room: prompt('Enter Room ID:') || '',
      Request: prompt('Enter Request:') || '',
      Status: prompt('Enter Status:') || '',
    };

    fetch('/api/maintenance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMaintenance),
    })
      .then((response) => response.json())
      .then((data) => setMaintenanceList([...maintenanceList, data]));
  };

  useEffect(() => {
    fetch('/api/utility')
      .then((response) => response.json())
      .then((data) => setUtilityList(data));
  }, []);

  const deleteUtility = (Month: string) => {
    fetch(`/api/utility/${Month}`, {
      method: 'DELETE',
    }).then(() => {
      setUtilityList(utilityList.filter((utility) => utility.Month !== Month));
    });
  };

  const addUtility = () => {
    const newUtility: UtilityMember = {
      Month: prompt('Enter Month:') || '',
      Gas: prompt('Enter Gas Amount:') || '',
      Water: prompt('Enter Water Amount:') || '',
      Electricity: prompt('Enter Electricity Amount:') || '',
    };

    fetch('/api/utility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUtility),
    })
      .then((response) => response.json())
      .then((data) => setUtilityList([...utilityList, data]));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-[60%] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-900 text-center">
          Facility Management
        </h1>

        {/* Room Management Section */}
        <h2 className="text-3xl font-bold mt-8 mb-4">Room Management</h2>
        <button
          onClick={addRoom}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Room
        </button>
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full text-left border-collapse">
            {/* ... Table Headers ... */}
            <thead>
              <tr>
                <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                  Room
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
            {/* ... Table Body ... */}
            <tbody>
              {roomList.map((room, rowIndex) => (
                <tr
                  key={room.id}
                  className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="border px-4 py-2">{room.id}</td>
                  <td className="border px-4 py-2">{room.Availability}</td>
                  <td className="border px-4 py-2">{room.Occupant}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteRoom(room.id)}
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

        {/* Reserve Management Section */}
        <h2 className="text-3xl font-bold mt-12 mb-4">Reserve Management</h2>
        <button
          onClick={addReserve}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Reservation
        </button>
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full text-left border-collapse">
            {/* ... Table Headers ... */}
            <thead>
              <tr>
                <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                  Facility
                </th>
                <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                  Reservation
                </th>
                <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                  Member
                </th>
                <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                  Actions
                </th>
              </tr>
            </thead>
            {/* ... Table Body ... */}
            <tbody>
              {reserveList.map((reserve, rowIndex) => (
                <tr
                  key={reserve.facility}
                  className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="border px-4 py-2">{reserve.facility}</td>
                  <td className="border px-4 py-2">{reserve.Reservation}</td>
                  <td className="border px-4 py-2">{reserve.Member}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteReserve(reserve.facility)}
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

        {/* Maintenance Management Section */}
        <h2 className="text-3xl font-bold mt-12 mb-4">
          Maintenance Management
        </h2>
        <button
          onClick={addMaintenance}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Request
        </button>
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full text-left border-collapse">
            {/* ... Table Headers ... */}
            <thead>
              <tr>
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
            {/* ... Table Body ... */}
            <tbody>
              {maintenanceList.map((maintenance, rowIndex) => (
                <tr
                  key={maintenance.Room}
                  className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="border px-4 py-2">{maintenance.Room}</td>
                  <td className="border px-4 py-2">{maintenance.Request}</td>
                  <td className="border px-4 py-2">{maintenance.Status}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteMaintenance(maintenance.Room)}
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

        {/* Utility Management Section */}
        <h2 className="text-3xl font-bold mt-12 mb-4">Utility Management</h2>
        <button
          onClick={addUtility}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Utility
        </button>
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full text-left border-collapse">
            {/* ... Table Headers ... */}
            <thead>
              <tr>
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
            {/* ... Table Body ... */}
            <tbody>
              {utilityList.map((utility, rowIndex) => (
                <tr
                  key={utility.Month}
                  className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="border px-4 py-2">{utility.Month}</td>
                  <td className="border px-4 py-2">{utility.Gas}</td>
                  <td className="border px-4 py-2">{utility.Water}</td>
                  <td className="border px-4 py-2">{utility.Electricity}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteUtility(utility.Month)}
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
