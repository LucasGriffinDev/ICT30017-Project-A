import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-blue-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 h-full">
        <div className="flex justify-between items-center h-full">
          <ul className="hidden md:flex gap-x-8 text-white text-lg font-medium">
            <li>
              <Link href="/">
                <p className="hover:text-gray-300 transition">Home</p>
              </Link>
            </li>
            <li>
              <Link href="/member">
                <p className="hover:text-gray-300 transition">
                  Member Management
                </p>
              </Link>
            </li>
            <li>
              <Link href="/staff">
                <p className="hover:text-gray-300 transition">
                  Staff Management
                </p>
              </Link>
            </li>
            <li>
              <Link href="/service">
                <p className="hover:text-gray-300 transition">
                  Service Management
                </p>
              </Link>
            </li>
            <li>
              <Link href="/facility">
                <p className="hover:text-gray-300 transition">
                  Facility Management
                </p>
              </Link>
            </li>
            <li>
              <Link href="/scheduling">
                <p className="hover:text-gray-300 transition">
                  Scheduling Management
                </p>
              </Link>
            </li>
            <li>
              <Link href="/inventory">
                <p className="hover:text-gray-300 transition">
                  Inventory Management
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
