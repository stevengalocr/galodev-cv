# GaloDev Portfolio v4.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (ES/EN), dark "technical/dev" portfolio site for Steven (GaloDev) that showcases four real SaaS products as deep engineering case studies, with a signature "Living Blueprint" motion system, to win dev jobs and freelance clients.

**Architecture:** Next.js 15 App Router, statically generated (SSG), no database. Per-product content lives in typed TS objects (single source feeding both home cards and case-study pages). Locale routing via `/[locale]` segment with dictionary-based i18n. Motion layered as Framer Motion (component) + Lenis (smooth scroll) + GSAP ScrollTrigger (signature pinned/scrubbed scenes), engineered mobile-first and degrading under `prefers-reduced-motion`. Contact via a single Resend-backed API route.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lenis, GSAP (ScrollTrigger), Lucide, Sharp, Resend, Zod, Vitest (logic tests), Playwright optional for smoke. Deploy: Vercel.

## Global Constraints

- Next.js 15 App Router, `output` static-friendly (SSG via `generateStaticParams`); no Supabase/DB in this project.
- Locales: exactly `es` and `en`. `es` is the default/source language. Every user-facing string resolvable in both.
- Identity: person-first — "Steven", full-stack engineer; "GaloDev" is the project/brand name, never the author.
- Audience: recruiters / technical leads / clients. Tone: confident, precise, no marketing fluff aimed at end-users of the SaaS.
- Aesthetic: dark base (~`#0A0A0F`), neutral home; each case study carries ONE accent color. Display sans + mono (JetBrains/Geist Mono) for labels/data.
- Motion intensity: maximum ("overdrive"), but **mobile-first 60fps** is a hard requirement; `prefers-reduced-motion` must yield a tasteful reduced experience, never a broken one.
- Four products, fixed slugs: `datfud`, `seltter`, `bilbildin`, `coindev`.
- No public source links (repos private). Proof = live demo URLs + real screenshots + engineering narrative.
- Craft gate: implementation of visual surfaces uses the `impeccable` / `taste-skill` / `emil-design-eng` skills; output must pass an anti-generic ("no slop") review before a phase is considered done.
- Accessibility: semantic landmarks, visible focus, alt text on every image, color contrast AA; keyboard-navigable nav + locale toggle.

---

## File Structure

```
src/
  app/
    layout.tsx                  # <html>, fonts, metadata defaults
    [locale]/
      layout.tsx                # LocaleProvider, SmoothScroll, AuroraBackground, Nav, Footer
      page.tsx                  # Home
      work/[slug]/page.tsx      # Case study (generateStaticParams from content)
      about/page.tsx
      contact/page.tsx
    api/contact/route.ts        # POST → Resend
    sitemap.ts, robots.ts
  content/
    work/index.ts               # registry: ordered list + getBySlug
    work/datfud.ts seltter.ts bilbildin.ts coindev.ts
    work/types.ts               # Project, Bilingual<T>, EngineeringChallenge, etc.
  lib/
    i18n/config.ts              # locales, defaultLocale, isLocale
    i18n/dictionaries.ts        # es/en chrome strings + getDictionary, t()
    i18n/resolve.ts             # resolveBilingual(value, locale)
    motion/lenis.ts             # Lenis singleton + GSAP ScrollTrigger wiring
    motion/easings.ts           # shared easing/spring tokens (emil taste)
    motion/reduced.ts           # useReducedMotion hook wrapper
    utils/cn.ts
  components/
    chrome/ Nav.tsx Footer.tsx LocaleToggle.tsx
    motion/ SmoothScroll.tsx AuroraBackground.tsx Reveal.tsx ScrollScene.tsx
            DrawSVG.tsx CountUp.tsx Magnetic.tsx
    ui/ Button.tsx Chip.tsx Card.tsx SectionHeading.tsx
    sections/home/ Hero.tsx StackStrip.tsx ProductMap.tsx AboutTeaser.tsx ContactCTA.tsx
    sections/work/ CaseHero.tsx ProblemBlock.tsx SolutionBlock.tsx ArchitectureDiagram.tsx
                   ChallengeDeck.tsx SecurityBlock.tsx CaseFooterNav.tsx
    sections/about/ AboutHero.tsx ExperienceList.tsx StackGrid.tsx
    sections/contact/ ContactForm.tsx ContactLinks.tsx
public/  screenshots/<slug>/*  steven.jpg  cv.pdf  og/*  grain.png
```

---

## Phase 0 — Scaffold & Foundation

