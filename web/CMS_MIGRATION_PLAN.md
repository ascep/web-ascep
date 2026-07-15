# CMS Migration Plan - ASCEP Web

## Overview

This document describes the full CMS migration from hardcoded content to Sanity for the ASCEP web project. The migration enables non-technical editors to manage all site content through the Sanity Studio.

---

## Schema Architecture

### Directory Structure

```
sanity/schemas/
  index.ts                          -- Schema registry
  noticia.ts                        -- News articles (existing, enhanced)
  programa.ts                       -- Programs (existing, enhanced)
  blockContent.ts                   -- Rich text blocks (existing)
  documents/
    siteSettings.ts                 -- Global site configuration (singleton)
    pageContent.ts                  -- Per-page SEO + hero (singleton-like)
    teamMember.ts                   -- Team member profiles
    milestone.ts                    -- Timeline entries
    documentEntry.ts                -- Transparency documents
    partner.ts                      -- Allies/partners
    videoEntry.ts                   -- Videos (YouTube + file)
    galleryAlbum.ts                 -- Photo albums
    impactStat.ts                   -- Impact statistics
    testimonial.ts                  -- Testimonials
    donationTier.ts                 -- Donation levels
    faqSection.ts                   -- FAQ sections
  objects/
    localizedString.ts              -- Short text with locale variants
    localizedText.ts                -- Long text with locale variants
    localizedBlockContent.ts        -- Rich text with locale variants
    imageWithAlt.ts                 -- Image with required alt text
    seo.ts                          -- SEO metadata (title + description + OG image)
    socialLink.ts                   -- Social media link (platform + URL)
    faqItem.ts                      -- FAQ entry (question + answer)
```

### Content Locales

Supported languages: **ES** (default), **EN**, **PT**

Localized fields use the `localizedString`, `localizedText`, and `localizedBlockContent` object types. The default language (ES) is required; other languages are optional.

**Important**: UI labels, navigation strings, and translation keys remain in `next-intl` JSON files (`messages/{es,en,pt}.json`). Only **content** moves to Sanity.

---

## Schema Details

### 1. `siteSettings` (Singleton)

**Purpose**: Global site configuration that was previously hardcoded across multiple files.

**Replaces hardcoded content in**:
- `src/app/layout.tsx` -- site title, description, OG image, organization JSON-LD
- `src/components/TopBar.tsx` -- social media URLs, email, phone
- `src/components/Header.tsx` -- logo image path
- `src/components/Footer.tsx` -- logo image path
- `src/components/WhatsAppButton.tsx` -- phone number
- `src/components/DonationForm.tsx` -- Donatario URL

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `siteTitle` | localizedString | Browser tab title |
| `siteDescription` | localizedText | Meta description |
| `logo` | imageWithAlt | Header logo (blue horizontal) |
| `logoWhite` | imageWithAlt | Footer logo (white horizontal) |
| `logoFavicon` | imageWithAlt | Favicon / apple-touch-icon |
| `ogImage` | imageWithAlt | Default OG image (1200x630) |
| `socialLinks` | socialLink[] | Facebook, Instagram, YouTube, etc. |
| `whatsappNumber` | string | Format: 573025550107 (no +) |
| `contactEmail` | string | contacto@ascep.org |
| `contactPhone` | string | 3234831547 |
| `address` | object | street, city, country |
| `organization` | object | name, alternateName, url, description (JSON-LD) |
| `donatarioUrl` | url | Donatario payment link |
| `themeColor` | string | Primary theme color hex |

---

### 2. `pageContent` (Multiple documents, one per page)

**Purpose**: Manages SEO metadata and hero section content for each page. Editors create one document per page route.

