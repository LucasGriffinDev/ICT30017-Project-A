'use client';

import React, { useState, useEffect } from 'react';

interface Schedule {
  staffId: string;
  name: string;
  position: string;
  shift: string;
  day: string;
  startTime: string;
  endTime: string;
  duration: string;
}

export default function SchedulingManagement() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [staffId, setStaffId] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [shift, setShift] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSchedules = localStorage.getItem('schedules');
      if (storedSchedules) {
        setSchedules(JSON.parse(storedSchedules));
      }
    }
  }, []);

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const shiftOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 15) {
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

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${convertTo24Hour(startTime)}:00`);
      const end = new Date(`1970-01-01T${convertTo24Hour(endTime)}:00`);
      const diffInMs = end.getTime() - start.getTime();
      if (diffInMs > 0) {
        const totalMinutes = diffInMs / (1000 * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        let durationString = '';
        if (hours > 0) {
          durationString += `${hours} hour${hours > 1 ? 's' : ''}`;
        }
        if (minutes > 0) {
          if (hours > 0) durationString += ' ';
          durationString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
        setDuration(durationString);
      } else {
        setDuration('');
      }
    } else {
      setDuration('');
    }
  }, [startTime, endTime]);

  const addSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (
      !staffId ||
      !name ||
      !position ||
      !shift ||
      !day ||
      !startTime ||
      !endTime
    ) {
      setErrors((prev) => [...prev, 'All fields are required.']);
      return;
    }

    const start = new Date(`1970-01-01T${convertTo24Hour(startTime)}:00`);
    const end = new Date(`1970-01-01T${convertTo24Hour(endTime)}:00`);
    if (start >= end) {
      setErrors((prev) => [...prev, 'End time must be after start time.']);
      return;
    }

    const hasConflict = schedules.some((schedule) => {
      if (schedule.staffId !== staffId || schedule.day !== day) {
        return false;
      }
      const existingStart = new Date(
        `1970-01-01T${convertTo24Hour(schedule.startTime)}:00`
      );
      const existingEnd = new Date(
        `1970-01-01T${convertTo24Hour(schedule.endTime)}:00`
      );

      return (
        (start >= existingStart && start < existingEnd) ||
        (end > existingStart && end <= existingEnd) ||
        (start <= existingStart && end >= existingEnd)
      );
    });

    if (hasConflict) {
      setErrors((prev) => [
        ...prev,
        'This schedule conflicts with an existing shift for this staff member.',
      ]);
      return;
    }

    const newSchedule: Schedule = {
      staffId,
      name,
      position,
      shift,
      day,
      startTime,
      endTime,
      duration,
    };

    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);

    if (typeof window !== 'undefined') {
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
    }

    setStaffId('');
    setName('');
    setPosition('');
    setShift('');
    setDay('');
    setStartTime('');
    setEndTime('');
    setDuration('');
  };

  const deleteSchedule = (index: number) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);

    if (typeof window !== 'undefined') {
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
    }
  };

  return (
    <main className="flex flex-col items-center p-8">
      <div className="w-full max-w-[60%] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-900 text-center">
          Scheduling Management Page
        </h1>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Add Schedule</h2>
          <form onSubmit={addSchedule} className="space-y-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Staff ID
                </label>
                <input
                  type="text"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Shift
                </label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="">Select Shift</option>
                  {shiftOptions.map((shiftOption, index) => (
                    <option key={index} value={shiftOption}>
                      {shiftOption}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Day
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="">Select Day</option>
                  {daysOfWeek.map((dayOption, index) => (
                    <option key={index} value={dayOption}>
                      {dayOption}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Start Time
                </label>
                <select
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
                <label className="block text-gray-700 font-bold mb-2">
                  End Time
                </label>
                <select
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
                <label className="block text-gray-700 font-bold mb-2">
                  Shift Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  readOnly
                  className="border rounded w-full py-2 px-3 bg-gray-100"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Add Schedule
            </button>
          </form>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-6">Current Schedules</h2>
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Staff ID
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Name
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Position
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Shift
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Day
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="border px-4 py-2">{schedule.staffId}</td>
                    <td className="border px-4 py-2">{schedule.name}</td>
                    <td className="border px-4 py-2">{schedule.position}</td>
                    <td className="border px-4 py-2">{schedule.shift}</td>
                    <td className="border px-4 py-2">{schedule.day}</td>
                    <td className="border px-4 py-2">{schedule.startTime}</td>
                    <td className="border px-4 py-2">{schedule.endTime}</td>
                    <td className="border px-4 py-2">{schedule.duration}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => deleteSchedule(index)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {schedules.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="border px-4 py-2 text-center text-gray-500"
                    >
                      No schedules available.
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
