// pages/index.js

import Image from 'next/image';
import Card from './components/card';

export default function Home() {
  const pages = [
    {
      link: '/member',
      title: 'Member Management',
      description: 'Manage member profiles and details effectively.',
    },
    {
      link: '/staff',
      title: 'Staff Management',
      description:
        'Manage staff profiles, including roles, qualifications, employment types, and remuneration details.',
    },
    {
      link: '/service',
      title: 'Service Management',
      description:
        'Manage and track various services, including duration, staff assignments, and real-time reporting.',
    },
    {
      link: '/facility',
      title: 'Facility Management',
      description:
        'Oversee residential facilities, room assignments, utilities, and reservations.',
    },
    {
      link: '/scheduling',
      title: 'Staff Scheduling',
      description:
        'Organize and track staff assignments and scheduling conflicts.',
    },
    {
      link: '/inventory',
      title: 'Inventory Management',
      description:
        'Track and manage inventory of necessities, medications, and essential goods.',
    },
  ];

  return (
    <main className="flex-grow w-full flex flex-col items-center mt-12 p-8">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Welcome Back!</h2>
        <p className="mb-4 text-lg">
          Manage all aspects of aged care efficiently and effectively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {pages.map((page, index) => (
            <Card
              key={index}
              link={page.link}
              title={page.title}
              description={page.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