**Replaces hardcoded content in**:
- Every page's `export const metadata: Metadata = {...}` block
- Every page's `<PageHero tag="..." title="..." subtitle="..." />` props
- Custom hero implementations (casas lineas, etc.)

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `page` | string (enum) | Page route identifier (21 predefined values) |
| `seo` | seo | Title, description, OG image |
| `hero.tag` | localizedString | Small label above title (e.g., "Programas") |
| `hero.title` | localizedString | Main hero title |
| `hero.highlight` | localizedString | Word highlighted in brand color |
| `hero.subtitle` | localizedText | Hero description |
| `hero.bgImage` | imageWithAlt | Hero background image |
| `hero.bgColor` | string | Override for default hero background color |

**Page routes available**:
home, quienesSomos, comoLoHacemos, impacto, transparencia, leyDeEgreso, contacto, donar, participa, aliados, comoAyudar, comoAyudarPlanPadrino, comoAyudarVoluntariado, comoAyudarEnredate, programas, casasDelSaber, casasModalidades, casasLineas, casasRutaEgreso, casasAreas, noticias

---

### 3. `noticia` (Existing, Enhanced)

**Changes from current**:
- `title` changed from `string` to `localizedString`
- `excerpt` changed from `text` to `localizedText`
- `author` changed from `string` to `localizedString`
- `body` changed from `blockContent` to `localizedBlockContent`
- Added `seo` field
- `coverImage` changed to `imageWithAlt`

**Note**: The slug source changed from `"title"` to `"title.es"`. Existing slugs will not be affected.

---

### 4. `programa` (Existing, Enhanced)

**Changes from current**:
- `title` changed from `string` to `localizedString`
- `description` renamed to `shortDescription`, changed to `localizedText`
- Added `heroImage` (imageWithAlt) -- replaces per-page hero bg image hardcoding
- Added `programLogo` (imageWithAlt) -- for program logos like LOGO-FOMENTO.png
- Added `brandColor` (string) -- hex color for program theming
- Added `introText` (localizedBlockContent) -- full rich text page content
- Added `objectives` (array of {title, description})
- Added `components` (array of {title, description, icon})
- Added `results` (array of localizedString)
- Added program-specific sections: `modules`, `actionLines`, `pillars`, `crossCutting`, `incidenciaItems`, `secondaryObjectives`
- Added `gallery` (imageWithAlt[])
- Added `seo` field

**Replaces hardcoded content in**:
- `src/app/[locale]/programas/page.tsx` -- programs array (5 items with title, desc, image, label)
- `src/app/[locale]/programas/avanza-joven/page.tsx` -- objetivosEspecificos, modules
- `src/app/[locale]/programas/empleo/page.tsx` -- objetivosEspecificos, componentes, resultados
- `src/app/[locale]/programas/incidencia/page.tsx` -- objetivos, lineas de accion, resultados
- `src/app/[locale]/programas/mi-cuerpo/page.tsx` -- components, secondaryObjectives
- `src/app/[locale]/programas/marco-politico/page.tsx` -- pilares, enfoques transversales, incidencia
- `src/app/[locale]/impacto/page.tsx` -- programasImpacto array

---

### 5. `teamMember`

**Purpose**: Team member profiles.

**Replaces hardcoded content in**:
- `src/app/[locale]/quienes-somos/page.tsx` -- team array (5 members)
- `src/data/fotos.json` -- equipo section (4 members, now 5 in code)

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `name` | localizedString | Full name |
| `role` | localizedString | Job title / role |
| `photo` | imageWithAlt | Professional photo |
| `order` | number | Display order |
| `active` | boolean | Show/hide toggle |

---

### 6. `milestone`

**Purpose**: Timeline entries for the "Trayectoria" section.

**Replaces hardcoded content in**:
- `src/app/[locale]/page.tsx` -- milestones array (5 items)
- `src/app/[locale]/quienes-somos/page.tsx` -- milestones array (DUPLICATE)

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `year` | string | Year display (e.g., "2019") |
| `title` | localizedString | Milestone title |
| `description` | localizedText | Description |
| `image` | imageWithAlt | Associated image |
| `order` | number | Display order |

---

### 7. `documentEntry`

**Purpose**: Transparency documents (PDFs and external links).

