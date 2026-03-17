<p align="center">
  <img src="public/images/logo.svg" width="220" alt="AfriSIM Logo">
</p>

<h1 align="center">AfriSIM — Travel eSIM Platform for Africa</h1>

<p align="center">
  <strong>Instant mobile data for travelers exploring Africa.</strong><br>
  Purchase a plan. Scan a QR code. Connect on arrival.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white" alt="Laravel 12">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Inertia.js-2.0-7C3AED?style=flat-square" alt="Inertia.js">
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS 4">
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/Stripe-Ready-635BFF?style=flat-square&logo=stripe&logoColor=white" alt="Stripe">
</p>

---

## The Mission

Millions of travelers visit Africa every year — for safari, business, culture, and connection. Yet one of the most basic needs, reliable mobile internet upon arrival, remains surprisingly painful. Airport SIM kiosks are overpriced, carrier roaming charges are predatory, and finding a local prepaid card while jet-lagged in a new city is nobody's idea of a good time.

**AfriSIM exists to eliminate that friction entirely.**

The platform lets a traveler sitting in London, New York, or Tokyo browse data plans for their African destination, purchase one in under 60 seconds, and receive an eSIM QR code instantly via email and on-screen. When they land in Nairobi, Dar es Salaam, or Cape Town, they scan the code, and they are online — no physical SIM swap, no language barrier at a kiosk, no downtime.

## Client Vision

The client is building a startup focused exclusively on the African travel connectivity market — a segment that major global eSIM providers treat as an afterthought. The vision is clear:

- **Africa-first coverage** — not a global platform where African countries are buried on page 5, but a purpose-built product where every destination, every plan, and every UI decision is tuned for the Africa-bound traveler.
- **Dead-simple UX** — a non-technical traveler should be able to go from landing page to working internet in under 3 minutes.
- **Automated everything** — zero manual intervention between payment and eSIM delivery. The system generates QR codes, sends emails, and updates status automatically.
- **Scalable foundation** — what starts with 10 countries should comfortably grow to 54 without re-architecture.

The target countries at launch: **Uganda, Kenya, Tanzania, South Africa, Rwanda, Nigeria, Ghana, Ethiopia, Egypt, and Morocco** — covering East, West, Southern, and North Africa.

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        Browser                           │
│  React 19 + Inertia.js + TailwindCSS 4 + Alpine.js      │
└────────────────────────┬─────────────────────────────────┘
                         │  Inertia Protocol (XHR + JSON)
                         │
┌────────────────────────▼─────────────────────────────────┐
│                   Laravel 12 Backend                     │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Inertia    │  │  Livewire    │  │  Admin Panel   │  │
│  │  Controllers│  │  Components  │  │  (CRUD)        │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬────────┘  │
│         │                │                   │           │
│  ┌──────▼────────────────▼───────────────────▼────────┐  │
│  │              Eloquent ORM + Models                 │  │
│  │  User  Country  Plan  Order  OrderItem  Esim       │  │
│  └──────────────────────┬─────────────────────────────┘  │
│                         │                                │
│  ┌──────────────────────▼─────────────────────────────┐  │
│  │  Services: QR Generation | Stripe | Mail Delivery  │  │
│  └────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │   SQLite Database   │
              │   (Zero-config)     │
              └─────────────────────┘
```

### Why This Stack

| Decision | Reasoning |
|---|---|
| **Laravel 12 + Inertia + React** | Server-driven routing with SPA-grade interactivity. No API layer to maintain — controllers return Inertia responses that hydrate React components directly. |
| **TailwindCSS 4** | Utility-first CSS with zero custom stylesheet overhead. Every component is self-contained. |
| **Alpine.js** | Lightweight interactivity for server-rendered partials (dropdowns, modals, tabs) without pulling them into the React tree. |
| **Livewire** | Real-time admin panel interactions where full React components would be over-engineering. |
| **SQLite** | Zero-config database that ships with the codebase. No external DB server to provision. Migrates to PostgreSQL/MySQL with a single `.env` change when traffic demands it. |
| **SimpleSoftwareIO QR** | Server-side SVG QR code generation — no client-side rendering, no canvas, no external API calls. The QR code is generated once at checkout and stored as SVG data. |

### Data Model

```
Users ─────┐
           │ 1:N
           ▼
        Orders ─────┐
           │ 1:N    │
           ▼        │
      OrderItems    │
        │    │      │
    N:1 │    │ 1:1  │
        ▼    ▼      │
     Plans  Esims ◄─┘ (also linked directly to Users)
        │
    N:1 │
        ▼
    Countries
