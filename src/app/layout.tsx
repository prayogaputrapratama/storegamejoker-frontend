import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f5a623',
}

export const metadata: Metadata = {
  title: 'Storegame Joker — Jasa Sosmed & Layanan Premium',
  description: 'Storegame Joker — toko digital terpercaya sejak 2020. Top up game, aplikasi premium, sosmed boost, e-wallet. Harga terbaik, proses cepat, garansi penuh. 5.000+ pelanggan puas.',
  keywords: 'jasa sosmed, top up game, netflix murah, spotify premium, ml diamond, canva pro, youtube premium, instagram followers, storegame joker',
  openGraph: {
    type: 'website',
    title: 'Storegame Joker — Jasa Sosmed & Layanan Premium',
    description: 'Toko digital terpercaya sejak 2020. Harga terbaik, proses cepat, garansi penuh.',
    url: 'https://storegamejoker.my.id',
    siteName: 'Storegame Joker',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storegame Joker — Jasa Sosmed & Layanan Premium',
    description: 'Toko digital terpercaya sejak 2020.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  other: {
    'google-site-verification': 'KAupWxPxNfdnomNBE0aM_1wiJ1px7YY_VlFpK7XeO7Y',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Bebas+Neue&family=Rajdhani:wght@700&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var saved = localStorage.getItem('sgj_theme');
                if (saved === 'light' || saved === 'dark') {
                  document.documentElement.setAttribute('data-theme', saved);
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'Storegame Joker',
              description: 'Toko digital terpercaya sejak 2020. Top up game, aplikasi premium, sosmed boost.',
              url: 'https://storegamejoker.my.id',
              telephone: '+62882009466583',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ID',
              },
              priceRange: 'Rp1.000 - Rp200.000',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
