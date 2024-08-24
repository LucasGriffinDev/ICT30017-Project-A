'use client';

import React, { useState, useEffect } from 'react';
import DynamicTable from '../components/Table'; // Ensure the path is correct

export default function FacilityManagement() {
  const [data, setData] = useState({
    personalDetails: {},
    carePlans: [],
    medications: [],
    familyContacts: [],
    accessibilityRequirements: [],
  });

  useEffect(() => {
    const storedData = localStorage.getItem('facilityData');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const dummyData = {
        personalDetails: {
          name: 'John Doe',
          age: 85,
          gender: 'Male',
        },
        carePlans: [
          {
            date: '2024-08-01',
            plan: 'Daily physiotherapy and a balanced diet',
          },
          {
            date: '2024-08-02',
            plan: 'Weekly mental health check-up and light exercises',
          },
        ],
        medications: [
          {
            name: 'Aspirin',
            dosage: '100mg daily',
          },
          {
            name: 'Metformin',
            dosage: '500mg twice daily',
          },
        ],
        familyContacts: [
          {
            relation: 'Son',
            name: 'Michael Doe',
            contact: '+61 400 000 000',
          },
          {
            relation: 'Daughter',
            name: 'Emily Doe',
            contact: '+61 400 000 001',
          },
        ],
        accessibilityRequirements: [
          { requirement: 'Wheelchair access required' },
          { requirement: 'Room on ground floor' },
        ],
      };

      localStorage.setItem('facilityData', JSON.stringify(dummyData));
      setData(dummyData);
    }
  }, []);

  const saveData = (newData: any) => {
    localStorage.setItem('facilityData', JSON.stringify(newData));
    setData(newData);
  };

  const addNewMember = () => {
    const newMember = {
      personalDetails: {
        name: 'Jane Smith',
        age: 90,
        gender: 'Female',
      },
      carePlans: [
        {
          date: '2024-08-03',
          plan: 'Daily walking and a low-sodium diet',
        },
      ],
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg daily',
        },
      ],
      familyContacts: [
        {
          relation: 'Son',
          name: 'David Smith',
          contact: '+61 400 000 002',
        },
      ],
      accessibilityRequirements: [
        { requirement: 'Hearing aid support' },
        { requirement: 'Accessible bathroom' },
      ],
    };

    const updatedData = {
      ...data,
      personalDetails: newMember.personalDetails,
      carePlans: [...data.carePlans, ...newMember.carePlans],
      medications: [...data.medications, ...newMember.medications],
      familyContacts: [...data.familyContacts, ...newMember.familyContacts],
      accessibilityRequirements: [
        ...data.accessibilityRequirements,
        ...newMember.accessibilityRequirements,
      ],
    };

    saveData(updatedData);
  };

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

      <div className="w-full max-w-4xl">
        <DynamicTable
          data={[
            { Category: 'Name', Details: data.personalDetails.name || 'N/A' },
            { Category: 'Age', Details: data.personalDetails.age || 'N/A' },
            {
              Category: 'Gender',
              Details: data.personalDetails.gender || 'N/A',
            },
          ]}
        />

        <DynamicTable
          data={data.carePlans.map((plan) => ({
            Date: plan.date,
            Plan: plan.plan,
          }))}
        />

        <DynamicTable
          data={data.medications.map((medication) => ({
            Name: medication.name,
            Dosage: medication.dosage,
          }))}
        />

        <DynamicTable
          data={data.familyContacts.map((contact) => ({
            Relation: contact.relation,
            Name: contact.name,
            Contact: contact.contact,
          }))}
        />

        <DynamicTable
          data={data.accessibilityRequirements.map((requirement) => ({
            Requirement: requirement.requirement,
          }))}
        />
      </div>
    </main>
  );
}