```

Each **Country** has multiple **Plans** (Light, Standard, Premium, Unlimited). Each **Order** contains **OrderItems**, and each item spawns an **Esim** record with a unique ICCID, activation code, and SVG QR code.

---

## Critical Challenges & Solutions

### 1. PHP SQLite Extension Not Available on the Server

**Problem:** The production server had PHP 8.3 installed but the `pdo_sqlite` and `sqlite3` extensions were not enabled, and we had no `sudo` access to install system packages.

**Solution:** Discovered pre-compiled `.so` extension files on the server at `/home/deploy/.php-ext/`. Created a custom PHP INI scan directory (`~/.php-conf/sqlite.ini`) that loads these extensions at runtime via `PHP_INI_SCAN_DIR`. This approach requires zero system-level changes and persists across sessions via `.bashrc`.

```bash
export PHP_INI_SCAN_DIR=":/home/deploy/.php-conf"
```

### 2. QR Code Rendering — From Fake Grids to Real Scannable Codes

**Problem:** Early iterations used a CSS grid pattern as a visual placeholder for QR codes — both on the landing page phone mockup and in the eSIM details pages. These were purely decorative and not scannable.

**Solution:** Integrated `simplesoftwareio/simple-qrcode` for server-side SVG generation. Every eSIM gets a real, scannable QR code generated from its unique LPA activation code at the moment of purchase. The SVG is stored directly in the database (`qr_code_data` column) — no filesystem dependencies, no external API calls, no broken image links. On the frontend, SVGs are injected via `dangerouslySetInnerHTML` with Tailwind utility selectors (`[&_svg]:w-full [&_svg]:h-full`) to ensure proper sizing across all viewports.

### 3. QR Code Overflow and Clipping in Order Details

**Problem:** The QR code SVG in the order details page overflowed its container and was visually clipped — the bottom and right edges were cut off on most screen sizes.

**Solution:** Replaced the fixed `h-32 w-32` container with a flex-based layout. The QR code now sits in a `shrink-0` wrapper with explicit dimensions (`w-40 h-40`), a white background card with padding and border, and SVG dimension selectors that force the vector to fill its container exactly. The parent layout switched from `grid` to `flex-col / flex-row` responsive flow to prevent squeeze.

### 4. Ziggy Route Resolution Failures

**Problem:** The React frontend threw `Ziggy error: route 'plans.index' is not in the route list` because components referenced route names that didn't exist in `routes/web.php`.

**Solution:** Audited every `route()` call across all JSX files against the actual Laravel route definitions. Corrected route names to match the registered routes (`countries.index` for browsing, `plans.show` for individual plans, `checkout.create` for purchase flow).

### 5. Price Display Showing $NaN

**Problem:** The order detail page displayed `$NaN` for item prices because the React component referenced `item.price`, but the database column is `unit_price`.

**Solution:** Updated the frontend to use `item.unit_price || item.total_price || 0` with a `parseFloat().toFixed(2)` fallback chain, ensuring graceful degradation even if the data shape changes.

### 6. Responsive Design Across All Breakpoints

**Problem:** Several pages (eSIM list, plan cards, order details) were designed desktop-first and broke on mobile — plan cards wrapped inconsistently, QR codes overflowed, and the eSIM management page was unusable on small screens.

**Solution:** Rebuilt layouts using Tailwind's responsive utilities. Plan cards use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` to show all plans in one row on desktop while stacking gracefully on mobile. The eSIM page uses `flex-col sm:flex-row` patterns. Every card uses `flex flex-col` with `mt-auto` on the price/button section to ensure consistent button alignment regardless of content height.

### 7. Authentication Pages and Default Branding

**Problem:** Login, register, and dashboard pages shipped with Laravel Breeze defaults — the Laravel logo, generic styling, and a bland layout that didn't match the AfriSIM brand.

**Solution:** Built a custom `ApplicationLogo` component rendering the AfriSIM SVG mark. Redesigned auth pages with a split-layout (brand panel + form panel), gradient backgrounds using the AfriSIM green palette, and contextual messaging ("Stay Connected Across Africa"). The dashboard was rebuilt with stat cards, quick actions, and a recent orders feed — replacing the empty Breeze placeholder.

---

## Features Beyond Similar Platforms

| Feature | AfriSIM | Typical eSIM Platforms |
|---|---|---|
| **Africa-first catalog** | Every country, plan, and UI element is designed for Africa-bound travelers | Africa is one tab among dozens of regions |
| **Instant SVG QR codes** | Generated server-side at checkout, stored as data — no external dependencies | Often rely on third-party QR APIs or client-side canvas rendering |
| **Zero-config database** | SQLite ships with the app — `git clone` and run | Requires provisioning MySQL/PostgreSQL before first boot |
| **Dual-role system** | Single codebase serves customers and admins with middleware-based routing | Often separate admin apps or heavyweight packages like Nova |
| **Avatar uploads** | Profile page supports custom avatar with preview and upload | Typically only name/email fields |
| **Email delivery pipeline** | Order confirmation + separate eSIM delivery email with QR code attachment | Usually a single generic receipt |
| **Plan comparison grid** | Cards with consistent button alignment and feature lists for easy comparison | Often plain list views |

