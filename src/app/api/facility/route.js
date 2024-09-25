import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const roomDataPath = path.join(process.cwd(), 'roomData.txt');

export async function GET() {
  try {
    const data = fs.readFileSync(roomDataPath, 'utf8');
    const roomList = JSON.parse(data);
    return NextResponse.json(roomList);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newRoom = await request.json();
    const data = fs.readFileSync(roomDataPath, 'utf8');
    const roomList = data ? JSON.parse(data) : [];
    roomList.push(newRoom);
    fs.writeFileSync(roomDataPath, JSON.stringify(roomList));
    return NextResponse.json(newRoom, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const data = fs.readFileSync(roomDataPath, 'utf8');
    let roomList = JSON.parse(data);
    roomList = roomList.filter(room => room.id !== id);
    fs.writeFileSync(roomDataPath, JSON.stringify(roomList));
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
