'use client';

import React, { useState, useEffect } from 'react';

interface Booking {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  staff: string;
}

export default function ServiceManagement() {
  const [service, setService] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [staff, setStaff] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem('bookingData');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const staffOptions = ['John Doe', 'Jane Smith', 'Mike Johnson'];

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      setErrors((prev) => [...prev, 'Date cannot be in the past.']);
      return;
    }

    if (parseFloat(duration) <= 0) {
      setErrors((prev) => [...prev, 'Duration must be a positive number.']);
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setErrors((prev) => [...prev, 'End time must be after start time.']);
      return;
    }

    const bookingData: Booking = {
      service,
      date: formatDate(date),
      startTime,
      endTime,
      duration,
      staff,
    };

    try {
      const updatedBookings = [...bookings, bookingData];
      localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      alert('Booking saved to local storage');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving booking');
    }
  };

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${convertTo24Hour(startTime)}:00`);
      const end = new Date(`1970-01-01T${convertTo24Hour(endTime)}:00`);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // in hours
      setDuration(diff.toString());
    }
  };

  useEffect(() => {
    calculateDuration();
  }, [startTime, endTime]);

  const handleDelete = (index: number) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hours = i % 12 === 0 ? 12 : i % 12;
        const minutes = j.toString().padStart(2, '0');
        const period = i < 12 ? 'AM' : 'PM';
        times.push(`${hours}:${minutes} ${period}`);
      }
    }
    return times;
  };

  const convertTo24Hour = (time: string) => {
    const [hourMinute, period] = time.split(' ');
    let [hour, minute] = hourMinute.split(':').map(Number);
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  };

  const timeOptions = generateTimeOptions();

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl mb-6">Service Management</h1>

      {/* Service Catalogue */}
      <section className="w-full max-w-4xl mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl mb-4">Service Catalogue</h2>

        <div className="grid grid-cols-3 gap-4">
          {/* Registered Nurse */}
          <div className="flex flex-col items-center">
            <img
              src="/images/serviceImg1.jpg"
              alt="Registered Nurse"
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-2 text-center">
              <b>Registered Nurse:</b> <br />
              Provide comprehensive nursing care, manage medications, monitor
              health conditions, and develop care plans.
            </p>
          </div>

          {/* Personal Care Assistant */}
          <div className="flex flex-col items-center">
            <img
              src="/images/serviceImg2.jpg"
              alt="Personal Care Assistant"
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-2 text-center">
              <b>Personal Care Assistants:</b> <br />
              Assist with daily living activities such as bathing, dressing,
              grooming, and mobility.
            </p>
          </div>

          {/* Activity Coordinator */}
          <div className="flex flex-col items-center">
            <img
              src="/images/serviceImg3.jpg"
              alt="Activity Coordinator"
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-2 text-center">
              <b>Activity Coordinators:</b> <br />
              Organize and facilitate social, recreational, and therapeutic
              activities for residents.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="w-full max-w-4xl mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl mb-4">Book a Service</h2>
        <form onSubmit={handleBooking}>
          {errors.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error:</strong>
              <ul className="list-disc pl-5">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="service"
            >
              Service
            </label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a service</option>
              <option value="Registered Nurse">Registered Nurse</option>
              <option value="Personal Care Assistant">
                Personal Care Assistant
              </option>
              <option value="Activity Coordinator">Activity Coordinator</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="staff"
            >
              Staff
            </label>
            <select
              id="staff"
              value={staff}
              onChange={(e) => setStaff(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a staff member</option>
              {staffOptions.map((staff, index) => (
                <option key={index} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="startTime"
            >
              Start Time
            </label>
            <select
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a start time</option>
              {timeOptions.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="endTime"
            >
              End Time
            </label>
            <select
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select an end time</option>
              {timeOptions.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duration (hours)
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Book Service
          </button>
        </form>
      </section>

      {/* Current Bookings */}
      <section className="w-full max-w-4xl mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl mb-4">Current Bookings</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">Service</th>
              <th className="border-b py-2 px-4">Date</th>
              <th className="border-b py-2 px-4">Start Time</th>
              <th className="border-b py-2 px-4">End Time</th>
              <th className="border-b py-2 px-4">Duration</th>
              <th className="border-b py-2 px-4">Staff</th>
              <th className="border-b py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="border-b py-2 px-4">{booking.service}</td>
                <td className="border-b py-2 px-4">{booking.date}</td>
                <td className="border-b py-2 px-4">{booking.startTime}</td>
                <td className="border-b py-2 px-4">{booking.endTime}</td>
                <td className="border-b py-2 px-4">{booking.duration}</td>
                <td className="border-b py-2 px-4">{booking.staff}</td>
                <td className="border-b py-2 px-4">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
