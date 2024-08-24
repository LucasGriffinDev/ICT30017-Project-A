"use client";

import React, { useState, useEffect } from "react";

interface Booking {
  service: string;
  date: string;
  time: string;
  duration: string;
  staff: string;
}

export default function ServiceManagement() {
  const [service, setService] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [staff, setStaff] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem("bookingData");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const staffOptions = ["John Doe", "Jane Smith", "Mike Johnson"];

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bookingData: Booking = {
      service,
      date,
      time,
      duration,
      staff,
    };

    try {
      const updatedBookings = [...bookings, bookingData];
      localStorage.setItem("bookingData", JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      alert("Booking saved to local storage");
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving booking");
    }
  };

  const calculatePerformanceMetrics = () => {
    const serviceCount = bookings.reduce((acc, booking) => {
      acc[booking.service] = (acc[booking.service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const averageDuration = bookings.reduce((acc, booking) => {
      acc[booking.service] =
        (acc[booking.service] || 0) + parseInt(booking.duration);
      return acc;
    }, {} as Record<string, number>);

    for (let service in averageDuration) {
      averageDuration[service] =
        averageDuration[service] / serviceCount[service];
    }

    return { serviceCount, averageDuration };
  };

  const { serviceCount, averageDuration } = calculatePerformanceMetrics();

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h1 className="text-4xl mb-6">Service Management</h1>
      <h1 className="text-4xl mb-6">Service Management</h1>

      {/* Service Catalogue */}
      <section className="w-full max-w-4xl mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl mb-4">Service Catalogue</h2>
        <p>Details about the various services offered.</p>
        <br />
        <p>
          <b>Registered Nurse:</b> <br /> Provide comprehensive nursing care,
          manage medications, monitor health conditions, and develop care plans.
        </p>
        <p>
          <b>Personal Care Assistants:</b> <br /> Assist with daily living
          activities such as bathing, dressing, grooming, and mobility.
        </p>
        <p>
          <b>Activity Coordinators:</b> <br /> Organize and facilitate social,
          recreational, and therapeutic activities for residents.
        </p>
      </section>

      {/* Booking Form */}
      <section className="w-full max-w-4xl mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl mb-4">Book a Service</h2>
        <form onSubmit={handleBooking}>
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              step="1800" // 30 minutes in seconds
              onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duration (hours)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
        <ul>
          {bookings.map((booking, index) => (
            <li key={index} className="mb-2">
              <p>
                <b>Service:</b> {booking.service}
              </p>
              <p>
                <b>Date:</b> {booking.date}
              </p>
              <p>
                <b>Time:</b> {booking.time}
              </p>
              <p>
                <b>Duration:</b> {booking.duration} hours
              </p>
              <p>
                <b>Staff:</b> {booking.staff}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Service Performance Tracking */}
      <section className="w-full max-w-4xl mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl mb-4">Service Performance Tracking</h2>
        <ul>
          {Object.keys(serviceCount).map((service) => (
            <li key={service}>
              <p>
                <b>Service:</b> {service}
              </p>
              <p>
                <b>Bookings:</b> {serviceCount[service]}
              </p>
              <p>
                <b>Average Duration:</b> {averageDuration[service]} hours
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
