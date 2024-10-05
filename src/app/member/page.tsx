'use client';

import React, { useState, useEffect } from 'react';
import DynamicTable from '../components/DynamicTable';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function FacilityManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({
    personalDetails: {
      name: '',
      age: '',
      gender: '',
    },
    carePlans: [],
    medications: [],
    familyContacts: [],
    accessibilityRequirements: [],
  });

  const [newCarePlan, setNewCarePlan] = useState({ date: '', plan: '' });
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '' });
  const [newFamilyContact, setNewFamilyContact] = useState({
    relation: '',
    name: '',
    contact: '',
  });
  const [newAccessibilityRequirement, setNewAccessibilityRequirement] =
    useState({
      requirement: '',
    });

  useEffect(() => {
    const storedData = localStorage.getItem('facilityData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setMembers(Array.isArray(parsedData) ? parsedData : []);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        setMembers([]);
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
    setShowModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = [...members, newMember];
    saveData(updatedData);
    setShowModal(false);
    // Reset newMember state
    setNewMember({
      personalDetails: {
        name: '',
        age: '',
        gender: '',
      },
      carePlans: [],
      medications: [],
      familyContacts: [],
      accessibilityRequirements: [],
    });
    setNewCarePlan({ date: '', plan: '' });
    setNewMedication({ name: '', dosage: '' });
    setNewFamilyContact({ relation: '', name: '', contact: '' });
    setNewAccessibilityRequirement({ requirement: '' });
  };

  const addCarePlan = () => {
    if (newCarePlan.date && newCarePlan.plan) {
      setNewMember({
        ...newMember,
        carePlans: [...newMember.carePlans, newCarePlan],
      });
      setNewCarePlan({ date: '', plan: '' });
    }
  };

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      setNewMember({
        ...newMember,
        medications: [...newMember.medications, newMedication],
      });
      setNewMedication({ name: '', dosage: '' });
    }
  };

  const addFamilyContact = () => {
    if (
      newFamilyContact.relation &&
      newFamilyContact.name &&
      newFamilyContact.contact
    ) {
      setNewMember({
        ...newMember,
        familyContacts: [...newMember.familyContacts, newFamilyContact],
      });
      setNewFamilyContact({ relation: '', name: '', contact: '' });
    }
  };

  const addAccessibilityRequirement = () => {
    if (newAccessibilityRequirement.requirement) {
      setNewMember({
        ...newMember,
        accessibilityRequirements: [
          ...newMember.accessibilityRequirements,
          newAccessibilityRequirement,
        ],
      });
      setNewAccessibilityRequirement({ requirement: '' });
    }
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-full max-w-2xl max-h-full overflow-y-auto">
            <h2 className="text-2xl mb-4">Add New Member</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Personal Details</h3>
                <input
                  type="text"
                  placeholder="Name"
                  className="border p-2 w-full mb-2"
                  value={newMember.personalDetails.name}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      personalDetails: {
                        ...newMember.personalDetails,
                        name: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Age"
                  className="border p-2 w-full mb-2"
                  value={newMember.personalDetails.age}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      personalDetails: {
                        ...newMember.personalDetails,
                        age: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Gender"
                  className="border p-2 w-full mb-2"
                  value={newMember.personalDetails.gender}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      personalDetails: {
                        ...newMember.personalDetails,
                        gender: e.target.value,
                      },
                    })
                  }
                />
              </div>

              {/* Care Plans */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Care Plans</h3>
                {newMember.carePlans.map((plan, index) => (
                  <div key={index} className="mb-2">
                    {plan.date} - {plan.plan}
                  </div>
                ))}
                <div className="flex mb-2">
                  <input
                    type="date"
                    className="border p-2 w-1/2 mr-2"
                    value={newCarePlan.date}
                    onChange={(e) =>
                      setNewCarePlan({ ...newCarePlan, date: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Plan"
                    className="border p-2 w-1/2"
                    value={newCarePlan.plan}
                    onChange={(e) =>
                      setNewCarePlan({ ...newCarePlan, plan: e.target.value })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={addCarePlan}
                >
                  Add Care Plan
                </button>
              </div>

              {/* Medications */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Medications</h3>
                {newMember.medications.map((med, index) => (
                  <div key={index} className="mb-2">
                    {med.name} - {med.dosage}
                  </div>
                ))}
                <div className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Medication Name"
                    className="border p-2 w-1/2 mr-2"
                    value={newMedication.name}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Dosage"
                    className="border p-2 w-1/2"
                    value={newMedication.dosage}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        dosage: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={addMedication}
                >
                  Add Medication
                </button>
              </div>

              {/* Family Contacts */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Family Contacts</h3>
                {newMember.familyContacts.map((contact, index) => (
                  <div key={index} className="mb-2">
                    {contact.relation} - {contact.name} - {contact.contact}
                  </div>
                ))}
                <div className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Relation"
                    className="border p-2 w-1/3 mr-2"
                    value={newFamilyContact.relation}
                    onChange={(e) =>
                      setNewFamilyContact({
                        ...newFamilyContact,
                        relation: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-1/3 mr-2"
                    value={newFamilyContact.name}
                    onChange={(e) =>
                      setNewFamilyContact({
                        ...newFamilyContact,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Contact"
                    className="border p-2 w-1/3"
                    value={newFamilyContact.contact}
                    onChange={(e) =>
                      setNewFamilyContact({
                        ...newFamilyContact,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={addFamilyContact}
                >
                  Add Family Contact
                </button>
              </div>

              {/* Accessibility Requirements */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">
                  Accessibility Requirements
                </h3>
                {newMember.accessibilityRequirements.map((req, index) => (
                  <div key={index} className="mb-2">
                    {req.requirement}
                  </div>
                ))}
                <div className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Requirement"
                    className="border p-2 w-full"
                    value={newAccessibilityRequirement.requirement}
                    onChange={(e) =>
                      setNewAccessibilityRequirement({
                        requirement: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={addAccessibilityRequirement}
                >
                  Add Accessibility Requirement
                </button>
              </div>

              {/* Submit and Cancel buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowModal(false);
                    setNewMember({
                      personalDetails: {
                        name: '',
                        age: '',
                        gender: '',
                      },
                      carePlans: [],
                      medications: [],
                      familyContacts: [],
                      accessibilityRequirements: [],
                    });
                    setNewCarePlan({ date: '', plan: '' });
                    setNewMedication({ name: '', dosage: '' });
                    setNewFamilyContact({
                      relation: '',
                      name: '',
                      contact: '',
                    });
                    setNewAccessibilityRequirement({ requirement: '' });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                    data={member.carePlans.map((plan: any) => ({
                      Date: plan.date,
                      Plan: plan.plan,
                    }))}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Medications:</h3>
                  <DynamicTable
                    data={member.medications.map((medication: any) => ({
                      Name: medication.name,
                      Dosage: medication.dosage,
                    }))}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Family Contacts:</h3>
                  <DynamicTable
                    data={member.familyContacts.map((contact: any) => ({
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
                      (requirement: any) => ({
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
