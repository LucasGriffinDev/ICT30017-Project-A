import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const staffDataPath = path.join(process.cwd(), 'staffData.txt');

export async function GET() {
  try {
    const data = fs.readFileSync(staffDataPath, 'utf8');
    const staffList = JSON.parse(data);
    return NextResponse.json(staffList);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newStaff = await request.json();
    const data = fs.readFileSync(staffDataPath, 'utf8');
    const staffList = data ? JSON.parse(data) : [];
    staffList.push(newStaff);
    fs.writeFileSync(staffDataPath, JSON.stringify(staffList));
    return NextResponse.json(newStaff, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const data = fs.readFileSync(staffDataPath, 'utf8');
    let staffList = JSON.parse(data);
    staffList = staffList.filter(staff => staff.id !== id);
    fs.writeFileSync(staffDataPath, JSON.stringify(staffList));
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
