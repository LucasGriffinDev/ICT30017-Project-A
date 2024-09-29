// components/Card.js

import Link from 'next/link';

const Card = ({ link, title, description }) => {
  return (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-blue-900">
        <Link href={link}>
          <p className="hover:text-gray-300 transition">{title}</p>
        </Link>
      </h3>
      <p className="mt-2 text-gray-700">{description}</p>
    </div>
  );
};

export default Card;
