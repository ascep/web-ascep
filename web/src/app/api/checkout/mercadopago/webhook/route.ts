import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { Resend } from "resend";

const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_TO = process.env.DONATION_NOTIFY_EMAIL || "contacto@ascep.org";

function formatCop(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Recibe las notificaciones de Mercado Pago cuando cambia el estado de un pago.
 * Solo avisa por correo cuando la donacion queda aprobada.
 *
 * Siempre responde 200: si devolvemos error, Mercado Pago reintenta la misma
 * notificacion en bucle. Los fallos quedan en el log del servidor.
 */
export async function POST(req: Request) {
  try {
    if (!MP_ACCESS_TOKEN) return NextResponse.json({ received: true });

    const url = new URL(req.url);
    let paymentId = url.searchParams.get("data.id") || url.searchParams.get("id");
    let topic = url.searchParams.get("type") || url.searchParams.get("topic");

    // Mercado Pago manda el evento por query string o en el cuerpo segun el caso.
    if (!paymentId) {
      const body = await req.json().catch(() => null);
      if (body?.data?.id) paymentId = String(body.data.id);
      if (!topic && body?.type) topic = String(body.type);
    }

    // Otros eventos (merchant_order, plan, etc.) se aceptan sin procesar.
    if (topic !== "payment" || !paymentId) {
      return NextResponse.json({ received: true });
    }

    const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
    const payment = await new Payment(client).get({ id: paymentId });

    if (payment.status !== "approved") {
      return NextResponse.json({ received: true });
    }

    const metadata = (payment.metadata || {}) as {
      donor_name?: string;
      donor_message?: string;
    };
    const amount = payment.transaction_amount ?? 0;
    const donorName = metadata.donor_name || "Anonimo";
    const donorEmail = payment.payer?.email || "sin correo";
    const donorMessage = metadata.donor_message || "";

    const resumen = [
      `Monto: ${formatCop(amount)}`,
      `Donante: ${donorName}`,
      `Correo: ${donorEmail}`,
      `Pago Mercado Pago: ${payment.id}`,
      donorMessage ? `\nMensaje:\n${donorMessage}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (resend) {
      await resend.emails.send({
        from: "ASCEP Web <noreply@ascep.org>",
        to: NOTIFY_TO,
        subject: `Nueva donacion aprobada: ${formatCop(amount)}`,
        text: resumen,
      });
    } else {
      console.log("Donacion aprobada (sin RESEND_API_KEY):\n" + resumen);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("MP webhook error:", error);
    return NextResponse.json({ received: true });
  }
}
