# Storegame Joker — Next.js 15

Website toko digital yang dimigrasi dari HTML statis ke Next.js 15 App Router + Tailwind CSS.

## Stack

- **Next.js 15** App Router
- **TypeScript**
- **Tailwind CSS 3**
- **CSS Variables** untuk theming dark/light

## Struktur Folder

```
src/
├── app/
│   ├── layout.tsx       # Root layout, SEO metadata, font loading
│   ├── page.tsx         # Main page, state management
│   └── globals.css      # Semua CSS custom + CSS variables
├── components/
│   ├── Navbar.tsx       # Nav + mobile hamburger + theme toggle
│   ├── Hero.tsx         # Hero section + promo banner + trust bar
│   ├── ProductList.tsx  # Category tabs + search + product cards
│   ├── ProductModal.tsx # Modal detail produk premium
│   ├── SosmedModal.tsx  # Modal sosmed dengan kalkulator harga
│   ├── CartPanel.tsx    # Slide-in cart panel
│   ├── HowToOrder.tsx   # 3-step cara order
│   ├── Testimonials.tsx # Review + rating summary
│   ├── FAQ.tsx          # Accordion FAQ
│   ├── CTABanner.tsx    # Call to action banner
│   ├── Footer.tsx       # Footer dengan links
│   ├── WAFloat.tsx      # WhatsApp floating button + popup
│   └── Toast.tsx        # Toast notification
├── data/
│   └── products.ts      # Semua data produk, harga, deskripsi
└── lib/
    └── useReveal.ts     # Hook untuk scroll reveal animation
```

## Setup & Run

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build production
npm run build

# Start production
npm start
```

## Deploy ke Vercel

1. Push ke GitHub
2. Connect repo di [vercel.com](https://vercel.com)
3. Deploy otomatis — tidak perlu konfigurasi tambahan

## Kustomisasi

- **Produk & Harga:** Edit `src/data/products.ts`
- **Nomor WA:** Ubah `WA` di `src/data/products.ts`
- **Warna/Theme:** Edit CSS variables di `src/app/globals.css`
- **SEO:** Edit metadata di `src/app/layout.tsx`
