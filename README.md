# GaloDev Portfolio v4.0

Portafolio personal de **Steven** (ingeniero full-stack, marca GaloDev). Bilingüe
ES/EN, dark "technical", con un sistema de movimiento "Living Blueprint". Presenta
seis productos reales (Seltter, DataFud, BilBildin, Tuanis3D, CoinDev, DevLoaders) como case studies de ingeniería.

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

## Imágenes de producto

Las capturas e íconos de cada producto son reales (tomadas de los sitios en vivo) y
viven en `public/work/<slug>/` (`desktop.webp`, `detail.webp`, `mobile.webp`, `icon.png`).
Una prueba verifica que cada archivo referenciado exista.

Pendientes: la foto (`public/steven.jpg` + `PERSON.hasPortrait = true` en `src/lib/site.ts`),
el CV (`public/cv.pdf`) y las imágenes Open Graph. Ver **[ASSETS-TODO.md](./ASSETS-TODO.md)**.

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
