# ASCEP Web

Sitio web institucional de **ASCEP** — Asociación Creando Sueños y Esperanzas.  
Next.js 16 + Sanity CMS + TypeScript.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript strict |
| Estilos | Tailwind CSS v4 |
| Animaciones | motion v12 |
| CMS | Sanity (studio embebido en `/studio`) |
| Internacionalización | next-intl (ES, PT) |
| Pagos | Mercado Pago + Stripe |
| Base de datos | Sanity (headless CMS) |
| Analytics | Plausible |
| Despliegue | Vercel |

## Requisitos

- Node.js 20+
- npm

## Instalacion

```bash
git clone <repo-url>
cd web
npm install
```

## Variables de entorno

Copiar `.env.local.example` a `.env.local` y llenar los valores:

| Variable | Descripcion |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID del proyecto en Sanity (`7vvy9nrc`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset de Sanity (`production`) |
| `SANITY_API_TOKEN` | Token de API de Sanity (lectura + escritura) |
| `STUDIO_SECRET` | Password para proteger `/studio` en produccion |
| `MERCADO_PAGO_ACCESS_TOKEN` | Access Token de Mercado Pago (prod o sandbox) |
| `STRIPE_SECRET_KEY` | Secret Key de Stripe |
| `NEXT_PUBLIC_BASE_URL` | URL base para redirecciones de pago |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Dominio para Plausible Analytics |

## Scripts

```bash
npm run dev          # desarrollo con Turbopack (http://localhost:3000)
npm run build        # build produccion
npm run start        # servidor produccion
npm run lint         # ESLint
npm run test         # Vitest
```

## Internacionalización

Idiomas disponibles: `es` (español) y `pt` (portugués).

Los mensajes estan en `messages/{es,pt}.json`.

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/es/acerca` / `/pt/acerca` | Quienes somos |
| `/es/programas` / `/pt/programas` | Programas |
| `/es/participa` / `/pt/participa` | Participa |
| `/es/voluntariado` / `/pt/voluntariado` | Voluntariado |
| `/es/contacto` / `/pt/contacto` | Contacto |
| `/es/donar` / `/pt/donar` | Donaciones |
| `/es/blog` / `/pt/blog` | Blog |
| `/es/plan-padrino` / `/pt/plan-padrino` | Plan Padrino |
| `/es/como-ayudar` / `/pt/como-ayudar` | Como ayudar |
| `/es/modalidades` / `/pt/modalidades` | Modalidades |
| `/studio` | Sanity Studio (protegido con password) |

## Estructura del proyecto

```
src/
├── app/           # App Router pages
├── components/    # Componentes reutilizables
├── lib/           # Utilidades, helpers
├── messages/      # Traducciones i18n (es, pt)
├── sanity/        # Esquemas de Sanity CMS
└── styles/        # Estilos globales
```

## Git

Ver `GIT.md` para una guia de comandos basicos.

Flujo diario:
```bash
git pull
# ... trabajar ...
git add -A
git commit -m "Descripcion del cambio"
git push
```

## Build

```bash
npm run build
```

Debe pasar con **cero errores y cero warnings**.

## Despliegue

El proyecto esta configurado para Vercel. `vercel.json` incluye las reglas de rutas necesarias para Sanity Studio y los rewrites de internacionalización.

## Licencia

Uso interno de ASCEP.