**Replaces hardcoded content in**:
- `src/app/[locale]/transparencia/page.tsx` -- documents array (6 groups, 14 entries)
- `src/data/documentos.json` -- 25 entries (partially overlapping)

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `title` | localizedString | Document display name |
| `category` | string (enum) | institucionales, financieros, informes, registros, legales, cartillas |
| `description` | localizedString | Short description |
| `file` | file | PDF upload |
| `externalUrl` | url | Alternative: Google Drive or external link |
| `order` | number | Order within category |

---

### 8. `partner`

**Purpose**: Allies and organizational partners.

**Replaces hardcoded content in**:
- `src/app/[locale]/page.tsx` -- aliados array (4 items)
- `src/app/[locale]/aliados/page.tsx` -- partnerLogos array (4 items, DUPLICATE)

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `name` | localizedString | Partner name |
| `logo` | imageWithAlt | Partner logo (SVG/PNG preferred) |
| `website` | url | Partner website |
| `sector` | string (enum) | gobierno, educacion, empresa, ong, multilateral |
| `order` | number | Display order |
| `featured` | boolean | Show on homepage |

---

### 9. `videoEntry`

**Purpose**: Video content (hero videos, event videos, Enredate videos).

**Replaces hardcoded content in**:
- `src/data/videos.json` -- hero video + 5 event videos
- `src/app/[locale]/page.tsx` -- hero video path
- `src/components/HomeHero.tsx` -- video source path
- `src/components/VideoHero.tsx` -- poster image path

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `title` | localizedString | Video title |
| `description` | localizedText | Description |
| `source` | string | "youtube" or "file" |
| `youtubeUrl` | url | YouTube embed URL (conditional) |
| `videoFile` | file | MP4 upload (conditional) |
| `thumbnail` | imageWithAlt | Cover image |
| `category` | string | hero, eventos, enredate |
| `order` | number | Display order |

---

### 10. `galleryAlbum`

**Purpose**: Photo galleries organized by album.

**Replaces hardcoded content in**:
- `src/data/fotos.json` -- galeria section (encuentro2025, eventos, equipoShoot)
- `src/app/[locale]/page.tsx` -- gallery array (4 images)
- `src/app/[locale]/impacto/page.tsx` -- galeriaImages array (12 images)
- `src/app/[locale]/donar/page.tsx` -- GALLERY array (5 images)
- `src/data/fotos.json` -- heroes map, timeline images, about image, impacto images

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `title` | localizedString | Album name |
| `slug` | slug | URL-friendly identifier |
| `description` | localizedText | Album description |
| `images` | imageWithAlt[] | All images in the album |
| `category` | string | encuentros, eventos, equipo, programas, hero, general |
| `coverImage` | imageWithAlt | Album thumbnail |
| `order` | number | Display order |

**Recommended albums to create**:
- "Hero Images" (category: hero) -- All page hero background images
- "Encuentro 2025" (category: encuentros)
- "Eventos 2024" (category: eventos)
- "Equipo" (category: equipo)
- "Ley de Egreso" (category: general)
- "Galeria Homepage" (category: general)

---

### 11. `impactStat`

**Purpose**: Impact statistics with animated counters.

**Replaces hardcoded content in**:
- `src/app/[locale]/impacto/page.tsx` -- impactStats array (5 items)
- `src/app/[locale]/page.tsx` -- stats array (4 items, partially overlapping)
- `src/app/[locale]/donar/page.tsx` -- stats array (4 items, DUPLICATE)

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `label` | localizedString | Display label |
| `value` | number | Final animated value |
| `suffix` | string | After number (e.g., "+") |
| `prefix` | string | Before number (e.g., "$") |
| `icon` | string | Lucide icon name |
| `color` | string | Accent color hex |
| `order` | number | Display order |

