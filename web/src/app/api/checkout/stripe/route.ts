import { NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

function getBaseUrl(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const host = req.headers.get("host");
  if (host) return `https://${host}`;
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

export async function POST(req: Request) {
  try {
    if (!STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe no configurado. Agrega STRIPE_SECRET_KEY en .env.local" },
        { status: 500 }
      );
    }

    const { amount, currency, name, email, message, locale } = await req.json();
    const baseUrl = getBaseUrl(req);

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Monto minimo: $1 USD" }, { status: 400 });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const amountInCents = currency === "COP" ? Number(amount) : Math.round(Number(amount) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency === "COP" ? "cop" : "usd",
            product_data: {
              name: "Donacion a ASCEP",
              description: message || "Donacion voluntaria",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email || undefined,
      metadata: {
        donor_name: name || "Donante",
        message: message || "",
      },
      success_url: `${baseUrl}/${locale || "es"}/donar?success=true`,
      cancel_url: `${baseUrl}/${locale || "es"}/donar?success=false`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Error al crear el pago" }, { status: 500 });
  }
}
