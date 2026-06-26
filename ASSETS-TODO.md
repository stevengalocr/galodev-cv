# ASSETS-TODO — qué falta y dónde va exactamente

Todo el sitio compila y funciona **con placeholders**. Cada imagen pendiente se
muestra hoy como un recuadro punteado con su `ruta` y descripción, así sabes
exactamente qué subir y dónde. Para activar las imágenes reales:

1. Coloca el archivo en la ruta indicada dentro de `public/`.
2. En `src/components/ui/AssetImage.tsx` cambia `PLACEHOLDER_MODE = true` → `false`.
   (Eso hace que `AssetImage` use el `<img>` real en lugar del recuadro.)
3. Para el texto/links (correo, LinkedIn, CV, URLs de demo) edita `src/lib/site.ts`
   y los campos `liveUrl` de cada producto en `src/content/work/*.ts`.

Formato recomendado de imágenes: **WebP o AVIF** (más livianas). PNG/JPG también sirven.

---

## 1. Logos de producto — lo que necesito AHORA 🔴

La home muestra los productos como **bandas a todo lo ancho**, donde el **logo es el
héroe**. 4 logos, uno por producto. (Mientras no estén, se muestra el nombre como
wordmark, así que la home ya se ve completa.)

| Producto | Archivo |
|---|---|
| BilBildin | `public/logos/bilbildin.svg` |
| DataFud   | `public/logos/datafud.svg` |
| Seltter   | `public/logos/seltter.svg` |
| CoinDev   | `public/logos/coindev.svg` |

**Specs:**
- Formato: **SVG** (vectorial, ideal) o **PNG transparente** ≥1000px de ancho.
- Fondo **transparente**.
- Debe leerse sobre **fondo oscuro**: idealmente versión **blanca / clara / monocromo
  claro**. Si tu logo a color tiene buen contraste sobre oscuro, también sirve.
- Lockup horizontal (símbolo + nombre) o el wordmark/símbolo, con aire alrededor.
- Cuando los tengas, los coloco y activo `LOGOS_READY = true` en
  `src/components/sections/home/ProductBands.tsx`.

---

## 2. Capturas de producto (para las páginas de producto · después)

Ya **no van en la home** (la home es solo logos). Estas viven **dentro de la página de
cada producto** como ejemplos — opcionales / posteriores. Ratio **16:10** (las dos
primeras) y **21:9** ancha (la tercera, banner). Mínimo ~1600px, fondo limpio, datos
creíbles.

| Producto | Archivo | Sección / qué debe mostrar |
|---|---|---|
| **Seltter** | `public/screenshots/seltter/dashboard.png` | Panel con lista de clientes y reportes de retención |
| | `public/screenshots/seltter/card-editor.png` | Editor de tarjeta en vivo (colores, logo, premio) |
| | `public/screenshots/seltter/wallet-pass.png` | La tarjeta dentro de Apple Wallet (foto de teléfono ideal) |
| **DataFud** | `public/screenshots/datfud/menu-client.png` | Menú del comensal por QR en móvil |
| | `public/screenshots/datfud/order-board.png` | Tablero de comandas en vivo (kanban) |
| | `public/screenshots/datfud/dashboard.png` | Panel del restaurante (menú/mesas/reportes) |
| **BilBildin** | `public/screenshots/bilbildin/storefront.png` | Tienda pública con la marca del negocio |
| | `public/screenshots/bilbildin/admin-dashboard.png` | Dashboard con la **ganancia real** visible |
| | `public/screenshots/bilbildin/orders.png` | Pedidos + inventario |
| **CoinDev** | `public/screenshots/coindev/overview.png` | Resumen financiero (balance, donut, barras) |
| | `public/screenshots/coindev/fx.png` | Divisas en tiempo real / conversor USD-CRC |
| | `public/screenshots/coindev/reports.png` | Reportes y análisis |

> Tip: puedo generarlas corriendo cada app (`npm run dev` en cada repo) y capturando
> las pantallas clave, si me pasas acceso/credenciales de demo.

---

## 2. Retrato / foto

| Archivo | Dónde aparece | Especificación |
|---|---|---|
| `public/steven.jpg` | Home (sección "sobre mí") y página **/about** | Foto profesional. Home la usa **1:1** (cuadrada); About la usa **4:5** (vertical). Sube una vertical de buena resolución (~1200×1500) y encuadra centrado; ambas la recortan bien. Fondo neutro o con carácter, buena luz. |

---

## 3. CV

| Archivo | Dónde se enlaza | Nota |
|---|---|---|
| `public/cv.pdf` | Botón "Descargar CV" en **/about** y CTA final de la home | PDF, idealmente una versión ES y, si quieres, EN. Por ahora el botón apunta a `/cv.pdf`. Si haces dos, dime y agrego toggle por idioma. |

---

## 4. Open Graph (previsualización al compartir el link)

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

## 5. Favicon / PWA (opcional, recomendado)

| Archivo | Nota |
|---|---|
| `src/app/icon.png` (o `favicon.ico`) | Ícono del sitio en la pestaña. 512×512. Next lo toma automáticamente desde `src/app/`. |
| `src/app/apple-icon.png` | Ícono al guardar en pantalla de inicio iOS. 180×180. |

---

## 6. Texto / enlaces (no son imágenes, pero quedan pendientes)

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

## 7. Variables de entorno (para que el formulario de contacto envíe)

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
