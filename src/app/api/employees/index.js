import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from '@/lib/prisma'; // adjust path as needed

const STORAGE_PATH = process.env.STORAGE_PATH || './storage';

export async function GET() {
  // Fetch all employees
  const employees = await prisma.employee.findMany();
  return NextResponse.json(employees, { status: 200 });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const photoFile = formData.get('photo');
    const name = formData.get('name')?.trim() || '';
    const username = formData.get('username')?.trim() || '';
    const country = formData.get('country')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const accountType = formData.get('accountType')?.trim() || '';

    // Basic validation
    if (!photoFile || !photoFile.name || !name || !username || !country || !email || !accountType) {
      return NextResponse.json({ error: 'All fields including photo are required.' }, { status: 400 });
    }

    // Save the photo locally
    const filename = Date.now() + '-' + photoFile.name;
    const filepath = path.join(STORAGE_PATH, filename);
    const fileData = Buffer.from(await photoFile.arrayBuffer());
    await fs.writeFile(filepath, fileData);

    // Insert into database
    const employee = await prisma.employee.create({
      data: {
        photo: path.join('storage', filename),
        name,
        username,
        country,
        email,
        accountType
      }
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to create employee.' }, { status: 500 });
  }
}
