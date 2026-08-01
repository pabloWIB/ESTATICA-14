# Registro de cambios

Trabajo local del 2026-07-31 sobre el estado descrito en [auditoria.md](auditoria.md).
No se ejecutó ningún comando de git: todos los cambios están en el árbol de trabajo.

---

## Fase 1 — Auditoría

- Inventariados los 15 archivos del proyecto y escrito `docs/auditoria.md` con las
  tablas de HTML, CSS, JS, imágenes, dependencias y problemas detectados.

## Fase 2 — Estructura

Movidos y renombrados todos los archivos a la jerarquía `assets/`:

| Antes | Ahora |
|---|---|
| `CSS/normalize.css` + `CSS/styles.css` + `CSS/fonts.css` | `assets/css/base.css`, `assets/css/layout.css`, `assets/css/components.css` |
| `JS/script.js` | `assets/js/main.js` + `assets/js/modules/price-reveal.js` |
| `IMG/photo1.png` | `assets/img/content/side-table.webp` |
| `IMG/photo2.png` | `assets/img/content/sofa.webp` |
| `IMG/photo3.png` | `assets/img/content/bathtub.webp` |
| `IMG/photo4.png` | `assets/img/content/floor-lamp.webp` |
| `IMG/photo5.png` | `assets/img/content/rubber-plant.webp` |
| `IMG/photo6.png` | `assets/img/content/wooden-bench.webp` |
| `Price-Gallery.png` | `assets/img/logo/price-gallery.webp` + `favicon.png` + `og-image.png` |

Todas las rutas de HTML, CSS y JS actualizadas y comprobadas una por una con
peticiones HTTP: las 18 devuelven 200.

## Fase 3 — Higiene

**Eliminado:**

| Archivo | Motivo |
|---|---|
| `MD/heade.md` | Nota de trabajo con un fragmento del `<head>`; además apuntaba a `IMG/icon.png`, que no existe |
| `CSS/normalize.css` | 357 líneas de normalize v8 para una página de seis imágenes y un botón. Sustituido por un reset propio de 20 líneas dentro de `base.css` |
| `IMG/profilePhoto.png` | Retrato de stock del bloque de identidad inventado (ver fase 5) |
| jQuery slim 3.0.0-beta1 | Dependencia externa —y en versión beta— usada solo para `$()`, `.click()` y `.toggleClass()` |
| Playfair Display y Playfair Display SC | Dos familias tipográficas descargadas de Google Fonts y jamás aplicadas en ninguna regla |
| Bloque duplicado de `styles.css` | Las líneas 149-186 repetían literalmente las 106-143 |
| Regla `.main{}` | Vacía |

**Creado:** `.gitignore` acorde al stack (sin `node_modules` propio, pero sí por si
se usa `npx serve`), `robots.txt` y `sitemap.xml`.

**Credenciales:** no había ninguna. Sin API keys, sin tokens, sin endpoints.

**Formato:** indentación de 2 espacios, comillas dobles en HTML, punto y coma en
JS y salto de línea final en todos los archivos.

## Fase 4 — Imágenes

- Las ocho PNG (3983 KB) pasaron a WebP con calidad 82: **3983 KB → 162 KB**, un 96 % menos.
- Redimensionadas al máximo de su contenedor: las dos panorámicas de 1258 px y
  1254 px bajaron a 800 px. Las demás ya estaban por debajo.
- Eliminado el canal alfa de las seis fotografías, que ninguna usaba.
- El logo se recortó (`-trim`) porque el PNG original tenía cerca de un 40 % de
  margen transparente, lo que hacía que se viese diminuto en la cabecera.
- Del logo se derivaron el favicon (96×96, PNG8, 3,5 KB) y la imagen Open Graph
  (1200×630, el logo centrado sobre el color de fondo del sitio).
- Añadidos `width` y `height` reales a cada `<img>`, `loading="lazy"` a las cuatro
  fotografías bajo el pliegue y `fetchpriority="high"` a la primera.
- `alt` descriptivo en las seis fotografías, que antes lo tenían vacío.

## Fase 5 — HTML, SEO y accesibilidad

- Estructura semántica: `<header>`, `<main>`, `<footer>` y una lista para la
  galería, donde antes había `<div>` anidados y `<body><br><br>`.
- Un solo `<h1>` por página y jerarquía sin saltos.
- `<head>` completo: `title` único (50 y 54 caracteres), `description` única
  (150 y 151), Open Graph con imagen real, canonical y favicon existente.
