'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import DynamicTable from '../components/Table'; // Adjust the path based on your folder structure
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function FacilityManagement() {
  const [members, setMembers] = useState<any[]>([]); // Ensure members is initialised as an empty array

  useEffect(() => {
    const storedData = localStorage.getItem('facilityData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setMembers(Array.isArray(parsedData) ? parsedData : []); // Ensure parsedData is an array
      } catch (error) {
        console.error('Error parsing stored data:', error);
        setMembers([]); // Fallback to an empty array if parsing fails
      }
    } else {
      const dummyData = [
        {
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
        },
      ];

      localStorage.setItem('facilityData', JSON.stringify(dummyData));
      setMembers(dummyData);
    }
  }, []);

  const saveData = (newData: any[]) => {
    localStorage.setItem('facilityData', JSON.stringify(newData));
    setMembers(newData);
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

    const updatedData = [...members, newMember];

    saveData(updatedData);
  };

  const clearData = () => {
    localStorage.removeItem('facilityData');
    setMembers([]);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4">
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
        <Slider {...settings}>
          {members.map((member, index) => (
            <div key={index} className="p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {member?.personalDetails.name}
                </h2>

                <DynamicTable
                  data={[
                    { Attribute: 'Name', Value: member.personalDetails.name },
                    { Attribute: 'Age', Value: member.personalDetails.age },
                    {
                      Attribute: 'Gender',
                      Value: member.personalDetails.gender,
                    },
                  ]}
                />

                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Care Plans:</h3>
                  <DynamicTable
                    data={member.carePlans.map((plan) => ({
                      Date: plan.date,
                      Plan: plan.plan,
                    }))}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Medications:</h3>
                  <DynamicTable
                    data={member.medications.map((medication) => ({
                      Name: medication.name,
                      Dosage: medication.dosage,
                    }))}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Family Contacts:</h3>
                  <DynamicTable
                    data={member.familyContacts.map((contact) => ({
                      Relation: contact.relation,
                      Name: contact.name,
                      Contact: contact.contact,
                    }))}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold">
                    Accessibility Requirements:
                  </h3>
                  <DynamicTable
                    data={member.accessibilityRequirements.map(
                      (requirement) => ({
                        Requirement: requirement.requirement,
                      })
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </main>
  );
}
