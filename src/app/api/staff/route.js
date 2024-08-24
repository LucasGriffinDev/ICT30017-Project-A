import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const staffDataPath = path.join(process.cwd(), 'staffData.txt');

export async function GET() {
  try {
    const data = await fs.readFile(staffDataPath, 'utf8');
    const staffList = JSON.parse(data);
    return NextResponse.json(staffList);
  } catch (err) {
    console.error("Error reading data:", err);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newStaff = await request.json();
    const data = await fs.readFile(staffDataPath, 'utf8');
    const staffList = data ? JSON.parse(data) : [];
    staffList.push(newStaff);
    await fs.writeFile(staffDataPath, JSON.stringify(staffList));
    return NextResponse.json(newStaff, { status: 201 });
  } catch (err) {
    console.error("Error saving data:", err);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedStaff = await request.json();
    const data = await fs.readFile(staffDataPath, 'utf8');
    let staffList = JSON.parse(data);
    const index = staffList.findIndex(staff => staff.id === updatedStaff.id);
    
    if (index !== -1) {
      staffList[index] = updatedStaff;
      await fs.writeFile(staffDataPath, JSON.stringify(staffList));
      return NextResponse.json({ message: 'Updated successfully' });
    } else {
      return NextResponse.json({ error: 'Staff not found' }, { status: 404 });
    }
  } catch (err) {
    console.error("Error updating data:", err);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const data = await fs.readFile(staffDataPath, 'utf8');
    let staffList = JSON.parse(data);
    staffList = staffList.filter(staff => staff.id !== id);
    await fs.writeFile(staffDataPath, JSON.stringify(staffList));
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error("Error deleting data:", err);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