### Task 0.1: Scaffold Next.js + Tailwind + tooling

**Files:**
- Create: whole project in `galodev4.0/` (package.json, tsconfig, next.config, tailwind, postcss)
- Create: `vitest.config.ts`, `src/app/layout.tsx`, `src/app/[locale]/page.tsx` (temporary "hello")

**Interfaces:**
- Produces: a building Next 15 app with Tailwind, a `@/*` path alias → `src/*`, and `vitest` runnable.

- [ ] **Step 1:** Scaffold with `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack` (run in the empty `galodev4.0` dir; keep the existing `.claude`/`.impeccable`).
- [ ] **Step 2:** Install runtime deps: `npm i framer-motion lenis gsap lucide-react resend zod clsx tailwind-merge` and `npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom sharp`.
- [ ] **Step 3:** Add `vitest.config.ts` (jsdom env, React plugin, `@/*` alias) and a `"test": "vitest run"` script.
- [ ] **Step 4:** Add `src/lib/utils/cn.ts` exporting `cn(...inputs)` via `twMerge(clsx(inputs))`.
- [ ] **Step 5:** Run `npm run build` and `npx tsc --noEmit`. Expected: both green.
- [ ] **Step 6:** `git init`, add a Next-appropriate `.gitignore` (node_modules, .next, .env*), commit: `chore: scaffold next15 + tailwind + vitest`.

### Task 0.2: Design tokens, fonts, base theme

**Files:**
- Modify: `src/app/globals.css` (CSS variables: `--bg`, `--surface`, `--text`, `--muted`, `--border`, `--grain`), `tailwind.config.ts` (extend colors → CSS vars, fontFamily sans/mono)
- Modify: `src/app/layout.tsx` (load display sans + mono via `next/font`; set `lang`, base `metadata`)

**Interfaces:**
- Produces: Tailwind classes `bg-bg surface text-text text-muted border-border font-mono` resolving to the dark theme; CSS var `--accent` defaulting neutral, overridable per case study via inline style.

- [ ] **Step 1:** In `layout.tsx`, load a strong display sans (e.g. `next/font/google` Geist/Sora) and a mono (Geist Mono / JetBrains Mono); expose `--font-sans` / `--font-mono`.
- [ ] **Step 2:** Define dark palette CSS vars in `globals.css` (`--bg:#0A0A0F` etc.) plus `--accent` neutral default and a `.accent-*` strategy (set `--accent` inline on case-study root).
- [ ] **Step 3:** Wire `tailwind.config.ts` colors/font to the vars.
- [ ] **Step 4:** Replace boilerplate body with `bg-bg text-text font-sans antialiased`.
- [ ] **Step 5:** `npm run build`. Expected: green, dark background renders.
- [ ] **Step 6:** Commit: `feat: dark theme tokens + fonts`.

---

## Phase 1 — i18n & Content Model (logic core, TDD)

### Task 1.1: Locale config + resolver (TDD)

**Files:**
- Create: `src/lib/i18n/config.ts`, `src/lib/i18n/resolve.ts`
- Test: `src/lib/i18n/resolve.test.ts`

**Interfaces:**
- Produces:
  - `type Locale = 'es' | 'en'`; `const locales`, `const defaultLocale='es'`; `isLocale(x): x is Locale`.
  - `type Bilingual<T=string> = { es: T; en: T }`.
  - `resolveBilingual<T>(value: Bilingual<T> | T, locale: Locale): T` — returns `value[locale]` if it's a `Bilingual`, else the raw value.

- [ ] **Step 1: Write failing test** `resolve.test.ts`:
```ts
import { resolveBilingual } from './resolve';
test('picks locale field', () => {
  expect(resolveBilingual({ es: 'Hola', en: 'Hi' }, 'en')).toBe('Hi');
});
test('passes through non-bilingual', () => {
  expect(resolveBilingual('x', 'es')).toBe('x');
});
```
- [ ] **Step 2:** Run `npm test -- resolve` → FAIL (module missing).
- [ ] **Step 3:** Implement `config.ts` (types/consts/`isLocale`) and `resolve.ts` (guard on `value && typeof==='object' && 'es' in value && 'en' in value`).
- [ ] **Step 4:** Run `npm test -- resolve` → PASS.
- [ ] **Step 5:** Commit: `feat(i18n): locale config + bilingual resolver`.

### Task 1.2: Chrome dictionaries (TDD)

**Files:**
- Create: `src/lib/i18n/dictionaries.ts`
- Test: `src/lib/i18n/dictionaries.test.ts`

