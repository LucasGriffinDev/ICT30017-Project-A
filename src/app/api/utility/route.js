import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const utilityDataPath = path.join(process.cwd(), 'utilityData.txt');

export async function GET() {
  try {
    const data = fs.readFileSync(utilityDataPath, 'utf8');
    const utilityList = JSON.parse(data);
    return NextResponse.json(utilityList);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newUtility = await request.json();
    const data = fs.readFileSync(utilityDataPath, 'utf8');
    const utilityList = data ? JSON.parse(data) : [];
    utilityList.push(newUtility);
    fs.writeFileSync(utilityDataPath, JSON.stringify(utilityList));
    return NextResponse.json(newUtility, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { Utility } = await request.json();
    const data = fs.readFileSync(utilityDataPath, 'utf8');
    let utilityList = JSON.parse(data);
    utilityList = utilityList.filter(utility => utility.Utility !== Utility);
    fs.writeFileSync(utilityDataPath, JSON.stringify(utilityList));
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