**Current stats to migrate**:
1. value: 71148, label: "Jovenes en el sistema", icon: Users, color: #019E9F
2. value: 13000, suffix: "+", label: "Jovenes egresados", icon: GraduationCap, color: #44BCC5
3. value: 5, label: "Programas activos", icon: Layers, color: #EC6620
4. value: 2019, label: "Fundacion", icon: Calendar, color: #EC6620
5. value: 5, label: "Lineas estrategicas", icon: Target, color: #019E9F

---

### 12. `testimonial`

**Purpose**: Testimonials from beneficiaries, partners, and stakeholders.

**Replaces hardcoded content in**:
- `src/app/[locale]/page.tsx` -- testimonialsData array (references i18n keys)
- `src/app/[locale]/como-ayudar/enredate-con-ascep/page.tsx` -- hardcoded testimonials (3 items)

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `quote` | localizedText | The testimonial text |
| `author` | localizedString | Author name |
| `role` | localizedString | Role or relationship to ASCEP |
| `avatar` | imageWithAlt | Author photo |
| `section` | string | home, enredate, donar |
| `order` | number | Display order |

---

### 13. `donationTier`

**Purpose**: Donation level cards on the "Donar" page.

**Replaces hardcoded content in**:
- `src/app/[locale]/donar/page.tsx` -- CREATIVE_IMPACT array (5 items)
- `src/app/[locale]/como-ayudar/page.tsx` -- tier cards (3 items, partially overlapping)

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `label` | localizedString | Tier name (e.g., "Semilla") |
| `description` | localizedText | What this tier funds |
| `monthlyCop` | number | Monthly amount in COP |
| `monthlyUsd` | number | Monthly amount in USD |
| `icon` | string | Lucide icon name |
| `color` | string | Accent color hex |
| `badge` | string | Special badge text (e.g., "Recomendado") |
| `order` | number | Display order |

---

### 14. `faqSection`

**Purpose**: FAQ content grouped by page.

**Replaces hardcoded content in**:
- `src/app/[locale]/donar/page.tsx` -- hardcoded FAQ items (5 items, all Spanish)

**Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `page` | string | donar, general |
| `items` | faqItem[] | Array of {question, answer} |

---

## Content Mapping: Code to CMS

### Priority 1: High-Value, Frequently Changed

| Current Source | New Schema | Impact |
|---------------|------------|--------|
| `src/app/[locale]/noticias/` (existing) | `noticia` (enhanced) | +localized, +SEO |
| `src/app/[locale]/programas/` (existing) | `programa` (enhanced) | +full content, +localized |
| `src/app/[locale]/transparencia/page.tsx` | `documentEntry` | Document management |
| `src/data/fotos.json` galleries | `galleryAlbum` | Image management |

### Priority 2: Structured Content, Moderate Change

| Current Source | New Schema | Impact |
|---------------|------------|--------|
| `quienes-somos/page.tsx` team array | `teamMember` | Team management |
| `page.tsx` + `quienes-somos/page.tsx` milestones | `milestone` | Single source of truth |
| `page.tsx` + `aliados/page.tsx` partner logos | `partner` | Partner management |
| `impacto/page.tsx` stats | `impactStat` | Stats management |
| `donar/page.tsx` testimonials | `testimonial` | Testimonial management |
| `donar/page.tsx` donation tiers | `donationTier` | Donation config |

### Priority 3: Global Settings

| Current Source | New Schema | Impact |
|---------------|------------|--------|
| `layout.tsx` + `TopBar.tsx` + `WhatsAppButton.tsx` | `siteSettings` | Centralized config |
| All page metadata exports | `pageContent` | SEO management |
| `videos.json` | `videoEntry` | Video management |
| `donar/page.tsx` FAQ | `faqSection` | FAQ management |

### What Stays in Code (NOT migrated to CMS)

