import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex-grow w-full flex flex-col items-center mt-12 p-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Welcome Back!</h2>
        <p className="mb-4 text-lg">
          Manage all aspects of aged care efficiently and effectively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-900">Dashboard</h3>
            <p className="mt-2 text-gray-700">
              Access key metrics and manage daily tasks.
            </p>
          </div>
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-900">Care Plans</h3>
            <p className="mt-2 text-gray-700">
              Create, review, and update care plans seamlessly.
            </p>
          </div>
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-900">
              Medication Tracking
            </h3>
            <p className="mt-2 text-gray-700">
              Monitor and manage medication schedules with ease.
            </p>
          </div>
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-900">
              Family Contacts
            </h3>
            <p className="mt-2 text-gray-700">
              Stay connected with family members and caregivers.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
