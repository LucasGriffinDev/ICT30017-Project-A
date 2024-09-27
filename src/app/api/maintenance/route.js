import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const maintenanceDataPath = path.join(process.cwd(), 'maintenanceData.txt');

export async function GET() {
  try {
    const data = fs.readFileSync(maintenanceDataPath, 'utf8');
    const maintenanceList = JSON.parse(data);
    return NextResponse.json(maintenanceList);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newRoom = await request.json();
    const data = fs.readFileSync(maintenanceDataPath, 'utf8');
    const maintenanceList = data ? JSON.parse(data) : [];
    maintenanceList.push(newRoom);
    fs.writeFileSync(maintenanceDataPath, JSON.stringify(maintenanceList));
    return NextResponse.json(newRoom, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { Room } = await request.json();
    const data = fs.readFileSync(maintenanceDataPath, 'utf8');
    let maintenanceList = JSON.parse(data);
    maintenanceList = maintenanceList.filter(maintenance => maintenance.Room !== Room);
    fs.writeFileSync(maintenanceDataPath, JSON.stringify(maintenanceList));
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
