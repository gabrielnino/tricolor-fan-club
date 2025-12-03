// app/api/checkout-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      addressLine1,
      city,
      deliveryNotes,
    } = body;

    if (!fullName || !email || !phone || !addressLine1 || !city) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const stmt = db.prepare(`
      INSERT INTO orders
        (full_name, email, phone, address_line1, city, delivery_notes)
      VALUES
        (@fullName, @email, @phone, @addressLine1, @city, @deliveryNotes)
    `);

    const info = stmt.run({
      fullName,
      email,
      phone,
      addressLine1,
      city,
      deliveryNotes: deliveryNotes ?? null,
    });

    return NextResponse.json(
      { success: true, id: info.lastInsertRowid },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error saving order:", err);
    return NextResponse.json(
      { error: "Error al guardar el pedido" },
      { status: 500 }
    );
  }
}