---

## Scalability Path

The current architecture is deliberately simple — SQLite, single-server, no queue workers required — because the launch market is 10 countries with modest initial traffic. But every decision was made with the growth path in mind:

**Database:** SQLite handles reads excellently and writes adequately for early-stage traffic. When concurrent writes become a bottleneck, change `DB_CONNECTION=sqlite` to `DB_CONNECTION=pgsql` in `.env` — all migrations use standard SQL. Zero code changes.

**eSIM Provider Integration:** The `CheckoutController` currently generates simulated eSIM credentials. The generation logic is isolated in a single method — swap it with an API call to eSIM Go, 1GLOBAL, or Gigs and the rest of the system (QR generation, email delivery, status tracking) continues unchanged.

**Payment Processing:** Stripe integration is architecturally in place (payment_intent_id field, Stripe PHP SDK installed). The current flow simulates payment for development. Enabling real charges requires adding the Stripe PaymentIntent creation call — the order/item/eSIM pipeline doesn't change.

**Multi-region Plans:** The data model already supports regional eSIMs. A single plan can reference multiple countries via a pivot table addition, enabling "East Africa 5GB" or "Pan-Africa Unlimited" bundles.

**Queue Workers:** Email sending is wrapped in try/catch to avoid blocking checkout. When volume grows, swap `Mail::send()` for `Mail::queue()` and start a Laravel queue worker — the Mailable classes are already built.

---

## Quick Start

```bash
# Clone and enter the project
cd esim-platform

# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database (SQLite — zero config)
touch database/database.sqlite
php artisan migrate --seed

# Build frontend assets
npm run build

# Start the development server
php artisan serve --port=9000
```

**Default accounts after seeding:**

| Role | Email | Password |
|---|---|---|
| Admin | `admin@afrisim.com` | `password` |
| Customer | `demo@afrisim.com` | `password` |

---

## Project Structure

```
esim-platform/
├── app/
│   ├── Http/Controllers/
│   │   ├── Admin/              # Admin CRUD (dashboard, orders, plans, users)
│   │   ├── Auth/               # Breeze authentication controllers
│   │   ├── CheckoutController  # Purchase flow + eSIM generation
│   │   ├── CountryController   # Country browsing + plan listings
│   │   ├── DashboardController # Customer dashboard + stats
│   │   ├── HomeController      # Landing page data assembly
│   │   └── PlanController      # Individual plan details
│   ├── Mail/
│   │   ├── OrderConfirmation   # Post-purchase receipt
│   │   └── EsimDelivery        # QR code delivery email
│   ├── Models/                 # User, Country, Plan, Order, OrderItem, Esim
│   └── Http/Middleware/
│       ├── AdminMiddleware     # Role-based admin gate
│       └── HandleInertiaRequests
├── resources/js/
│   ├── Components/             # Reusable React components (Logo, Modal, etc.)
│   ├── Layouts/
│   │   ├── MainLayout          # Public pages (header + footer)
│   │   ├── AuthenticatedLayout # Customer dashboard shell
│   │   ├── AdminLayout         # Admin panel shell
│   │   └── GuestLayout         # Auth pages (login, register)
│   └── Pages/
│       ├── Home                # Landing page
│       ├── Countries/          # Country grid + plan listings
│       ├── Plans/              # Plan detail view
│       ├── Checkout/           # Purchase form + confirmation
│       ├── Dashboard/          # Customer orders, eSIMs
│       ├── Admin/              # Admin dashboard, CRUD pages
│       ├── Auth/               # Login, register, password reset
│       └── Profile/            # Account settings + avatar
└── database/
    ├── migrations/             # 8 migration files
    └── seeders/                # 10 countries, 40 plans, 2 users
```

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Backend Framework | Laravel 12 |
| Frontend Framework | React 19 via Inertia.js 2.0 |
| CSS Framework | TailwindCSS 4 |
| Lightweight Interactivity | Alpine.js 3 |
| Real-time Components | Livewire 4 |
| Database | SQLite 3 |
| Authentication | Laravel Breeze |
| QR Code Generation | SimpleSoftwareIO QrCode (SVG) |
| Payment Processing | Stripe PHP SDK |
| Routing (Client) | Ziggy |
| Build Tool | Vite 7 |

---

<p align="center">
  <sub>Built for travelers. Engineered for Africa.</sub>
</p>
