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

/**
 * Mercado Pago exige que back_urls y notification_url sean URLs publicas.
 * En desarrollo (localhost) las rechaza con "auto_return invalid", asi que
 * esas opciones se omiten para poder probar el flujo en local.
 */
function isLocalUrl(url: string) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)(:|\/|$)/i.test(url);
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

    // El minimo depende de la moneda: en USD los montos son numeros pequenos,
    // asi que compararlos contra 2000 rechazaba cualquier donacion en dolares.
    const minAmount = currency === "USD" ? 1 : 2000;
    if (!amount || amount < minAmount) {
      return NextResponse.json(
        { error: currency === "USD" ? "Monto minimo: $1 USD" : "Monto minimo: $2.000 COP" },
        { status: 400 }
      );
    }

    const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
    const preference = new Preference(client);

    // Mercado Pago Colombia cobra siempre en COP: si el donante eligio USD hay
    // que convertir. La tasa vive en USD_TO_COP_RATE para poder ajustarla sin
    // tocar codigo (antes estaba quemada en 4500).
    const usdToCop = Number(process.env.USD_TO_COP_RATE) || 4500;

    const items = [
      {
        id: "donacion-ascep",
        title: "Donacion a ASCEP",
        description: message || "Donacion voluntaria",
        quantity: 1,
        unit_price:
          currency === "COP"
            ? Number(amount)
            : Math.round(Number(amount) * usdToCop),
        currency_id: "COP",
      },
    ];

    const payer = {
      name: name || "Donante",
      email: email || undefined,
    };

    const local = isLocalUrl(baseUrl);

    const result = await preference.create({
      body: {
        items,
        payer,
        binary_mode: true,
        // Se recupera en el webhook para saber quien dono y que escribio.
        metadata: {
          donor_name: name || "Anonimo",
          donor_message: message || "",
        },
        // En local Mercado Pago rechaza estas URLs por no ser publicas.
        ...(local
          ? {}
          : {
              back_urls: {
                success: `${baseUrl}/${locale || "es"}/donar?success=true`,
                failure: `${baseUrl}/${locale || "es"}/donar?success=false`,
              },
              auto_return: "approved",
              // Mercado Pago avisa aqui cuando el pago cambia de estado.
              notification_url: `${baseUrl}/api/checkout/mercadopago/webhook`,
            }),
      },
    });

    // Con credenciales de produccion (APP_USR-) hay que usar init_point.
    // Mercado Pago devuelve SIEMPRE sandbox_init_point, asi que priorizarlo
    // enviaba a los donantes al checkout de prueba y la donacion no llegaba.
    const isSandbox = MP_ACCESS_TOKEN.startsWith("TEST-");
    const checkoutUrl = isSandbox
      ? result.sandbox_init_point || result.init_point
      : result.init_point || result.sandbox_init_point;

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("MP checkout error:", error);

    // Extract specific error message from Mercado Pago API
    const err = error as {
      message?: string;
      response?: { data?: { message?: string } };
    };

    let errorMessage = "Error al crear el pago";
    if (err?.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err?.message) {
      errorMessage = err.message;
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: err?.response?.data || err?.message
      },
      { status: 500 }
    );
  }
}
