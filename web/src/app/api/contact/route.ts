import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    if (resend) {
      await resend.emails.send({
        from: "ASCEP Web <noreply@ascep.org>",
        to: "contacto@ascep.org",
        replyTo: email,
        subject: `Contacto ASCEP: ${subject || "Sin asunto"}`,
        text: `De: ${name} (${email})\n\n${message}`,
      });
    } else {
      console.log("Contact form submission (no RESEND_API_KEY set):", {
        name,
        email,
        subject,
        message,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar el formulario" },
      { status: 500 }
    );
  }
}
