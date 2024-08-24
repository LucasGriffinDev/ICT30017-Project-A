"use client";

import React, { useState, useEffect } from 'react';

export default function FacilityManagement() {
    // Initialize state for data
    const [data, setData] = useState({
        personalDetails: {},
        carePlans: [],
        medications: [],
        familyContacts: [],
        accessibilityRequirements: [],
    });

    // Fetch data from localStorage on component mount
    useEffect(() => {
        const storedData = localStorage.getItem('facilityData');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            // Dummy data if nothing is stored yet
            const dummyData = {
                personalDetails: {
                    name: "John Doe",
                    age: 85,
                    gender: "Male",
                },
                carePlans: [
                    {
                        date: "2024-08-01",
                        plan: "Daily physiotherapy and a balanced diet",
                    },
                    {
                        date: "2024-08-02",
                        plan: "Weekly mental health check-up and light exercises",
                    },
                ],
                medications: [
                    {
                        name: "Aspirin",
                        dosage: "100mg daily",
                    },
                    {
                        name: "Metformin",
                        dosage: "500mg twice daily",
                    },
                ],
                familyContacts: [
                    {
                        relation: "Son",
                        name: "Michael Doe",
                        contact: "+61 400 000 000",
                    },
                    {
                        relation: "Daughter",
                        name: "Emily Doe",
                        contact: "+61 400 000 001",
                    },
                ],
                accessibilityRequirements: [
                    "Wheelchair access required",
                    "Room on ground floor",
                ],
            };

            // Save dummy data to localStorage and state
            localStorage.setItem('facilityData', JSON.stringify(dummyData));
            setData(dummyData);
        }
    }, []);

    // Save data to localStorage and update state
    const saveData = (newData) => {
        localStorage.setItem('facilityData', JSON.stringify(newData));
        setData(newData);
    };

    // Function to add a new member
    const addNewMember = () => {
        const newMember = {
            personalDetails: {
                name: "Jane Smith",
                age: 90,
                gender: "Female",
            },
            carePlans: [
                {
                    date: "2024-08-03",
                    plan: "Daily walking and a low-sodium diet",
                },
            ],
            medications: [
                {
                    name: "Lisinopril",
                    dosage: "10mg daily",
                },
            ],
            familyContacts: [
                {
                    relation: "Son",
                    name: "David Smith",
                    contact: "+61 400 000 002",
                },
            ],
            accessibilityRequirements: [
                "Hearing aid support",
                "Accessible bathroom",
            ],
        };

        // Updating the current state with new member details
        const updatedData = {
            ...data,
            personalDetails: newMember.personalDetails,
            carePlans: [...data.carePlans, ...newMember.carePlans],
            medications: [...data.medications, ...newMember.medications],
            familyContacts: [...data.familyContacts, ...newMember.familyContacts],
            accessibilityRequirements: [...data.accessibilityRequirements, ...newMember.accessibilityRequirements],
        };

        // Save the updated data to localStorage
        saveData(updatedData);
    };

    // Function to clear local storage and reset data
    const clearData = () => {
        localStorage.removeItem('facilityData');
        setData({
            personalDetails: {},
            carePlans: [],
            medications: [],
            familyContacts: [],
            accessibilityRequirements: [],
        });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-4">
            <h1 className="text-4xl mb-4 mt-4">Member Management Page</h1>

            <div className="flex space-x-4 mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addNewMember}
                >
                    Add New Member
                </button>

                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={clearData}
                >
                    Clear Data
                </button>
            </div>

            <table className="table-auto w-full text-left">
                <thead>
                <tr>
                    <th className="px-4 py-2 text-2xl font-bold">Category</th>
                    <th className="px-4 py-2 text-2xl font-bold">Details</th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 font-bold">Personal Details</td>
                    <td className="border px-4 py-2">
                        <p>Name: {data.personalDetails.name || "N/A"}</p>
                        <p>Age: {data.personalDetails.age || "N/A"}</p>
                        <p>Gender: {data.personalDetails.gender || "N/A"}</p>
                    </td>
                </tr>

                <tr>
                    <td className="border px-4 py-2 font-bold">Care Plans</td>
                    <td className="border px-4 py-2">
                        <ul>
                            {data.carePlans.length > 0 ? (
                                data.carePlans.map((plan, index) => (
                                    <li key={index}>
                                        <strong>Date:</strong> {plan.date} - <strong>Plan:</strong> {plan.plan}
                                    </li>
                                ))
                            ) : (
                                <li>No care plans available</li>
                            )}
                        </ul>
                    </td>
                </tr>

                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 font-bold">Medication Tracking</td>
                    <td className="border px-4 py-2">
                        <ul>
                            {data.medications.length > 0 ? (
                                data.medications.map((medication, index) => (
                                    <li key={index}>
                                        <strong>Name:</strong> {medication.name} - <strong>Dosage:</strong> {medication.dosage}
                                    </li>
                                ))
                            ) : (
                                <li>No medications available</li>
                            )}
                        </ul>
                    </td>
                </tr>

                <tr>
                    <td className="border px-4 py-2 font-bold">Family Contacts</td>
                    <td className="border px-4 py-2">
                        <ul>
                            {data.familyContacts.length > 0 ? (
                                data.familyContacts.map((contact, index) => (
                                    <li key={index}>
                                        <strong>Relation:</strong> {contact.relation} - <strong>Name:</strong> {contact.name} - <strong>Contact:</strong> {contact.contact}
                                    </li>
                                ))
                            ) : (
                                <li>No family contacts available</li>
                            )}
                        </ul>
                    </td>
                </tr>

                <tr className="bg-gray-100">
                    <td className="border px-4 py-2 font-bold">Accessibility Requirements</td>
                    <td className="border px-4 py-2">
                        <ul>
                            {data.accessibilityRequirements.length > 0 ? (
                                data.accessibilityRequirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))
                            ) : (
                                <li>No accessibility requirements available</li>
                            )}
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
        </main>
    );
}