| Content | Reason |
|---------|--------|
| `messages/{es,en,pt}.json` (32 namespaces) | UI labels, navigation strings, form placeholders -- these are code-level concerns |
| `src/components/Header.tsx` navigation structure | Menu structure is a UX decision, not content |
| `src/components/MobileTabBar.tsx` tabs | Navigation structure |
| `src/components/ProgramStack.tsx` slug mappings | Internal routing logic |
| `src/components/ModeloGrid.tsx` dimensions | i18n-driven, structural |
| `src/components/DonationForm.tsx` payment config | API endpoints, FX rates -- technical config |
| `src/lib/asset-path.ts` | Build-time asset resolution |
| `src/lib/asset-map.ts` | Auto-generated blob URLs |
| `ColombiaMap.tsx` coordinates | Geographic data, not content |
| `Footer.tsx` navigation link mappings | Routing logic |

---

## Migration Phases

### Phase 1: Foundation (Week 1)
1. Create all schemas in Sanity Studio
2. Set up `siteSettings` singleton with current hardcoded values
3. Set up `pageContent` documents for all 21 pages
4. Test Studio access and field editing

### Phase 2: Core Content (Week 2)
5. Migrate `noticia` schema (add localized fields, migrate existing docs)
6. Migrate `programa` schema (add all program content)
7. Migrate `teamMember` documents (5 team members)
8. Migrate `milestone` documents (5 timeline entries)

### Phase 3: Supporting Content (Week 3)
9. Migrate `documentEntry` documents (transparency docs)
10. Migrate `partner` documents (4 partners)
11. Migrate `galleryAlbum` documents (hero images, galleries)
12. Migrate `videoEntry` documents (hero + event videos)

### Phase 4: Dynamic Content (Week 4)
13. Migrate `impactStat` documents (5 stats)
14. Migrate `testimonial` documents
15. Migrate `donationTier` documents (5 tiers)
16. Migrate `faqSection` documents

### Phase 5: Frontend Integration (Weeks 5-6)
17. Update page components to fetch from Sanity
18. Add `getClient()` fallback to current hardcoded data (graceful degradation)
19. Update `imageUrl()` to work with `imageWithAlt` type
20. Test all pages with CMS data
21. Remove hardcoded data arrays from page components

### Phase 6: Polish (Week 7)
23. SEO validation across all pages
24. Image optimization audit
25. Performance testing (CDN caching)
26. Documentation for content editors

---

## Client Fallback Strategy

The Sanity client already returns `null` if `NEXT_PUBLIC_SANITY_PROJECT_ID` is not set. The migration should maintain this pattern:

```typescript
const client = getClient();
const data = client ? await client.fetch(query) : null;

// Fall back to hardcoded data if CMS is unavailable
const content = data ?? hardcodedFallback;
```

This ensures the site continues to work during migration and in development environments without Sanity configured.

---

## GROQ Query Location

All queries are in `src/lib/sanity/queries.ts`. Key patterns:

- Singleton queries: `*[_type == "siteSettings"][0]`
- List queries: `*[_type == "noticia"] | order(publishedAt desc)`
- Filtered queries: `*[_type == "videoEntry" && category == $category]`
- Parameterized queries: `*[_type == "noticia" && slug.current == $slug][0]`

---

## Image Handling

### Current System
- `assetPath(localPath)` -- dev: returns path, prod: maps via asset-map.ts
- `imageUrl(sanityRef, w, h)` -- builds Sanity CDN URL from asset reference

### Post-Migration
- CMS images: Use `imageUrl()` from `src/lib/sanity/image.ts`
- Static images (logos, etc.): Keep using `assetPath()` with asset-map
- The `imageWithAlt` object type is a Sanity `image` type with an `alt` field -- `imageUrl()` works with it directly

---

## Testing Checklist

- [ ] All pages render correctly with CMS data
- [ ] Fallback to hardcoded data works when Sanity is unavailable
- [ ] Localized content displays correctly for ES, EN, PT
- [ ] Images load from Sanity CDN
- [ ] SEO meta tags render correctly per page
- [ ] Sanity Studio loads at /studio
- [ ] Content editors can create/edit/delete all document types
- [ ] No regression in page load performance
- [ ] Mobile responsive layout maintained
- [ ] Dark mode works with CMS-driven content
