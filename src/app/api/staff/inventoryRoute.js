import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const inventoryDataPath = path.join(process.cwd(), './inventoryData.json');

export async function GET() {
  try {
    const data = fs.readFileSync(inventoryDataPath, 'utf8');
    const itemsList = JSON.parse(data);
    return NextResponse.json(itemsList);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newItem = await request.json();
    const data = fs.readFileSync(inventoryDataPath, 'utf8');
    const itemsList = data ? JSON.parse(data) : [];
    itemsList.push(newItem);
    fs.writeFileSync(inventoryDataPath, JSON.stringify(staffList));
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const data = fs.readFileSync(inventoryDataPath, 'utf8');
    let itemsList = JSON.parse(data);
    itemsList = itemsList.filter(staff => staff.id !== id);
    fs.writeFileSync(inventoryDataPath, JSON.stringify(itemsList));
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}