**Interfaces:**
- Consumes: `Locale` from 1.1.
- Produces: `getDictionary(locale): Dict` where `Dict` covers nav labels (`work`, `about`, `contact`), CTAs (`viewLiveDemo`, `getInTouch`, `downloadCv`, `nextProject`), section headings, and contact form labels/states. Keys identical across `es`/`en`.

- [ ] **Step 1: Write failing test:** assert `getDictionary('es')` and `getDictionary('en')` have identical key sets and `getDictionary('en').nav.about === 'About'`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement `dictionaries.ts` with `es`/`en` records and `getDictionary`.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit: `feat(i18n): chrome dictionaries es/en`.

### Task 1.3: Content schema + project registry (TDD)

**Files:**
- Create: `src/content/work/types.ts`, `src/content/work/index.ts`
- Test: `src/content/work/content.test.ts`

**Interfaces:**
- Consumes: `Bilingual` from 1.1.
- Produces:
  - `interface EngineeringChallenge { title: Bilingual; body: Bilingual }`
  - `interface Metric { label: Bilingual; value: string }`
  - `interface Project { slug: 'datfud'|'seltter'|'bilbildin'|'coindev'; name: string; tagline: Bilingual; accent: string; status: string; liveUrl: string; problem: Bilingual; solution: Bilingual[]; architecture: { summary: Bilingual }; challenges: EngineeringChallenge[]; security?: Bilingual[]; metrics: Metric[]; stack: string[]; screenshots: { src: string; alt: Bilingual }[] }`
  - `const PROJECTS: Project[]` (ordered: seltter, datfud, bilbildin, coindev — strongest first), `getProject(slug): Project | undefined`, `PROJECT_SLUGS: string[]`.

- [ ] **Step 1: Write failing test:** every project has a unique known slug, non-empty `liveUrl`, `accent` matching `/^#([0-9a-f]{6})$/i`, ≥1 challenge, ≥1 screenshot; `getProject('seltter')` defined; `getProject('nope')` undefined.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement `types.ts` + per-product files (real copy from the approved brief — problem/solution/challenges already written; placeholders ONLY for `liveUrl` and screenshot paths, flagged with `// ASSET:`), and `index.ts` registry.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit: `feat(content): project schema + 4 products`.

> NOTE: `liveUrl` and screenshot files come from the asset-gathering step; use clearly-marked `ASSET:` constants so the build still compiles and a later task fills them.

---

## Phase 2 — Motion Infrastructure (mobile-first overdrive)

### Task 2.1: Reduced-motion + easing tokens

**Files:** Create `src/lib/motion/reduced.ts`, `src/lib/motion/easings.ts`. Test: `src/lib/motion/easings.test.ts`.

**Interfaces:**
- Produces: `EASE` (named cubic-beziers/springs tuned for taste), `DURATION` tokens; `usePrefersReducedMotion(): boolean` (SSR-safe, defaults false on server).

- [ ] **Step 1:** Test that `EASE.out` is a 4-number tuple and `DURATION.base` is a positive number.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS. **Step 5:** Commit `feat(motion): easing + reduced-motion tokens`.

### Task 2.2: SmoothScroll (Lenis) + GSAP ScrollTrigger bridge

**Files:** Create `src/components/motion/SmoothScroll.tsx`, `src/lib/motion/lenis.ts`.

**Interfaces:**
- Consumes: `usePrefersReducedMotion`.
- Produces: `<SmoothScroll>` client component wrapping children; starts Lenis, registers `gsap.ticker` → `lenis.raf`, and `ScrollTrigger.update` on scroll. Disables Lenis when reduced-motion is on (native scroll). Exposes nothing else; ScrollTrigger is used directly by scenes.

- [ ] **Step 1:** Implement Lenis init in `useEffect` (client only), `gsap.registerPlugin(ScrollTrigger)`, cleanup on unmount; guard for reduced-motion and touch.
- [ ] **Step 2:** Verify: temporarily mount in `[locale]/layout.tsx`, `npm run dev`, scroll is smooth on desktop and native on a reduced-motion emulation.
- [ ] **Step 3:** Commit `feat(motion): Lenis smooth scroll + GSAP bridge`.

### Task 2.3: Reusable motion primitives

**Files:** Create `Reveal.tsx`, `ScrollScene.tsx`, `DrawSVG.tsx`, `CountUp.tsx`, `Magnetic.tsx` in `components/motion/`.

