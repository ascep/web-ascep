import { NextResponse } from "next/server";

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

    // En producción, enviar email via Resend / SendGrid / Nodemailer
    // Ejemplo con Resend:
    // await resend.emails.send({
    //   from: "ASCEP Web <noreply@ascep.org>",
    //   to: "contacto@ascep.org",
    //   subject: `Contacto: ${subject || "Sin asunto"}`,
    //   text: `De: ${name} (${email})\n\n${message}`,
    // });

    console.log("Contact form submission:", { name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar el formulario" },
      { status: 500 }
    );
  }
}
