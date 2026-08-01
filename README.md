# Price Gallery

A six-piece interior gallery where selecting a photograph reveals its price.

[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)

[![Live demo](https://img.shields.io/badge/demo-pricegallery.wib.digital-2ea44f)](https://pricegallery.wib.digital)
![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)

## Description

A price is the one thing a catalogue photograph never shows, and the one thing
the viewer wants. Printing it under every image turns browsing into comparison
shopping; hiding it entirely wastes the visit. This page holds it one gesture
away — the photographs carry the page, and the price arrives only when it is
asked for.

Six interior pieces sit in an asymmetric grid: a wide photograph beside a
square one, a tall one holding the right-hand column across two rows. Selecting
any card slides a dark bar over the top edge of its photograph with the amount
in Colombian pesos. Selecting it again puts it away, and `Escape` clears
everything at once.

The whole card is a `<button>`, so the gesture is the same whether it comes
from a mouse, a thumb or the Tab key, and `aria-expanded` tells a screen reader
which prices are showing. Static, self-contained, no build step and no
dependencies.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html` |
| Styling | CSS custom properties and CSS Grid | `assets/css/` split into base, layout and components |
| Scripting | JavaScript, no framework | `assets/js/`, one entry point and one module |
| Images | WebP | Six gallery photographs plus the logo |
| Typography | Montserrat, served by Google Fonts | The only web font on the page |

## Project structure

```
.
├── index.html                       # The gallery
├── 404.html                         # Not-found page, links back to the gallery
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── base.css                 # Custom properties, reset, typography, utilities
│   │   ├── layout.css               # Page shell, header, gallery grid, footer
│   │   └── components.css           # Skip link, gallery card, link button
│   ├── js/
│   │   ├── main.js                  # Entry point
│   │   └── modules/
│   │       └── price-reveal.js      # Delegated price toggle
│   └── img/
│       ├── content/                 # The six gallery photographs
│       └── logo/                    # Logo, favicon and Open Graph image
└── docs/
    ├── auditoria.md                 # State of the project before this pass
    └── cambios.md                   # What changed, grouped by phase
```

## Running it locally

The page has no build step. Opening `index.html` straight from disk works —
the scripts are plain classic scripts rather than ES modules precisely so that
`file://` stays viable.

To serve it over HTTP instead, from the project root:

```bash
npx serve .
```

Or, without Node:

```bash
python -m http.server 4180
```

## Deployment

Deployed on Vercel at [pricegallery.wib.digital](https://pricegallery.wib.digital).
Static: upload the repository root as-is, with no build command and no output
directory. Vercel serves `404.html` for unmatched paths automatically, so no
routing configuration is needed.

## Credentials

The project uses none. There is no API, no form endpoint and no analytics, so
there is nothing to configure and no environment file to create.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
