import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const reserveDataPath = path.join(process.cwd(), 'reserveData.txt');

export async function GET() {
  try {
    const data = fs.readFileSync(reserveDataPath, 'utf8');
    const reserveList = JSON.parse(data);
    return NextResponse.json(reserveList);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newReserve = await request.json();
    const data = fs.readFileSync(reserveDataPath, 'utf8');
    const reserveList = data ? JSON.parse(data) : [];
    reserveList.push(newReserve);
    fs.writeFileSync(reserveDataPath, JSON.stringify(reserveList));
    return NextResponse.json(newReserve, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { facility } = await request.json();
    const data = fs.readFileSync(roomDataPath, 'utf8');
    let reserveList = JSON.parse(data);
    reserveList = reserveList.filter(reserve => reserve.facility !== id);
    fs.writeFileSync(reserveDataPath, JSON.stringify(reserveList));
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
