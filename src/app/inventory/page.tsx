'use client';

import React, { useState, useEffect} from 'react';


interface Item {
    item_id: number;
    sku: string;
    prod_name: string;
    category: string;
    unit: string;
    size: number;
    par_level: number;
    qty_in_stock: number;
    threshold: number;
    re_order: boolean;
}

// Default item for form
const defaultItem: Item = {
    item_id: 0,
    sku: "",
    prod_name: "",
    category: "",
    unit: "",
    size: 0,
    par_level: 0,
    qty_in_stock: 0,
    threshold: 0,
    re_order: false,
};
    

export default  function FacilityManagement() {

    // Initialize state for modal visibility
    const [showModal, setShowModal] = useState(false);

    // Initialize state for data
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState<Item>(defaultItem);
    

    // Fetch data from localStorage on component mount
    useEffect(() => {
        // load data from local storage on component mount
        const storedItems = localStorage.getItem('inventoryData');
        if (storedItems) {
            try {
                const parsedItems = JSON.parse(storedItems);
                if (Array.isArray(parsedItems)) {
                    setItems(parsedItems);
                } else {
                    console.error("Data in local storage is not an array");
                }
            } catch (e) {
                console.error("Failed to parse local storage data", e);
            }
        } else {
            setItems([defaultItem]);
        }
    }, []);

    // Save data to localStorage when items change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    }

    // handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 
        // Calculate the next item_id
        const nextItemId = items.length > 0 ? Math.max(...items.map(item => item.item_id)) + 1 : 1;

        // Determine if re_order should be true based on threshold
        const reOrderStatus = newItem.qty_in_stock <= newItem.threshold;

        // Add the item with the new item_id and calculated re_order status
        addItem({ ...newItem, item_id: nextItemId, re_order: reOrderStatus });

        // Reset the form
        resetForm();

        setShowModal(false);
    }

    // Add item to the list
    const addItem = (item: Item) => {
        const updatedItems = [...items, item];
        setItems(updatedItems);
        localStorage.setItem('facilityData', JSON.stringify(items));
    }

    // Remove item from the list
    const removeItem = (item_id: number) => {
        const updatedItems = items.filter((item) => item.item_id !== item_id);
        setItems(updatedItems);
        localStorage.setItem('facilityData', JSON.stringify(items));
    }

    // Function to edit an item
    const editItem = (item_id: number) => {
        const itemToEdit = items.find(item => item.item_id === item_id);
        if (itemToEdit) {
            setNewItem(itemToEdit);
            setShowModal(true);
        } else {
            console.error("Item not found");
        }
    }

    // Function to reset the form
    const resetForm = () => {
        setNewItem(defaultItem);
    }

     // Form for adding new items
     function newItemsForm() {
        return (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mb-4">
                                    <label htmlFor="sku" className="block text-gray-700 text-sm font-bold mb-2">SKU:</label>
                                    <input
                                        type="text"
                                        id="sku"
                                        name="sku"
                                        value={newItem.sku}
                                        onChange={handleChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="prod_name" className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
                                    <input
                                        type="text"
                                        id="prod_name"
                                        name="prod_name"
                                        value={newItem.prod_name}
                                        onChange={handleChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={newItem.category}
                                        onChange={handleChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="unit" className="block text-gray-700 text-sm font-bold mb-2">Unit:</label>
                                    <input
                                        type="text"
                                        id="unit"
                                        name="unit"
                                        value={newItem.unit}
                                        onChange={handleChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">Size:</label>
                                    <input
                                        type="number"
                                        id="size"
                                        name="size"
                                        value={newItem.size}
                                        onChange={handleChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="par_level" className="block text-gray-700 text-sm font-bold mb-2">Par Level:</label>
                                    <input
                                        type="number"
                                        id="par_level"
                                        name="par_level"
                                        value={newItem.par_level}
                                        onChange={handleChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="qty_in_stock" className="block text-gray-700 text-sm font-bold mb-2">Quantity in Stock:</label>
                                    <input
                                        type="number"
                                        id="qty_in_stock"
                                        name="qty_in_stock"
                                        value={newItem.qty_in_stock}
                                        onChange={handleChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="threshold" className="block text-gray-700 text-sm font-bold mb-2">Threshold:</label>
                                    <input
                                        type="number"
                                        id="threshold"
                                        name="threshold"
                                        value={newItem.threshold}
                                        onChange={handleChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        Add Item
                                    </button>
                                    <button onClick={() => setShowModal(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }


    // Render the components
    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-4">
            <h1 className="text-4xl mb-4 mt-4">Inventory Management</h1>

            <div className="flex space-x-4 mb-4">
                <button onClick={() => setShowModal(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add Item
                </button>
            </div>

            {showModal && newItemsForm()}

            <table className="table-auto w-full text-left">
                <thead>
                    <tr className="bg-gray-500 text-white">
                        <th className="px-4 py-2 font-bold">Item_ID</th>
                        <th className="px-4 py-2 font-bold">SKU</th>
                        <th className="px-4 py-2 font-bold">Prod_Name</th>
                        <th className="px-4 py-2 font-bold">Category</th>
                        <th className="px-4 py-2 font-bold">Unit</th>
                        <th className="px-4 py-2 font-bold">Size</th>
                        <th className="px-4 py-2 font-bold">Par_Level</th>
                        <th className="px-4 py-2 font-bold">Qty_in_Stock</th>
                        <th className="px-4 py-2 font-bold">Threshold</th>
                        <th className="px-4 py-2 font-bold">Re-order</th>
                        <th className="px-4 py-2 font-bold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items?.map((item: Item, index: number) => (
                        <tr key={item.item_id} className={index % 2 === 0 ? "bg-emerald-100": ""}>
                            <td className="px-4 py-2">{item.item_id}</td>
                            <td className="px-4 py-2">{item.sku}</td>
                            <td className="px-4 py-2">{item.prod_name}</td>
                            <td className="px-4 py-2">{item.category}</td>
                            <td className="px-4 py-2">{item.unit}</td>
                            <td className="px-4 py-2">{item.size}</td>
                            <td className="px-4 py-2">{item.par_level}</td>
                            <td className="px-4 py-2">{item.qty_in_stock}</td>
                            <td className="px-4 py-2">{item.threshold}</td>
                            <td className="px-4 py-2">{item.re_order ? "Yes" : "No"}</td>
                            <td className="px-4 py-2 flex justify-center space-x-2 ">
                            <button
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => editItem(item.item_id)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => removeItem(item.item_id)}
                            >
                                Remove
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
   
}