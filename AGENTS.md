# ASCEP Web - Project Rules

## General Rules
- No emojis anywhere in the codebase or UI
- Borders must be complete (all 4 sides) when used; never partial borders
- No numbered markers (01, 02, 03) unless the content is a sequential process where order matters
- Use SVG icons (Lucide or Heroicons), never emojis as icons
- Respect prefers-reduced-motion; animations must work without motion
- Responsive down to mobile (375px), no horizontal scroll
- Keyboard focus visible on all interactive elements
- Minimum touch target 44x44px
- No gradients on text or UI elements (buttons, borders, cards, etc.); gradients only allowed on section backgrounds

## Brand Colors (ASCEP)
- Primary Blue: #019E9F
- Primary Blue Dark: #005C5D
- Secondary Teal: #44BCC5
- Accent Orange: #EC6620
- Accent Yellow: #F2CA11

## Typography
- Body: 16px base, line-height 1.5-1.75
- Type scale: 12, 14, 16, 18, 24, 32, 40, 48
- Use font-display: swap to prevent invisible text

## Layout
- Mobile-first breakpoints
- Consistent max-width container (max-w-7xl)
- 4/8dp spacing system (Tailwind spacing scale)
- z-index scale: 0, 10, 20, 40, 100, 1000

## Code Standards
- TypeScript strict mode
- Tailwind CSS v4 for styling
- next-intl for i18n (ES/EN/DE)
- No hardcoded hex colors in components; use CSS variables
- **Light mode as default** — dark mode only when toggled via ThemeToggle

## Homepage Sections (current state)

| Section | Component | Notes |
|---------|-----------|-------|
| Hero | `HomeHero.tsx` | Purple bg + decorative circles + video at opacity-20; 2-column: left text + right image; no dark overlay |
| "Transformando" intro | inline | AnimatedSection, centered, bg-surface |
| Quienes Somos | inline | Image + text 2-col, purple CTA |
| Impacto | `ImpactGrid.tsx` | 3D cards (rotateX:4 rotateY:-4 y:-8 on hover), brand-colored left bar, Lucide icons per stat (Users, Calendar, GraduationCap, Layers, Target), leaflet Colombia map with Cali marker |
| Trayectoria | `Timeline.tsx` | Scroll-driven timeline, alternating years, purple progress line |
| Retos | inline | Image + text 2-col |
| Modelo | `ModeloGrid.tsx` | 6 dimension cards with individual brand color accents, Lucide icons with colored bg, hover lift -6px, 3x2 grid |
| Programas | `ProgramStack.tsx` | Scroll-driven stack: cards start stacked at y=380 with 12px offset, lift to y=0 as scroll progresses. Left gradient accent bar (4px), number badge with glow shadow, gradient button with ArrowRight icon, shadow-sm base |
| Galeria | inline | Creative 3-col grid: first image spans 2 cols + 2 rows (hero), 3 smaller images below-right, hover overlay + scale |
| Aliados | `LogoLoop.tsx` | Infinite horizontal ticker (30s linear loop), opacity 50% hover to 100% |
| Donacion CTA | inline | Gradient bg with radial overlays, brand-yellow label, two buttons (Donar + Participa) with border effects |

## Component Details

### ProgramStack.tsx
- Uses `useScroll` + `useTransform` for scroll-driven card reveal
- 4 cards stacked at bottom (y=380, offset -12px per card, scale 0.88, opacity 0.3)
- Each card lifts to (y=0, scale 1.0, opacity 1.0) over its scroll range (i/4 to (i+1)/4)
- Container height: totalSteps * 130vh to allow scrolling room
- Sticky at top-24 keeps cards visible during scroll
- Visual: 4px left gradient bar, number badge with glow, logo, title+desc, gradient CTA with arrow
- `will-change-transform` for GPU acceleration

### ImpactGrid.tsx
- `Card3D` sub-component with perspective-[1200px]
- Hover: rotateX:4, rotateY:-4, y:-8, scale:1.02
- Each card has: colored left bar (4px), Lucide icon with colored bg tint, CountUp number
- Brand colors per stat: Purple, Teal, Orange, Yellow
- Map card spans 2 cols x 2 rows

### ModeloGrid.tsx
- 6 dimensions with individual brand colors
- Icon bg: `${color}14` (hex alpha), icon: color
- Hover: y:-6, icon scale:1.1
- 3x2 grid on desktop, 2-col tablet

### LogoLoop.tsx
- Duplicates logos array for seamless loop
- motion.div animate x: ["0%", "-50%"] at 30s linear infinite
- Opacity 50% → 100% on hover

## Components Across Pages (added)

### PageHero.tsx
- Reusable hero for inner pages: brand-colored bg + image at `opacity-15` + decorative circles + no dark overlay
- Props: `bgImage`, `tag`, `title`, `subtitle`, optional `bgColor`

### WhatsAppButton.tsx
- Fixed bottom-right floating button (z-1000)
- Links to `https://wa.me/573025550107`
- Always visible, no toggle

### DonationForm.tsx
- Client component: currency toggle COP/USD, preset amounts + custom input, donor info (name, email, message)
- Submits to `/api/checkout/mercadopago` or `/api/checkout/stripe`
- COP amounts: $20K-$200K, USD amounts: $10-$100, one-time only
- Fallback link to Donatario (PSE, Nequi, cash)

### Donation API Routes
- `POST /api/checkout/mercadopago` — creates Mercado Pago Preference; returns redirect URL
- `POST /api/checkout/stripe` — creates Stripe Checkout Session; returns redirect URL
- Requires `MERCADO_PAGO_ACCESS_TOKEN` and `STRIPE_SECRET_KEY` in `.env.local`
- Returns helpful error if keys are missing
- leaflet MapContainer centered at [4.5, -74], zoom 6
- Custom DivIcon marker on Cali [3.4516, -76.532]
- No scroll/drag, no zoom control
- Dynamic import with ssr:false, spinner loading state

## Build
- Passes with zero errors and zero warnings at 28 routes
- Next.js 16.2.9 Turbopack, motion v12.42.0, leaflet/react-leaflet