# Auditoría inicial — Price-Gallery

Fecha de la auditoría: 2026-07-31
Estado del proyecto en el momento de auditar: sitio estático de una sola página, sin build, sin dependencias npm.

---

## 1. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real |
|---|---|---|---|
| `index.html` | `Gallery` | `Rodney Cotton` | Galería de 6 fotos de interiorismo. Al hacer clic sobre una foto se revela una barra con su precio en COP. Encima de la galería hay un bloque de perfil social (retrato, nombre, ciudad y tres contadores). |

No existía `404.html`.

## 2. Hojas de estilo

| Archivo | Líneas | ¿Se carga? | Observaciones |
|---|---|---|---|
| `CSS/normalize.css` | 357 | Sí | normalize.css v8.0.1 íntegro y sin modificar. |
| `CSS/styles.css` | 638 | Sí | Estilos del proyecto. Ver problemas abajo. |
| `CSS/fonts.css` | 7 | Sí | Dos `@import` a Google Fonts, uno de ellos redundante. |

## 3. JavaScript

| Archivo | Líneas | ¿Se carga? | Observaciones |
|---|---|---|---|
| `JS/script.js` | 50 (6 útiles) | Sí | Seis bloques `$(function(){...})` casi idénticos, uno por foto. Cargado en `<head>` sin `defer`. |

## 4. Imágenes

| Archivo | Peso | Dimensiones | Formato | ¿Referenciada? | Contenido real |
|---|---|---|---|---|---|
| `IMG/photo1.png` | 491,7 KB | 600×598 | PNG RGBA | Sí | Mesa auxiliar redonda blanca con jarrón dorado, junto a un sofá y una planta |
| `IMG/photo2.png` | 189,2 KB | 1258×598 | PNG RGBA | Sí | Sofá de tres plazas gris oscuro con mesa de centro ovalada |
| `IMG/photo3.png` | 1223,9 KB | 1254×598 | PNG RGBA | Sí | Bañera exenta de piedra en un baño exterior |
| `IMG/photo4.png` | 248,5 KB | 297×630 | PNG RGBA | Sí | Lámpara de pie negra sobre pared verde salvia |
| `IMG/photo5.png` | 354,5 KB | 598×596 | PNG RGBA | Sí | Ficus elastica (planta de caucho) sobre fondo claro |
| `IMG/photo6.png` | 515,9 KB | 598×598 | PNG RGBA | Sí | Banco bajo de madera maciza con cojines de suelo de fibra trenzada |
| `IMG/profilePhoto.png` | 493,9 KB | 624×624 | PNG RGBA | Sí | Retrato de estudio de un hombre — foto de stock sin relación con el proyecto |
| `Price-Gallery.png` | 465,5 KB | 1024×1024 | PNG RGBA | Sí (favicon) | Logotipo circular real del proyecto: aro negro y dorado con el texto «PRICE-GALLERY» |

**Peso total de imágenes: 3983,1 KB (≈ 3,9 MB).** Todas en PNG con canal alfa que ninguna necesita.

## 5. Dependencias externas

| Recurso | Origen | Uso real |
|---|---|---|
| jQuery slim 3.0.0-beta1 | cdnjs | Solo `$(selector)`, `.click()` y `.toggleClass()` |
| Montserrat | Google Fonts | Sí, es la tipografía de todo el sitio |
| Playfair Display | Google Fonts | No. Se descarga y nunca se aplica en ninguna regla |
| Playfair Display SC | Google Fonts | No. Se descarga y nunca se aplica en ninguna regla |

Se cargaba una **versión beta** de jQuery (`3.0.0-beta1`, publicada en 2016) en producción.

## 6. Archivos basura

| Archivo | Motivo |
|---|---|
| `MD/heade.md` | Fragmento suelto del `<head>` guardado como nota de trabajo. Además apunta a `IMG/icon.png`, que no existe. |

No había `node_modules`, `.DS_Store`, `Thumbs.db`, `.bak` ni copias numeradas.

---

## 7. Problemas detectados

### Rotos

| Problema | Ubicación | Detalle |
|---|---|---|
| Referencia a imagen inexistente | `MD/heade.md:5` | `href="IMG/icon.png"` — el archivo no existe en el repositorio |
| Selector CSS inválido | `JS/script.js:2` | `$(".1")` — un selector de clase no puede empezar por dígito. jQuery lanza `Syntax error, unrecognized expression: .1` en consola y el precio de la primera foto nunca se muestra |
| Clase HTML inválida | `index.html:43` | `<div class="1">` — el atributo existe pero es inalcanzable desde CSS/JS sin escapado |

No había enlaces `href` rotos porque el sitio no tenía ni un solo enlace.

