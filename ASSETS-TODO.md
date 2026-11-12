# ASSETS-TODO — qué falta y dónde va exactamente

Las capturas e íconos de los seis productos ya son reales: se tomaron de los sitios en
vivo y están en `public/work/<slug>/`. Lo que sigue pendiente es lo que solo Steven
puede aportar.

---

## 1. Retrato / foto

| Archivo | Dónde aparece | Especificación |
|---|---|---|
| `public/steven.jpg` | Home (sección "sobre mí") y página **/about** | Foto profesional vertical (~1200×1500), encuadre centrado. Al subirla, cambiar `hasPortrait: true` en `src/lib/site.ts`. Mientras tanto se muestra un monograma "SG". |

---

## 2. CV

| Archivo | Dónde se enlaza | Nota |
|---|---|---|
| `public/cv.pdf` | Botón "Descargar CV" en **/about** y CTA final de la home | PDF, idealmente una versión ES y, si quieres, EN. Por ahora el botón apunta a `/cv.pdf`. Si haces dos, dime y agrego toggle por idioma. |

---

## 3. Open Graph (previsualización al compartir el link)

Imágenes **1200×630 px**. Aparecen cuando compartes el link en WhatsApp, LinkedIn, X, etc.

| Archivo | Para qué link |
|---|---|
| `public/og/default.png` | Home / general |
| `public/og/seltter.png` | /work/seltter |
| `public/og/datfud.png` | /work/datfud |
| `public/og/bilbildin.png` | /work/bilbildin |
| `public/og/coindev.png` | /work/coindev |

> Si no las subes, el sitio funciona igual; solo el preview social saldrá sin imagen.
> Puedo generarlas con la estética "dark technical" del sitio si quieres.

---

## 4. Favicon / PWA (opcional, recomendado)

| Archivo | Nota |
|---|---|
| `src/app/icon.png` (o `favicon.ico`) | Ícono del sitio en la pestaña. 512×512. Next lo toma automáticamente desde `src/app/`. |
| `src/app/apple-icon.png` | Ícono al guardar en pantalla de inicio iOS. 180×180. |

---

## 5. Texto / enlaces (no son imágenes, pero quedan pendientes)

`src/lib/site.ts` (✅ ya configurado con datos reales):

| Constante | Valor | Estado |
|---|---|---|
| `CONTACT.email` | `stevengalocr@gmail.com` | ✅ real |
| `CONTACT.linkedin` | `linkedin.com/in/steven-tercero-galo-94a6621bb` | ✅ real |
| `CONTACT.instagram` | `instagram.com/galodevcr` | ✅ real |
| `CONTACT.cv` | `/cv.pdf` | ⏳ falta subir `public/cv.pdf` |

`liveUrl` de cada producto (✅ ya con las URLs reales):

| Producto | `liveUrl` | Estado |
|---|---|---|
| Seltter | `https://seltter.com` | ✅ |
| DataFud | `https://datafud.com` | ✅ |
| BilBildin | `https://bilbildin.com` | ✅ |
| CoinDev | `https://coindev.app` | ✅ |

---

## 6. Variables de entorno (para que el formulario de contacto envíe)

Copia `.env.example` → `.env.local` y completa:

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Enviar el correo del formulario de contacto (crear cuenta gratis en resend.com) |
| `CONTACT_TO` | A qué correo llegan los mensajes (ya viene tu correo) |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (para OG y sitemap). En local: http://localhost:3000 |

> Sin `RESEND_API_KEY` el formulario muestra un error elegante y el usuario puede
> escribir directo por correo/LinkedIn (esos enlaces sí funcionan).

---

## Resumen rápido de prioridad

1. 🔴 **4 logos de producto** → `public/logos/<slug>.svg` (lo que necesito ya).
2. **Foto** `public/steven.jpg` + **CV** `public/cv.pdf`.
3. `RESEND_API_KEY` para el formulario.
4. (Después / opcional) **12 capturas** para las páginas de producto.
5. (Opcional) 5 imágenes **OG**.
6. ✅ Listo: URLs de producto, LinkedIn, Instagram (+6k), favicon (`icon.svg`).

> Pendiente futuro (en mente, no ahora): sección **Clientes** con sus links.

Cuando tengas los **logos**, avísame: los coloco, activo `LOGOS_READY = true` y queda
la home con tu marca real.
