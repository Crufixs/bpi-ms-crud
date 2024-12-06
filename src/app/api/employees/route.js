import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "@/lib/prisma"; // adjust path as needed

const STORAGE_PATH = process.env.STORAGE_PATH || "./storage";

export async function GET() {
  try {
    // Fetch all employees
    const employees = await prisma.employee.findMany();

    // Map over employees to construct full photo URLs
    const employeesWithFullPhotoUrl = employees.map((employee) => {
      // If the photo exists, prepend the storage path and return the full URL
      if (employee.photo) {
        employee.photo = `${
          process.env.BASE_URL || "http://localhost:3000"
        }/${STORAGE_PATH}/${employee.photo}`;
      }
      return employee;
    });

    return NextResponse.json(employeesWithFullPhotoUrl, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const photoFile = formData.get("photo");
    const firstName = formData.get("firstName")?.trim() || "";
    const lastName = formData.get("lastName")?.trim() || "";
    const username = formData.get("username")?.trim() || "";
    const country = formData.get("country")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    const accountType = formData.get("accountType")?.trim() || "";
    const contactNumber = formData.get("contactNumber")?.trim() || "";

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !username ||
      !country ||
      !email ||
      !accountType
    ) {
      return NextResponse.json(
        { error: "There are missing fields." },
        { status: 400 }
      );
    }

    let photo;
    // Save the photo locally
    if (photoFile && photoFile.name) {
      const filename = Date.now() + "-" + photoFile.name;
      const filepath = path.join("public", STORAGE_PATH, filename);
      const fileData = Buffer.from(await photoFile.arrayBuffer());
      await fs.writeFile(filepath, fileData);
      photo = filename;
    }

    // Insert into database
    const employee = await prisma.employee.create({
      data: {
        ...(photo && { photo: photo }),
        firstName,
        lastName,
        username,
        country,
        email,
        accountType,
        contactNumber,
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create employee." },
      { status: 500 }
    );
  }
}
