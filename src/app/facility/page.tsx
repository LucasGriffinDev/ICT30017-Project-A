"use client"; // Add this at the top

import React, { useState, useEffect } from 'react';

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
const [maintenanceList, setMaintenanceList] = useState<MaintenanceMember[]>([]); 
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
    }).then((response) => response.json())
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
      setReserveList(reserveList.filter((reserve) => reserve.facility !== facility));
    });
  };

  const addReserve = () => {
    const newReserve: ReserveMember = {
      facility: prompt('Enter Facility:') || '', // Prompt returns null if canceled, so default to an empty string
      Reservation: prompt('Enter Reservation:') || '',
      Member: prompt('Enter Member:') || '',
    };
    
    fetch('/api/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReserve),
    }).then((response) => response.json())
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
      setMaintenanceList(maintenanceList.filter((maintenance) => maintenance.Room !== Room));
    });
  };

  const addMaintenance = () => {
    const newMaintenance: MaintenanceStatus = {
      Room: prompt('Enter Room ID:') || '', // Prompt returns null if canceled, so default to an empty string
      Request: prompt('Enter Request:') || '',
      Status: prompt('Enter Status:') || '',
    };
    
    fetch('/api/maintenance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMaintenance),
    }).then((response) => response.json())
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
    const newUtility: UtilityWater = {
      Month: prompt('Enter Month:') || '', 
      Gas: prompt('Enter Gas Ammount:') || '',
      Water: prompt('Enter Water Ammount:') || '',
      Electricity: prompt('Enter Electricity Ammount:') || '',
    };
    
    fetch('/api/utility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUtility),
    }).then((response) => response.json())
      .then((data) => setUtilityList([...utilityList, data]));
  };

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl">Facility Management</h1>

       <h2 className="text-3xl">Room Management</h2>
       <button onClick={addRoom} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Room</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Room</th>
            <th className="px-4 py-2">Availability</th>
            <th className="px-4 py-2">Occupant</th>
          </tr>
        </thead>
        <tbody>
           {roomList.map((room) => (
            <tr key={room.id} className="border-t">
              <td className="px-4 py-2">{room.id}</td>
              <td className="px-4 py-2">{room.Availability}</td>
              <td className="px-4 py-2">{room.Occupant}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteRoom(room.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
      ))}
        </tbody>
      </table>

      <h2 className="text-3xl">Reserve Management</h2>
       <button onClick={addReserve} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Reservation</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Facility</th>
            <th className="px-4 py-2">Reservation</th>
            <th className="px-4 py-2">Member</th>
          </tr>
        </thead>
        <tbody>
           {reserveList.map((reserve) => (
            <tr key={reserve.facility} className="border-t">
              <td className="px-4 py-2">{reserve.facility}</td>
              <td className="px-4 py-2">{reserve.Reservation}</td>
              <td className="px-4 py-2">{reserve.Member}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteReserve(reserve.facility)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
      ))}
        </tbody>
      </table>

       <h2 className="text-3xl">Maintenance Management</h2>
       <button onClick={addMaintenance} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Request</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Room</th>
            <th className="px-4 py-2">Request</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
           {maintenanceList.map((maintenance) => (
            <tr key={maintenance.Room} className="border-t">
              <td className="px-4 py-2">{maintenance.Room}</td>
              <td className="px-4 py-2">{maintenance.Request}</td>
              <td className="px-4 py-2">{maintenance.Status}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteMaintenance(maintenance.Room)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
      ))}
        </tbody>
      </table>
 <h2 className="text-3xl">Utility Management</h2>
       <button onClick={addUtility} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Gas</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Month</th>
            <th className="px-4 py-2">Gas</th>
            <th className="px-4 py-2">Water</th>
            <th className="px-4 py-2">Electricity</th>
          </tr>
        </thead>
        <tbody>
           {utilityList.map((utility) => (
            <tr key={utility.Month} className="border-t">
              <td className="px-4 py-2">{utility.Month}</td>
              <td className="px-4 py-2">{utility.Gas}</td>
              <td className="px-4 py-2">{utility.Water}</td>
              <td className="px-4 py-2">{utility.Electricity}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteUtility(utility.Month)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
      ))}
        </tbody>
      </table>
      
    </main>
  );
}
