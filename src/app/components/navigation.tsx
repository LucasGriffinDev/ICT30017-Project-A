import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/member">
                  <p>Member Managment</p>
                </Link>
              </li>
              <li>
                <Link href="/staff">
                  <p>Staff Managment</p>
                </Link>
              </li>
              <li>
                <Link href="/service">
                  <p>Service Managment</p>
                </Link>
              </li>
              <li>
                <Link href="/facility">
                  <p>Facility Managment</p>
                </Link>
              </li>
              <li>
                <Link href="/scheduling">
                  <p>Scheduling Managment</p>
                </Link>
              </li>
              <li>
                <Link href="/inventory">
                  <p>Inventory Managment</p>
                </Link>
              </li>
            </ul>
            <ul>
              <img src="./logo.jpg" alt="Aged Care Logo" className="h-12" />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
