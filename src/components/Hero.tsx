'use client'

import { useEffect, useState } from 'react'
import { premiumProducts, sosmedServices } from '@/data/products'

export default function Hero() {
  const [servicesCount, setServicesCount] = useState(0)

  useEffect(() => {
    const total = premiumProducts.length + sosmedServices.length
    setServicesCount(total)
  }, [])

  return (
    <>
      {/* Promo Banner */}
      <PromoBanner />

      <section className="hero" style={{ paddingTop: 'calc(64px + 40px + 40px)' }}>
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '12px' }}>
            ✅ Trusted Since 2020
          </div>

          <h1>
            SEMUA<br />
            <span>LAYANAN</span><br />
            DIGITAL
          </h1>

          <p className="hero-sub">
            Aplikasi premium, top up game, sosmed boost, e-wallet — semua tersedia dengan harga terbaik & garansi penuh.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#services" className="btn-primary">
              🛍️ Lihat Layanan
            </a>
            <a
              href="https://wa.me/62882009466583"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              💬 Chat Kami
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <span className="stat-num">5.000+</span>
              <span className="stat-label">Pelanggan Puas</span>
            </div>
            <div>
              <span className="stat-num">90+</span>
              <span className="stat-label">Jenis Layanan</span>
            </div>
            <div>
              <span className="stat-num">4.9★</span>
              <span className="stat-label">Rating Kepuasan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="trust-item"><span>✅</span> Terpercaya Sejak 2020</div>
        <div className="trust-item"><span>⚡</span> Proses &lt;1 Jam</div>
        <div className="trust-item"><span>🛡️</span> Garansi Penuh</div>
        <div className="trust-item"><span>💬</span> CS Aktif 24/7</div>
        <div className="trust-item"><span>💰</span> Harga Terbaik</div>
        <div className="trust-item"><span>🔒</span> Transaksi Aman</div>
      </div>
    </>
  )
}

function PromoBanner() {
  const [visible, setVisible] = useState(true)

  const PROMO_CODE = 'JOKER10'

  if (!visible) return null

  return (
    <div className="promo-banner">
      <span className="promo-tag">🔥 PROMO</span>
      <span>
        Diskon spesial! Gunakan kode&nbsp;
        <a
          href={`https://wa.me/62882009466583?text=${encodeURIComponent('Halo, saya mau order dengan kode promo ' + PROMO_CODE)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {PROMO_CODE}
        </a>
        &nbsp;di WhatsApp untuk hemat lebih banyak!
      </span>
      <button
        className="promo-close"
        onClick={() => setVisible(false)}
        aria-label="Tutup promo"
      >
        ✕
      </button>
    </div>
  )
}
