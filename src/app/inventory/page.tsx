import React from 'react';


export default function facilityManagment() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-around p-24">
            <h1 className="text-4xl ">Inventory Management System</h1>

            <table className="table-auto border-separate border-spacing-1">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2">Item_ID</th>
                        <th className="p-2">SKU</th>
                        <th className="p-2">Prod_Name</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Unit</th>
                        <th className="p-2">Size</th>
                        <th className="p-2">Par_Level</th>
                        <th className="p-2">Qty_in_Stock</th>
                        <th className="p-2">Threshold</th>
                        <th className="p-2">Re-order</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 text-right">1</td>
                        <td className="p-2">FK0001</td>
                        <td className="p-2">Face Mask</td>
                        <td className="p-2">PPE</td>
                        <td className="p-2">Box</td>
                        <td className="p-2 text-right">100</td>
                        <td className="p-2 text-right">5</td>
                        <td className="p-2 text-right">2</td>
                        <td className="p-2 text-right">1</td>
                        <td className="p-2">No</td>
                    </tr>
                    <tr>
                        <td className="p-2 text-right">2</td>
                        <td className="p-2">TP0001</td>
                        <td className="p-2">Toilet Paper</td>
                        <td className="p-2">Cleaning</td>
                        <td className="p-2">Box</td>
                        <td className="p-2 text-right">50</td>
                        <td className="p-2 text-right">10</td>
                        <td className="p-2 text-right">5</td>
                        <td className="p-2 text-right">5</td>
                        <td className="p-2">Yes</td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}