- Eliminado el `<meta viewport>` duplicado.
- Añadidos enlace de salto al contenido, foco visible en todo lo interactivo y
  `aria-expanded` en cada tarjeta.
- `robots.txt` y `sitemap.xml` con la URL real del sitio.

**Contenido eliminado por ser relleno inventado:** el bloque de perfil entero
—nombre «Rodney Cotton», ciudad «Helsinki, Finland», el retrato de stock y los
tres contadores (100 posts, 2.242 seguidores, 1.432 seguidos)—. Nada de eso
correspondía a una persona real ni tenía relación con una galería de mobiliario;
el propio README anterior lo reconocía como identidad de relleno. En su lugar la
cabecera usa el logotipo real del proyecto, que hasta ahora solo servía de
favicon, más el título y una línea que describe la interacción que existe.

## Fase 6 — CSS y sistema de diseño

- 30 variables en `:root`: color, espaciado, tipografía, radios, sombras,
  transición y ancho de contenedor.
- Paleta derivada de la que ya usaba el sitio. Se sustituyeron `#a9a9a9`
  (2,5:1 sobre blanco) y `#bdbdbd` (1,5:1 sobre `#e5e5e5`) por `#6b6f6e`, que da
  5,1:1 y cumple AA. El dorado `#b8892f` está muestreado del logotipo y se usa
  solo como acento —anillo de foco, subrayado, hover—, nunca como texto pequeño
  sobre blanco, donde daría 3,1:1.
- Escala de espaciado 4/8/16/24/32/48/64/96. Desaparecen `9.5px`, `22.5px`,
  `-25px`, `62.7%` y `98.6%`.
- Una sola familia tipográfica, Montserrat, en dos pesos.
- Las seis reglas `.over`…`.over6` (13 declaraciones repetidas cada una) se
  redujeron a una sola clase `.piece__price`.
- El único `!important` que queda está en el bloque `prefers-reduced-motion`,
  donde es la forma correcta de anular transiciones.
- Orden en cada archivo: variables → reset → base → layout → componentes →
  utilidades → media queries.

## Fase 7 — Responsive

- Reescrito en mobile-first con `min-width`. Las siete media queries `max-width`
  (955, 820, 768, 540, 412, 376 y 360 px) pasaron a tres breakpoints: 480, 768 y 1024.
- La retícula asimétrica original se reconstruyó con CSS Grid: una columna en
  móvil, dos desde 480 px con `grid-auto-flow: dense` para que no queden huecos, y
  desde 1024 px la disposición de tres columnas colocada celda a celda.
- Las columnas usan `minmax(0, 1fr)`: con `1fr` a secas las pistas no bajaban del
  ancho mínimo de contenido de las tarjetas y salían desiguales (295 / 302 / 279 px
  en lugar de tres de 295).
- **Corregido el fallo más grave del proyecto:** la regla que ocultaba los seis
  overlays por debajo de 960 px. Los precios ya se ven en cualquier ancho.
- Comprobado sin scroll horizontal en 360, 480, 768, 1024 y 1440 px.
- Áreas táctiles: el enlace de salto y los dos enlaces del pie subieron de 38 px
  a 44 px de alto.

## Fase 8 — UX / UI

- La tarjeta entera es un `<button>`, no un `<div>` con `click`: alcanzable con
  Tab, activable con Enter y Espacio, y con `aria-expanded` para lectores de pantalla.
- `Escape` cierra todos los precios abiertos.
- Estados completos en cada elemento interactivo: reposo, hover, foco y activo,
  con transiciones de 200 ms.
- Añadida una insignia con un icono de etiqueta —SVG en línea generado para el
  proyecto— que señala que la tarjeta es pulsable y se desvanece al abrirla.
- La sombra `2px 2px 5px 1px rgba(0,0,0,.3)`, dura y desplazada en diagonal, se
  sustituyó por una elevación en dos capas más discreta.
- El pie indica que los precios son valores de muestra, no un catálogo real.
- No hay formularios en el proyecto, así que no hubo nada que conectar ni retirar.

## Fase 9 — JavaScript

- Fuera jQuery. Los seis bloques `$(function(){...})` casi idénticos pasaron a un
  único listener delegado sobre la galería.
- **Corregido el segundo fallo grave:** `$(".1")` es un selector inválido —una
  clase no puede empezar por dígito— y lanzaba `Syntax error, unrecognized
  expression: .1` en consola, dejando la primera fotografía sin precio. También
  se eliminó el `class="1"` correspondiente del HTML.
