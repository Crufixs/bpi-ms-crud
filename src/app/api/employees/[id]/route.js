import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "@/lib/prisma";

const STORAGE_PATH = process.env.STORAGE_PATH || "./storage";

export async function PUT(request, { params }) {
  const { id } = await params;
  const existing = await prisma.employee.findUnique({
    where: { id: String(id) },
  });
  if (!existing) {
    return NextResponse.json({ error: "Employee not found." }, { status: 404 });
  }

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

    let photo = existing.photo;

    // Save the photo locally
    if (photoFile && photoFile.name) {
      const filename = Date.now() + "-" + photoFile.name;
      const filepath = path.join("public", STORAGE_PATH, filename);
      const fileData = Buffer.from(await photoFile.arrayBuffer());
      await fs.writeFile(filepath, fileData);
      photo = filename;

      // Delete old photo
      if (existing.photo) {
        const oldPhotoPath = path.join(process.cwd(), existing.photo);
        await fs.unlink(oldPhotoPath).catch(() => {});
      }
    }

    const updated = await prisma.employee.update({
      where: { id: String(id) },
      data: {
        photo,
        firstName,
        lastName,
        username,
        country,
        email,
        accountType,
        contactNumber,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to update employee." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const existing = await prisma.employee.findUnique({
    where: { id: String(id) },
  });
  if (!existing) {
    return NextResponse.json({ error: "Employee not found." }, { status: 404 });
  }

  try {
    // Delete employee from DB
    await prisma.employee.delete({ where: { id: String(id) } });

    // Optionally remove the stored photo file
    // const photoPath = path.join(process.cwd(), existing.photo);
    // await fs.unlink(photoPath).catch(() => {});

    return NextResponse.json({ message: "Employee deleted." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to delete employee." },
      { status: 500 }
    );
  }
}