**Interfaces:**
- Produces:
  - `<Reveal as? delay? y?>` — Framer Motion in-view fade/translate; no-op transform under reduced-motion.
  - `<ScrollScene pin? scrub? onProgress?>` — wraps a GSAP ScrollTrigger over a ref'd section; cleans up on unmount; under reduced-motion renders children statically.
  - `<DrawSVG>` — animates `stroke-dashoffset` of child paths when in view.
  - `<CountUp to from? duration? format?>` — animates a number in view; shows final value immediately under reduced-motion.
  - `<Magnetic strength?>` — pointer-follow transform on hover (desktop pointer only).

- [ ] **Step 1:** Implement each as a focused client component using `EASE`/`DURATION` and `usePrefersReducedMotion`.
- [ ] **Step 2:** Build a throwaway `/[locale]/_demo` page mounting each; `npm run dev`, verify behavior + reduced-motion fallback; then delete the demo page.
- [ ] **Step 3:** `npm run build` green. Commit `feat(motion): reusable motion primitives`.

---

## Phase 3 — Global Chrome & UI Primitives

### Task 3.1: UI primitives

**Files:** Create `ui/Button.tsx`, `ui/Chip.tsx`, `ui/Card.tsx`, `ui/SectionHeading.tsx`.

**Interfaces:**
- Produces: `<Button variant='solid'|'ghost'|'link' href? >`, `<Chip>` (mono stack pill), `<Card>` (surface+border, optional accent glow via `--accent`), `<SectionHeading eyebrow? title>`.

- [ ] **Step 1:** Implement with Tailwind + `cn`; focus-visible rings; accent via `var(--accent)`.
- [ ] **Step 2:** `npm run build` green. Commit `feat(ui): button/chip/card/heading primitives`.

### Task 3.2: Aurora background + global chrome

**Files:** Create `motion/AuroraBackground.tsx`, `chrome/Nav.tsx`, `chrome/Footer.tsx`, `chrome/LocaleToggle.tsx`; create `app/[locale]/layout.tsx`; update `app/layout.tsx`; add `app/[locale]/page.tsx` placeholder.

**Interfaces:**
- Consumes: dictionaries (1.2), `SmoothScroll` (2.2), `isLocale` (1.1).
- Produces: `[locale]/layout.tsx` that validates the param (`notFound()` if not a locale), wraps children in `SmoothScroll` + `AuroraBackground` + `Nav`/`Footer`, and provides `locale` + `dict` to the tree (via props/`generateStaticParams` for `es`/`en`). `LocaleToggle` swaps the locale segment preserving the rest of the path.

- [ ] **Step 1:** `AuroraBackground`: fixed, behind content, slow-drifting blurred gradient blobs (CSS/Framer) + faint grid + grain overlay; perpetual but calm; static single gradient under reduced-motion.
- [ ] **Step 2:** `Nav` (sticky, blur backdrop, links from dict, `LocaleToggle`), `Footer` (email/LinkedIn, year).
- [ ] **Step 3:** `LocaleToggle` uses `usePathname()` to rewrite `/es/...`↔`/en/...`.
- [ ] **Step 4:** `[locale]/layout.tsx` with `export function generateStaticParams(){ return locales.map(l=>({locale:l})) }` and locale guard.
- [ ] **Step 5:** `npm run build` → `/es` and `/en` prerender. Visit both, toggle preserves path. Commit `feat(chrome): aurora bg + nav + footer + locale toggle`.
- [ ] **Step 6:** CRAFT GATE — run `impeccable`/`taste` review on chrome + aurora; fix slop; commit refinements.

---

## Phase 4 — Home Page (signature scenes)

### Task 4.1: Hero

**Files:** Create `sections/home/Hero.tsx`; use in `app/[locale]/page.tsx`.

**Interfaces:** Consumes dict, motion primitives. Produces `<Hero locale>`.

- [ ] **Step 1:** Implement: name "Steven" + role line ("Full-stack engineer / GaloDev"), assembling name animation, perpetual gradient-mesh + cursor-reactive glow (desktop pointer), primary CTA → contact, secondary → work. Mobile: lighter glow, no cursor effect. Reduced-motion: static.
- [ ] **Step 2:** `npm run dev` verify desktop + mobile viewport (DevTools) + reduced-motion. Commit `feat(home): hero`.

### Task 4.2: StackStrip + AboutTeaser + ContactCTA

**Files:** Create `sections/home/StackStrip.tsx`, `AboutTeaser.tsx`, `ContactCTA.tsx`.

