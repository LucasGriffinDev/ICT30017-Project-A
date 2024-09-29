// pages/service.js

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
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-[60%] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-900 text-center">
          Service Management
        </h1>

        {/* Service Catalogue */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Service Catalogue</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Registered Nurse */}
            <div className="flex flex-col items-center">
              <img
                src="/images/serviceImg1.jpg"
                alt="Registered Nurse"
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-4 text-center">
                <strong>Registered Nurse:</strong> <br />
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
              <p className="mt-4 text-center">
                <strong>Personal Care Assistants:</strong> <br />
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
              <p className="mt-4 text-center">
                <strong>Activity Coordinators:</strong> <br />
                Organize and facilitate social, recreational, and therapeutic
                activities for residents.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Book a Service</h2>
          <form onSubmit={handleBooking} className="space-y-6">
            {errors.length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error:</strong>
                <ul className="list-disc pl-5">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="service"
              >
                Service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="border rounded w-full py-2 px-3"
              >
                <option value="">Select a service</option>
                <option value="Registered Nurse">Registered Nurse</option>
                <option value="Personal Care Assistant">
                  Personal Care Assistant
                </option>
                <option value="Activity Coordinator">
                  Activity Coordinator
                </option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="staff"
              >
                Staff
              </label>
              <select
                id="staff"
                value={staff}
                onChange={(e) => setStaff(e.target.value)}
                className="border rounded w-full py-2 px-3"
              >
                <option value="">Select a staff member</option>
                {staffOptions.map((staff, index) => (
                  <option key={index} value={staff}>
                    {staff}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
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
                className="border rounded w-full py-2 px-3"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="startTime"
              >
                Start Time
              </label>
              <select
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border rounded w-full py-2 px-3"
              >
                <option value="">Select a start time</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="endTime"
              >
                End Time
              </label>
              <select
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border rounded w-full py-2 px-3"
              >
                <option value="">Select an end time</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="duration"
              >
                Duration (hours)
              </label>
              <input
                type="text"
                id="duration"
                value={duration}
                readOnly
                className="border rounded w-full py-2 px-3 bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Book Service
            </button>
          </form>
        </section>

        {/* Current Bookings */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Current Bookings</h2>
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Service
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Date
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Start Time
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    End Time
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Duration
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Staff
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="border px-4 py-2">{booking.service}</td>
                    <td className="border px-4 py-2">{booking.date}</td>
                    <td className="border px-4 py-2">{booking.startTime}</td>
                    <td className="border px-4 py-2">{booking.endTime}</td>
                    <td className="border px-4 py-2">{booking.duration}</td>
                    <td className="border px-4 py-2">{booking.staff}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDelete(index)}
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
        </section>
      </div>
    </main>
  );
}
