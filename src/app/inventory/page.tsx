// pages/inventory.js

'use client';

import React, { useState, useEffect } from 'react';

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
  sku: '',
  prod_name: '',
  category: '',
  unit: '',
  size: 0,
  par_level: 0,
  qty_in_stock: 0,
  threshold: 0,
  re_order: false,
};

export default function InventoryManagement() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>(defaultItem);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [tooltip, setTooltip] = useState<string | null>(null);

  // State for low stock alerts and reporting
  const [lowStockItems, setLowStockItems] = useState<Item[]>([]);

  // Tooltip texts
  const tooltipText = {
    sku: 'Stock Keeping Unit, a unique identifier for each product.',
    par_level: 'The minimum quantity of the item that should be in stock.',
    threshold: 'The quantity at which a re-order should be triggered.',
  };

  const validCategories = [
    'Cleaning',
    'PPE',
    'Stationary',
    'Medicine',
    'Incontinence',
    'Other',
  ];
  const validUnits = ['Each', 'Box', 'Case'];

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem('inventoryData');
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          if (Array.isArray(parsedItems)) {
            setItems(parsedItems);
            updateLowStockItems(parsedItems);
          } else {
            console.error('Data in local storage is not an array');
          }
        } catch (e) {
          console.error('Failed to parse local storage data', e);
        }
      }
    }
  }, []);

  // Update low stock items whenever items change
  useEffect(() => {
    updateLowStockItems(items);
  }, [items]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid
    if (validateForm()) {
      // Calculate the re_order status
      const reOrderStatus = calculateReOrderStatus(newItem);

      if (isEditMode) {
        // Update the item
        updateItem({ ...newItem, re_order: reOrderStatus });
      } else {
        // Add the item
        // Calculate the next item_id
        const nextItemId =
          items.length > 0
            ? Math.max(...items.map((item) => item.item_id)) + 1
            : 1;

        // Add the item with the new item_id and calculated re_order status
        addItem({ ...newItem, item_id: nextItemId, re_order: reOrderStatus });
      }

      // Reset the form
      resetForm();
    }
  };

  // Validate the form
  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};

    // SKU validation
    if (!/^[A-Za-z0-9]{3,10}$/.test(newItem.sku)) {
      formErrors.sku = 'SKU must be alphanumeric and 3-10 characters long.';
    }

    // Size validation
    if (newItem.size <= 0) {
      formErrors.size = 'Size must be a positive number.';
    }

    // Par Level validation
    if (newItem.par_level < 0) {
      formErrors.par_level = 'Par Level cannot be negative.';
    }

    // Quantity in Stock validation
    if (newItem.qty_in_stock < 0) {
      formErrors.qty_in_stock = 'Quantity in Stock cannot be negative.';
    }

    // Threshold validation
    if (newItem.threshold < 0) {
      formErrors.threshold = 'Threshold cannot be negative.';
    }

    setFormErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Calculate the re_order status
  const calculateReOrderStatus = (item: Item) => {
    return item.qty_in_stock <= item.threshold;
  };

  // Update low stock items
  const updateLowStockItems = (items: Item[]) => {
    const lowStock = items.filter((item) => item.re_order);
    setLowStockItems(lowStock);
  };

  // Add item to the list
  const addItem = (item: Item) => {
    const updatedItems = [...items, item];
    setItems(updatedItems);
    localStorage.setItem('inventoryData', JSON.stringify(updatedItems));
  };

  // Remove item from the list
  const removeItem = (item_id: number) => {
    const updatedItems = items.filter((item) => item.item_id !== item_id);
    setItems(updatedItems);
    localStorage.setItem('inventoryData', JSON.stringify(updatedItems));
  };

  // Function to edit an item
  const editItem = (item_id: number) => {
    setIsEditMode(true);
    const itemToEdit = items.find((item) => item.item_id === item_id);
    if (itemToEdit) {
      setNewItem(itemToEdit);
    } else {
      console.error('Item not found');
    }
  };

  // Function to update an item
  const updateItem = (updatedItem: Item) => {
    const updatedItems = items.map((item) =>
      item.item_id === updatedItem.item_id ? updatedItem : item
    );
    setItems(updatedItems);
    localStorage.setItem('inventoryData', JSON.stringify(updatedItems));
  };

  // Function to reset the form
  const resetForm = () => {
    setIsEditMode(false);
    setNewItem(defaultItem);
    setFormErrors({});
  };

  // Function to toggle the tooltip
  const handleTooltip = (text: string | null) => {
    setTooltip(text);
  };

  // Form for adding new items
  function newItemsForm() {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4 text-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-lg">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4">
                <h2 className="text-2xl font-bold mb-4">
                  {isEditMode ? 'Edit Item' : 'Add New Item'}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {/* SKU */}
                  <div>
                    <label
                      htmlFor="sku"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      SKU:
                    </label>
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      value={newItem.sku}
                      onChange={handleChange}
                      required
                      className="border rounded w-full py-2 px-3"
                    />
                    {formErrors.sku && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.sku}
                      </p>
                    )}
                  </div>
                  {/* Product Name */}
                  <div>
                    <label
                      htmlFor="prod_name"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Product Name:
                    </label>
                    <input
                      type="text"
                      id="prod_name"
                      name="prod_name"
                      value={newItem.prod_name}
                      onChange={handleChange}
                      required
                      className="border rounded w-full py-2 px-3"
                    />
                  </div>
                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Category:
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={newItem.category}
                      onChange={handleChange}
                      required
                      className="border rounded w-full py-2 px-3"
                    >
                      <option value="">Select a category</option>
                      {validCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Unit */}
                  <div>
                    <label
                      htmlFor="unit"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Unit:
                    </label>
                    <select
                      id="unit"
                      name="unit"
                      value={newItem.unit}
                      onChange={handleChange}
                      required
                      className="border rounded w-full py-2 px-3"
                    >
                      <option value="">Select a unit</option>
                      {validUnits.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Size */}
                  <div>
                    <label
                      htmlFor="size"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Size:
                    </label>
                    <input
                      type="number"
                      id="size"
                      name="size"
                      value={newItem.size}
                      onChange={handleChange}
                      required
                      className="border rounded w-full py-2 px-3"
                    />
                    {formErrors.size && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.size}
                      </p>
                    )}
                  </div>
                  {/* Par Level */}
                  <div>
                    <label
                      htmlFor="par_level"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Par Level:
                    </label>
                    <input
                      type="number"
                      id="par_level"
                      name="par_level"
                      value={newItem.par_level}
                      onChange={handleChange}
                      required
                      className="border rounded w-full py-2 px-3"
                    />
                    {formErrors.par_level && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.par_level}
                      </p>
                    )}
                  </div>
                  {/* Quantity in Stock */}
                  <div>
                    <label
                      htmlFor="qty_in_stock"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Quantity in Stock:
                    </label>
                    <input
                      type="number"
                      id="qty_in_stock"
                      name="qty_in_stock"
                      value={newItem.qty_in_stock}
                      onChange={handleChange}
                      required
                      className="border rounded w-full py-2 px-3"
                    />
                    {formErrors.qty_in_stock && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.qty_in_stock}
                      </p>
                    )}
                  </div>
                  {/* Threshold */}
                  <div>
                    <label
                      htmlFor="threshold"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Threshold:
                    </label>
                    <input
                      type="number"
                      id="threshold"
                      name="threshold"
                      value={newItem.threshold}
                      onChange={handleChange}
                      required
                      className="border rounded w-full py-2 px-3"
                    />
                    {formErrors.threshold && (
                      <p className="text-red-500 text-xs italic">
                        {formErrors.threshold}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
                <button
                  type="submit"
                  className={`${
                    isEditMode
                      ? 'bg-yellow-500 hover:bg-yellow-700'
                      : 'bg-green-500 hover:bg-green-700'
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  {isEditMode ? 'Update Item' : 'Add Item'}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // State for form visibility
  const [showForm, setShowForm] = useState(false);

  // Render the components
  return (
    <main className="flex flex-col items-center p-8">
      <div className="w-full max-w-[60%] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-900 text-center">
          Inventory Management
        </h1>

        {/* Stock Level Reporting */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Stock Level Reporting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-xl font-bold">Total Items</h3>
              <p className="text-2xl">{items.length}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-xl font-bold">Items Low in Stock</h3>
              <p className="text-2xl">{lowStockItems.length}</p>
            </div>
          </div>
        </section>

        {/* Low Stock Alerts */}
        {lowStockItems.length > 0 && (
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-red-600">
              Low Stock Alerts
            </h2>
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-xl font-bold bg-red-600 text-white border-b">
                      SKU
                    </th>
                    <th className="px-4 py-2 text-xl font-bold bg-red-600 text-white border-b">
                      Product Name
                    </th>
                    <th className="px-4 py-2 text-xl font-bold bg-red-600 text-white border-b">
                      Quantity in Stock
                    </th>
                    <th className="px-4 py-2 text-xl font-bold bg-red-600 text-white border-b">
                      Threshold
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map((item, index) => (
                    <tr
                      key={item.item_id}
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                    >
                      <td className="border px-4 py-2">{item.sku}</td>
                      <td className="border px-4 py-2">{item.prod_name}</td>
                      <td className="border px-4 py-2">{item.qty_in_stock}</td>
                      <td className="border px-4 py-2">{item.threshold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Add Item Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditMode ? 'Edit Item' : 'Add Item'}
          </button>
        </div>

        {showForm && newItemsForm()}

        {/* Inventory Table */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Inventory Tracking</h2>
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Item ID
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    SKU
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Product Name
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Category
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Unit
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Size
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Par Level
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Qty in Stock
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Threshold
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Re-order
                  </th>
                  <th className="px-4 py-2 text-xl font-bold bg-blue-900 text-white border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: Item, index: number) => (
                  <tr
                    key={item.item_id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="border px-4 py-2">{item.item_id}</td>
                    <td className="border px-4 py-2">{item.sku}</td>
                    <td className="border px-4 py-2">{item.prod_name}</td>
                    <td className="border px-4 py-2">{item.category}</td>
                    <td className="border px-4 py-2">{item.unit}</td>
                    <td className="border px-4 py-2">{item.size}</td>
                    <td className="border px-4 py-2">{item.par_level}</td>
                    <td className="border px-4 py-2">{item.qty_in_stock}</td>
                    <td className="border px-4 py-2">{item.threshold}</td>
                    <td
                      className={`border px-4 py-2 ${
                        item.re_order ? 'text-red-500 font-bold' : ''
                      }`}
                    >
                      {item.re_order ? 'Yes' : 'No'}
                    </td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => {
                          editItem(item.item_id);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => removeItem(item.item_id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan={11}
                      className="border px-4 py-2 text-center text-gray-500"
                    >
                      No items available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