- [ ] **Step 1:** `StackStrip`: marquee/auto-scroll row of mono stack chips (Next, React, TS, Supabase, GSAP…), pausing on hover, static under reduced-motion.
- [ ] **Step 2:** `AboutTeaser`: 2–3 line bio + portrait + link to `/about`. `ContactCTA`: bold closing CTA band.
- [ ] **Step 3:** `npm run build` green. Commit `feat(home): stack strip + about teaser + contact cta`.

### Task 4.3: ProductMap signature scene

**Files:** Create `sections/home/ProductMap.tsx`.

**Interfaces:** Consumes `PROJECTS` (1.3), `ScrollScene`/`DrawSVG`, accent per project.

- [ ] **Step 1:** Implement the signature scene: a pinned, scrubbed section where the four products emerge from dark as glowing nodes connected by animated SVG lines (the "GaloDev system map"); each node tinted with its `accent`, labeled with name + tagline, linking to `/[locale]/work/[slug]`. Lines draw via `DrawSVG` on scrub.
- [ ] **Step 2:** Mobile-first: on small screens degrade pinning to a vertical reveal sequence of nodes (no horizontal pin jank); verify 60fps under DevTools 4× CPU throttle. Reduced-motion: static node grid with links.
- [ ] **Step 3:** Assemble `app/[locale]/page.tsx` = Hero → StackStrip → ProductMap → AboutTeaser → ContactCTA. `npm run build` green.
- [ ] **Step 4:** CRAFT GATE — `impeccable`/`taste`/`emil` review of the home end-to-end; fix; commit `feat(home): product map scene + assembled home`.

---

## Phase 5 — Case Studies

### Task 5.1: Case study sections

**Files:** Create `sections/work/CaseHero.tsx`, `ProblemBlock.tsx`, `SolutionBlock.tsx`, `ArchitectureDiagram.tsx`, `ChallengeDeck.tsx`, `SecurityBlock.tsx`, `CaseFooterNav.tsx`.

**Interfaces:** Each consumes a `Project` + `locale`, resolving bilingual fields via `resolveBilingual`. `ArchitectureDiagram` uses `DrawSVG` (self-drawing dark diagram). `ChallengeDeck` renders `project.challenges` as the star section. `CaseFooterNav` links to the next project in `PROJECTS` order.

- [ ] **Step 1:** Implement each section per the case-study anatomy (hero w/ live-demo button + status badge; problem; solution bullets + screenshots via `next/image`; architecture self-drawing; challenge deck; optional security P0–P3; metrics via `CountUp`).
- [ ] **Step 2:** `npm run build` green. Commit `feat(work): case study section components`.

### Task 5.2: Dynamic case-study route

**Files:** Create `app/[locale]/work/[slug]/page.tsx`.

**Interfaces:** Consumes `PROJECTS`/`getProject`. `generateStaticParams` = `locales × PROJECT_SLUGS`. Sets `--accent` on the page root from `project.accent`. `generateMetadata` per project/locale.

- [ ] **Step 1:** Implement page: guard `getProject(slug)` → `notFound()`; compose sections in order; apply accent; "boot/assemble" entrance tint.
- [ ] **Step 2:** `npm run build` → 8 case-study pages (4 × 2 locales) prerender. Visit each locale for one product; verify accent + live-demo link + reduced-motion.
- [ ] **Step 3:** CRAFT GATE on the strongest (Seltter) + one other; apply learnings across all four; commit `feat(work): dynamic case study pages`.

---

## Phase 6 — About & Contact

### Task 6.1: About page

**Files:** Create `app/[locale]/about/page.tsx`, `sections/about/AboutHero.tsx`, `ExperienceList.tsx`, `StackGrid.tsx`.

- [ ] **Step 1:** Implement: portrait, full bio (bilingual), categorized stack grid, experience/highlights, CV download button (`/cv.pdf`, `ASSET:`). `generateStaticParams` for locales.
- [ ] **Step 2:** `npm run build` green. Commit `feat(about): about page`.

### Task 6.2: Contact API route (TDD)

**Files:** Create `app/api/contact/route.ts`; Test: `app/api/contact/route.test.ts`.

**Interfaces:** Produces `POST` accepting `{ name, email, message }`, validated by a Zod schema `ContactSchema`; on valid → send via Resend (`RESEND_API_KEY`, `CONTACT_TO`); returns `{ ok: true }` (200) or `{ ok:false, error }` (400/500). Resend client is injected/mockable.

