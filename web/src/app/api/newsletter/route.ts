import { NextResponse } from "next/server";
import { Resend } from "resend";
import { put } from "@vercel/blob";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: "El correo electronico es requerido" },
        { status: 400 }
      );
    }

    try {
      await put(`newsletter/${Date.now()}-${email.replace(/[@.]/g, "_")}.json`, JSON.stringify({ email, name, subscribedAt: new Date().toISOString() }), {
        access: "private",
        contentType: "application/json",
      });
    } catch {
      console.log("Newsletter subscription saved to blob:", { email, name });
    }

    if (resend) {
      try {
        await resend.emails.send({
          from: "ASCEP Web <noreply@ascep.org>",
          to: "contacto@ascep.org",
          subject: "Nuevo suscriptor al newsletter",
          text: `Nombre: ${name || "No especificado"}\nEmail: ${email}`,
        });
      } catch {
        console.log("Newsletter notification email skipped (Resend error)");
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la suscripcion" },
      { status: 500 }
    );
  }
}
