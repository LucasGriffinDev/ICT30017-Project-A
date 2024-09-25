import React, { useState, useEffect } from 'react';

type ReservationMember = {
  Facility: string;
  Reservation: string;
  Member: string;
};

export default function ReservationManagement() {
  const [reservationList, setReservationList] = useState<ReservationMember[]>([]);

  useEffect(() => {
    fetch('/api/Facility')
      .then((response) => response.json())
      .then((data) => setReservationList(data));
  }, []);

  const deleteReservation = (Facility: string) => {
    fetch(`/api/Facility/${Facility}`, {
      method: 'DELETE',
    }).then(() => {
      setReservationList(reservationList.filter((reservation) => reservation.Facility !== Facility));
    });
  };

  const addReservation = () => {
    const newReservation: ReservationMember = {
      Facility: prompt('Enter Facility:') || '', // Prompt returns null if canceled, so default to an empty string
      Reservation: prompt('Enter Reservation:') || '',
      Member: prompt('Enter Member:') || '',
    };
    
    fetch('/api/Facility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReservation),
    }).then((response) => response.json())
      .then((data) => setReservationList([...reservationList, data]));
  };



       <h2 className="text-3xl">Facility Reservations</h2>
      <button onClick={addReservation} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Reservation</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Facility</th>
            <th className="px-4 py-2">Reservation</th>
            <th className="px-4 py-2">Member</th>
          </tr>
        </thead>
        <tbody>
           {reservationList.map((reservation) => (
            <tr key={reservation.Facility} className="border-t">
              <td className="px-4 py-2">{reservation.Facility}</td>
              <td className="px-4 py-2">{reservation.Reservation}</td>
              <td className="px-4 py-2">{reservation.Member}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteReservation(reservation.Facility)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
      ))}
        </tbody>
      </table>
    </main>
  );
}