- [ ] **Step 1: Write failing test:** invalid body (bad email) → 400 `ok:false`; valid body with a mocked sender → 200 `ok:true` and sender called once. (Mock the Resend send function.)
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement `ContactSchema` (Zod) + handler; factor the send call so the test can mock it; read env lazily.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Add `.env.example` (`RESEND_API_KEY=`, `CONTACT_TO=`). Commit `feat(contact): resend api route + validation`.

### Task 6.3: Contact page UI

**Files:** Create `app/[locale]/contact/page.tsx`, `sections/contact/ContactForm.tsx`, `ContactLinks.tsx`.

**Interfaces:** Consumes contact dict labels/states (1.2). `ContactForm` posts to `/api/contact`, shows loading/success/error states; `ContactLinks` lists email/LinkedIn.

- [ ] **Step 1:** Implement form (client) with disabled-while-sending, success + error UI, accessible labels/errors.
- [ ] **Step 2:** `npm run dev`; submit invalid (inline error) and valid (success) with a test key or mocked endpoint. Commit `feat(contact): contact page`.

---

## Phase 7 — Polish, A11y, Performance, Launch

### Task 7.1: SEO/OG/sitemap

**Files:** Create `app/sitemap.ts`, `app/robots.ts`; per-page `generateMetadata` incl. `alternates.languages` (es/en) + OG images (`ASSET:`).

- [ ] **Step 1:** Implement sitemap (all locale×route URLs), robots, hreflang alternates, default + per-page OG. Build green. Commit `feat(seo): sitemap, robots, og, hreflang`.

### Task 7.2: Accessibility + reduced-motion pass

- [ ] **Step 1:** Keyboard-traverse nav, toggle, forms, case-study links; ensure visible focus, landmarks, alt text, AA contrast. Fix issues.
- [ ] **Step 2:** Toggle OS reduced-motion; confirm every signature scene degrades gracefully (no empty/broken sections). Commit `fix(a11y): focus, landmarks, reduced-motion`.

### Task 7.3: Performance / mobile 60fps

- [ ] **Step 1:** `npm run build`; run Lighthouse (mobile) on home + one case study. Target Performance ≥ 90, A11y ≥ 95.
- [ ] **Step 2:** Profile ProductMap + hero under 4× CPU throttle; fix any jank (will-change, transform-only, throttle scrub, reduce blob count on mobile). Commit `perf: mobile 60fps + lighthouse`.

### Task 7.4: Asset wiring + final craft gate

- [ ] **Step 1:** Replace every `ASSET:` placeholder with real values: 4 `liveUrl`s, screenshots (`public/screenshots/<slug>/`), `steven.jpg`, `cv.pdf`, OG images, LinkedIn/email. (Screenshots may be generated by running each product app and capturing key screens.)
- [ ] **Step 2:** Optimize images (Sharp / `next/image`), confirm alt text present.
- [ ] **Step 3:** FINAL CRAFT GATE — full `impeccable` + `taste` + `emil` review across the whole site; eliminate any generic/templated feel; verify the "Living Blueprint" identity is cohesive.
- [ ] **Step 4:** `npm run build` + `npx tsc --noEmit` + `npm test` all green. Commit `feat: real assets + final polish`.

### Task 7.5: Deploy prep

- [ ] **Step 1:** Add `README.md` (run/build, env vars, deploy). Verify Vercel env vars documented (`RESEND_API_KEY`, `CONTACT_TO`).
- [ ] **Step 2:** Final commit `docs: readme + deploy notes`. (Deploy to Vercel is a manual user step.)

---

## Self-Review

- **Spec coverage:** goal/audience (Phase 4/5 narrative), bilingual ES/EN (1.1–1.2, locale routing 3.2, toggle), person-first identity (Hero 4.1, About 6.1), multi-page case studies (Phase 5), dark+per-accent (0.2, 5.2), Option-A static no-DB (no Supabase anywhere; content in TS; Resend route 6.2), overdrive motion (Phase 2 + 4.3 + 5), mobile-first 60fps (2.x guards, 4.3, 7.3), live demos + screenshots + private repos (content `liveUrl`/screenshots; no source links), craft skills (CRAFT GATE tasks 3.2/4.3/5.2/7.4). All covered.
- **Placeholders:** only intentional `ASSET:` markers for real-world media/URLs, each resolved in Task 7.4; no logic placeholders.
- **Type consistency:** `Locale`, `Bilingual`, `resolveBilingual`, `Project`/`getProject`/`PROJECT_SLUGS`, `getDictionary`, `usePrefersReducedMotion`, `EASE`/`DURATION`, `ContactSchema` used consistently across tasks.
