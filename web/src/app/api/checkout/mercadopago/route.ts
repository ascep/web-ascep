import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

function getBaseUrl(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const host = req.headers.get("host");
  if (host) return `https://${host}`;
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

export async function POST(req: Request) {
  try {
    if (!MP_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Mercado Pago no configurado. Agrega MERCADO_PAGO_ACCESS_TOKEN en .env.local" },
        { status: 500 }
      );
    }

    const { amount, currency, name, email, message, locale } = await req.json();
    const baseUrl = getBaseUrl(req);

    if (!amount || amount < 2000) {
      return NextResponse.json({ error: "Monto minimo: $2.000 COP" }, { status: 400 });
    }

    const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
    const preference = new Preference(client);

    const items = [
      {
        id: "donacion-ascep",
        title: "Donacion a ASCEP",
        description: message || "Donacion voluntaria",
        quantity: 1,
        unit_price: currency === "COP" ? Number(amount) : Number(amount) * 4500,
        currency_id: "COP",
      },
    ];

    const payer = {
      name: name || "Donante",
      email: email || undefined,
    };

    const result = await preference.create({
      body: {
        items,
        payer,
        back_urls: {
          success: `${baseUrl}/${locale || "es"}/donar?success=true`,
          failure: `${baseUrl}/${locale || "es"}/donar?success=false`,
        },
        auto_return: "approved",
        binary_mode: true,
      },
    });

    return NextResponse.json({ url: result.sandbox_init_point || result.init_point });
  } catch (error: any) {
    console.error("MP checkout error:", error);
    
    // Extract specific error message from Mercado Pago API
    let errorMessage = "Error al crear el pago";
    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error?.response?.data || error?.message
      }, 
      { status: 500 }
    );
  }
}
