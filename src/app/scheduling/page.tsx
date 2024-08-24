import React from 'react';


export default function facilityManagment() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-around p-24">
            <h1 className="text-4xl">Scheduling Management Page</h1>
            <div className="flex space-x-4 mb-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add Schedule
                </button>
            </div>

            <table className="table-auto border-separate border-spacing-1">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2">Staff_ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Position</th>
                        <th className="p-2">Shift</th>
                        <th className="p-2">Day</th>
                        <th className="p-2">Start Time</th>
                        <th className="p-2">End Time</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 text-right">1</td>
                        <td className="p-2">John</td>
                        <td className="p-2">Cleaner</td>
                        <td className="p-2">Morning</td>
                        <td className="p-2">Monday</td>
                        <td className="p-2">08:00 AM</td>
                        <td className="p-2">04:00 PM</td>
                        <td className="p-2 flex space-x-2">
                            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                                Edit
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                Remove
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-2 text-right">2</td>
                        <td className="p-2">Fiona</td>
                        <td className="p-2">Manager</td>
                        <td className="p-2">Evening</td>
                        <td className="p-2">Tuesday</td>
                        <td className="p-2">02:00 PM</td>
                        <td className="p-2">10:00 PM</td>
                        <td className="p-2 flex space-x-2">
                            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                                Edit
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                Remove
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
           
        </main>
    );
}