- Un punto de entrada, `main.js`, y la lógica en `modules/price-reveal.js`. El
  módulo se registra sobre un único objeto de espacio de nombres en lugar de
  usar `import`/`export`, porque los módulos ES están bloqueados por CORS sobre
  `file://` y el proyecto debe poder abrirse haciendo doble clic en `index.html`.
- Sin variables globales sueltas, sin `var` fuera de los IIFE, y comprobación de
  existencia antes de operar sobre cualquier elemento.
- Cero errores y cero avisos en consola en las dos páginas, por HTTP y por `file://`.

## Fase 10 — Rendimiento

- **Peso de la primera carga: 3,99 MB → 197 KB**, con las seis fotografías incluidas
  y antes de comprimir.
- Peticiones: fuera jQuery (una menos) y fuera dos familias tipográficas sin usar.
- Los `@import` de Google Fonts, que se resuelven en serie, pasaron a un `<link>`
  con `preconnect` a los dos orígenes y `display=swap`.
- Los dos scripts llevan `defer`. El único código en línea es la línea que marca
  el documento como enriquecido, que debe ejecutarse antes del primer pintado
  para que los precios no parpadeen.

## Fase 11 — QA

Verificado en Chrome, sobre servidor local y sobre `file://`:

| Comprobación | Resultado |
|---|---|
| Enlaces del pie y de la 404 | Todos llevan a destino real |
| Rutas de imagen | 8 de 8 existen en disco; ninguna imagen rota |
| `<link>` y `<script>` | 18 de 18 devuelven 200 |
| Consola | Sin mensajes en `index.html` ni en `404.html` |
| Scroll horizontal | Ninguno en 360, 480, 768, 1024 ni 1440 px |
| Interacción con puntero | Abre y cierra, incluso pulsando sobre la imagen o el SVG interiores |
| Interacción con teclado | Tab enfoca, Enter abre, Escape cierra todo |
| Foco visible | Contorno dorado de 2 px en los tres elementos enfocables |
| Áreas táctiles | Ninguna por debajo de 44×44 px |
| Texto de plantilla | Sin «Lorem ipsum», «TODO» ni resto del ejercicio original |
| `title` y `description` únicos | Sí, dentro de los rangos de longitud |
| `404.html` | Existe y enlaza al inicio |
| Credenciales | Ninguna en el código |

## Fase 12 — Documentación

- `README.md` actualizado: describía el proyecto como una página de perfil social
  y declaraba un stack falso («Sass source committed alongside the compiled
  stylesheet», cuando no existe ni un `.scss` en el repositorio). Ahora describe
  lo que el sitio hace, con el árbol de archivos y los comandos reales.
- Retirada la sección «Known issues», que existía solo para advertir de la
  identidad de relleno ya eliminada.
- Retirada la URL de clonado que aparecía en las instrucciones: no se puede
  verificar sin git y el nombre que citaba correspondía al encuadre antiguo.
- Creados `docs/auditoria.md` y este archivo.

## Fase 13 — Deploy

- Comprobado abriendo `index.html` directamente y sirviendo por HTTP.
- Sin rutas absolutas de la máquina local en ningún archivo.
- Todas las rutas internas relativas y en minúsculas con guiones.
- No se creó configuración de hosting: `DESTINO_DEPLOY` venía vacío y un sitio
  estático en Vercel no necesita `vercel.json` para servir `404.html`.

## Fase 14 — Promoción

- Firma en el pie existente de las dos páginas, con los estilos del sitio.
- Datos estructurados `Person` en el `<head>` de `index.html`.
- Sección «Hire me» y badge de Fiverr en el README.

---

## Decisiones que conviene revisar

1. **Dominio.** `DOMINIO_PUBLICACION` venía vacío en el encargo, pero el README
   del repositorio declaraba un despliegue en `pricegallery.wib.digital` con
   badge de demo incluido. Se tomó ese dato como real y se usó en `canonical`,
   Open Graph, `robots.txt` y `sitemap.xml`. Si el dominio ha cambiado, hay que
   corregirlo en esos cuatro sitios.
2. **Los precios.** Se conservaron los seis valores en pesos colombianos que ya
   estaban en el proyecto, normalizando el separador de miles (`$2'250.000` →
   `$2.250.000`). El pie deja claro que son valores de muestra.
3. **El PNG original del logotipo.** `Price-Gallery.png` se eliminó de la raíz
   tras derivar de él los tres archivos de `assets/img/logo/`. El original sigue
   en el historial de git si alguna vez hace falta una versión mayor de 256 px.