### Funcionales

| Problema | Detalle |
|---|---|
| La función principal no existe en móvil | `styles.css:614` oculta con `display:none` los seis overlays por debajo de 960px. En móvil y tablet los precios son inalcanzables: la galería queda muda |
| Overlays sin ancestro posicionado | Los `.over*` usan `position:absolute` sin `top`/`left` y sin ningún ancestro con `position:relative`. Se sitúan en su posición estática por casualidad |
| Sin foco ni teclado | La interacción vive en `<div>` con `click`. No es alcanzable con Tab ni activable con Enter |
| Sin estado accesible | Nada comunica a un lector de pantalla que el precio se ha revelado |

### Estructura y semántica

| Problema | Detalle |
|---|---|
| `<meta viewport>` duplicado | `index.html:5-6`, línea idéntica repetida |
| Sin landmarks | Ni `<header>`, ni `<main>`, ni `<footer>`, ni `<section>`. Todo son `<div>` |
| Jerarquía de encabezados incorrecta | `<h2>` usado para una ciudad y `<h3>` para cifras; ningún encabezado describe la galería |
| Maquetación con `<br>` | `<body><br><br>` para separar del borde superior |
| `alt` vacío en las 6 fotos de producto | Son imágenes de contenido, no decorativas |
| Sin `width`/`height` en ningún `<img>` | Layout shift garantizado en la carga |
| Sin `<meta name="description">`, sin Open Graph, sin canonical | Nada de SEO |
| Sin `robots.txt` ni `sitemap.xml` | — |

### CSS

| Problema | Detalle |
|---|---|
| Bloque duplicado literal | `styles.css:106-143` y `styles.css:149-186` definen `.section1`, `.cont-section-1` y sus hijos dos veces con el mismo contenido |
| Seis reglas casi idénticas | `.over`, `.over2` … `.over6` repiten 13 declaraciones cada una; solo cambia `max-width` |
| Regla vacía | `.main{}` en la línea 103 |
| Números mágicos | `margin: -25px 0px 0px 9.5px`, `22.5px`, `-5px`, `width: 62.7%`, `98.6%`, `width: 99%` en todos los contenedores |
| Siete media queries `max-width` | 955, 820, 768, 540, 412, 376 y 360px, casi todas repitiendo las mismas declaraciones con variaciones de un 2% |
| Cero variables CSS | Cada color, radio y sombra escritos a mano en cada regla |
| Contraste insuficiente | `#A9A9A9` sobre blanco ≈ 2,5:1 y `#BDBDBD` sobre `#E5E5E5` ≈ 1,5:1. El mínimo AA es 4,5:1 |

### Contenido

| Problema | Detalle |
|---|---|
| Identidad inventada | «Rodney Cotton», «Helsinki, Finland» y el retrato de stock no corresponden a ninguna persona real ni al contenido de la galería (mobiliario e interiorismo) |
| Cifras inventadas | «100 posts», «2.242 seguidores», «1.432 seguidos» son números de relleno del ejercicio original |
| El `<title>` no describe el sitio | `Gallery`, siete caracteres, sin marca |

### Documentación

| Problema | Detalle |
|---|---|
| El README describía otro proyecto | Lo presentaba como «social profile page» cuando es una galería de precios de mobiliario |
| El README declaraba stack falso | «Sass source committed alongside the compiled stylesheet» — no existe ni un `.scss` en el repositorio |
| El README asumía la identidad falsa | Documentaba a Rodney Cotton como contenido del proyecto en lugar de señalarlo como relleno a eliminar |

---

## 8. Resumen en cinco líneas

1. **Qué es**: una página estática única que muestra seis fotografías de mobiliario e interiorismo en una retícula asimétrica; al pulsar cada pieza aparece su precio en pesos colombianos.
2. **Estado**: funciona en escritorio y el diseño visual es sobrio y correcto, pero por debajo son 638 líneas de CSS con bloques duplicados literalmente, siete media queries `max-width` solapadas y márgenes de ajuste fino como `9.5px`.
3. **Lo más grave**: la razón de ser del sitio está apagada en móvil — una media query esconde los seis overlays por debajo de 960px, así que en teléfono la galería no muestra ni un precio.
4. **Segundo más grave**: `$(".1")` es un selector inválido que revienta en consola y deja la primera foto sin precio también en escritorio; y todo el mecanismo vive en `<div>` sin foco ni soporte de teclado.
5. **Contenido**: el bloque de perfil (nombre, ciudad, retrato de stock y tres contadores de seguidores) es relleno inventado del ejercicio original y no tiene relación con una galería de mobiliario; el proyecto sí tiene, en cambio, un logotipo propio real sin usar más allá del favicon.
