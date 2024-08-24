import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <header className="w-full flex justify-between items-center p-4 bg-blue-900 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Aged Care Management</h1>
        <button className="bg-white text-blue-900 font-semibold py-2 px-4 rounded">
          Log Out
        </button>
      </header>

      <main className="w-full flex flex-col items-center mt-12">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 text-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">
            Welcome Back!
          </h2>
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
              <h3 className="text-xl font-semibold text-blue-900">
                Care Plans
              </h3>
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

      <footer className="w-full flex justify-center items-center mt-12 p-4 bg-blue-900 text-white">
        © 2024 Aged Care Management Inc. All rights reserved.
      </footer>
    </div>
  );
}
