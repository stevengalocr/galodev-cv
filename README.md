# GaloDev Portfolio v4.0

Portafolio personal de **Steven** (ingeniero full-stack, marca GaloDev). Bilingüe
ES/EN, dark "technical", con un sistema de movimiento "Living Blueprint". Presenta
cuatro SaaS reales (Seltter, DataFud, BilBildin, CoinDev) como case studies de ingeniería.

## Stack

Next.js 15 (App Router, SSG) · React 19 · TypeScript · Tailwind CSS ·
Framer Motion + Lenis + GSAP ScrollTrigger · Resend (contacto) · Vercel.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000  (redirige a /es)
npm run build      # build de producción (SSG)
npm run typecheck  # tsc --noEmit
npm test           # vitest (lógica: i18n, contenido, contacto)
```

## Estructura

- `src/app/[locale]/` — páginas con locale (`es` | `en`): home, `work/[slug]`, about, contact.
- `src/content/work/` — **fuente única** de cada producto (objeto tipado bilingüe).
  Para editar/añadir un proyecto, toca un solo archivo aquí.
- `src/components/motion/` — primitivas de animación (SmoothScroll, Aurora, Reveal,
  ScrollScene, DrawSVG, CountUp, Magnetic). Todas respetan `prefers-reduced-motion`.
- `src/components/sections/` — secciones de home / work / contact.
- `src/lib/i18n/` — config de locales, diccionarios y resolver bilingüe.
- `src/lib/contact.ts` — validación (Zod) + envío (Resend) del formulario.

## Internacionalización

`es` es el idioma por defecto. El toggle del nav cambia `/es ↔ /en` preservando la
ruta. El texto del "chrome" vive en `src/lib/i18n/dictionaries.ts`; el contenido de
cada producto es bilingüe dentro de su objeto (`{ es, en }`).

## Assets pendientes

Ver **[ASSETS-TODO.md](./ASSETS-TODO.md)** — capturas de producto, foto, CV, URLs de
demo, OG y variables de entorno, con la ruta exacta de cada uno. El sitio funciona con
placeholders; para activar imágenes reales: pon el archivo en `public/` y cambia
`PLACEHOLDER_MODE = false` en `src/components/ui/AssetImage.tsx`.

## Variables de entorno

Copia `.env.example` → `.env.local`:

```
RESEND_API_KEY=          # formulario de contacto
CONTACT_TO=stevengalocr@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deploy (Vercel)

Importa el repo, agrega las variables de entorno y despliega. El build es estático
(`next build`); el único endpoint dinámico es `/api/contact`.

---

_Desarrollado por Steven · GaloDev._
