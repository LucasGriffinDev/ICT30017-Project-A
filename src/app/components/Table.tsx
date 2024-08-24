import React from 'react';

interface DynamicTableProps {
  data: Record<string, any>[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // Extract the keys from the first object in the array to determine the columns
  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 text-2xl font-bold bg-blue-900 text-white border-b"
              >
                {col.charAt(0).toUpperCase() +
                  col.slice(1).replace(/([A-Z])/g, ' $1')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
