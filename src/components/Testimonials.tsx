'use client'

import { useState } from 'react'

const TESTIMONIALS = [
  { name: 'Rafi A.', loc: 'Jakarta', service: 'Netflix Premium', text: 'Proses cepat banget, gak sampe 10 menit akun langsung aktif. Harga paling murah se-Indonesia kayaknya 😂 Recommended!', stars: 5, verified: true },
  { name: 'Siti N.', loc: 'Surabaya', service: 'Spotify Premium', text: 'Udah 6 bulan langganan Spotify dari sini, gak pernah ada masalah. Harga stabil, CS responsif. Puas banget!', stars: 5, verified: true },
  { name: 'Budi S.', loc: 'Bandung', service: 'YouTube Premium', text: 'Sempat ragu awalnya, tapi ternyata legit. Langsung aktif dan YouTube Music juga bisa. Worth it!', stars: 5, verified: true },
  { name: 'Dewi R.', loc: 'Medan', service: 'Canva Pro', text: 'Canva Pro-nya beneran unlock semua fitur. Template premium dan font eksklusif bisa dipakai. Makasih!', stars: 5, verified: true },
  { name: 'Andi P.', loc: 'Yogyakarta', service: 'Instagram Followers', text: 'Followers IG nambah signifikan dalam sehari. Kualitas bagus, gak ada drop. Bakal order lagi!', stars: 4, verified: true },
  { name: 'Lina M.', loc: 'Semarang', service: 'CapCut Pro', text: 'Semua fitur Pro CapCut bisa dipakai, template premium, efek eksklusif. Harga gak masuk akal murahnya!', stars: 5, verified: true },
]

const RATING_BARS = [
  { label: '5 ⭐', width: '88%' },
  { label: '4 ⭐', width: '9%' },
  { label: '3 ⭐', width: '2%' },
  { label: '2 ⭐', width: '1%' },
  { label: '1 ⭐', width: '0%' },
]

export default function Testimonials() {
  const [filter, setFilter] = useState('semua')

  const filters = [
    { key: 'semua', label: 'Semua' },
    { key: 'premium', label: '💎 Premium' },
    { key: 'sosmed', label: '📱 Sosmed' },
  ]

  const filtered = filter === 'semua'
    ? TESTIMONIALS
    : filter === 'premium'
    ? TESTIMONIALS.filter(t => !['Instagram Followers', 'TikTok Followers'].includes(t.service))
    : TESTIMONIALS.filter(t => ['Instagram Followers', 'TikTok Followers'].includes(t.service))

  return (
    <section id="testimoni" style={{ background: 'var(--surface)' }}>
      <div className="section-eyebrow reveal">⭐ Testimoni</div>
      <div className="section-title reveal">APA KATA MEREKA</div>
      <p className="section-desc reveal">
        Ribuan pelanggan puas sejak 2020. Ini cerita mereka.
      </p>

      {/* Rating summary */}
      <div className="testi-rating-summary reveal">
        <div className="testi-overall-score">
          <div className="testi-big-score">4.9</div>
          <div className="testi-big-stars">★★★★★</div>
          <div className="testi-big-label">Rata-rata Rating</div>
        </div>

        <div className="testi-bars">
          {RATING_BARS.map(b => (
            <div key={b.label} className="testi-bar-row">
              <span style={{ width: '32px', flexShrink: 0 }}>{b.label}</span>
              <div className="testi-bar-wrap">
                <div className="testi-bar-fill" style={{ width: b.width }} />
              </div>
              <span style={{ width: '32px', textAlign: 'right', flexShrink: 0 }}>{b.width}</span>
            </div>
          ))}
        </div>

        <div className="testi-summary-stats">
          <div className="testi-sum-stat">
            <div className="testi-sum-num">5K+</div>
            <div className="testi-sum-label">Pelanggan</div>
          </div>
          <div className="testi-sum-stat">
            <div className="testi-sum-num">10K+</div>
            <div className="testi-sum-label">Transaksi</div>
          </div>
          <div className="testi-sum-stat">
            <div className="testi-sum-num">99%</div>
            <div className="testi-sum-label">Kepuasan</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="testi-filters reveal">
        {filters.map(f => (
          <button
            key={f.key}
            className={`testi-filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="testi-grid reveal">
        {filtered.map((t, i) => (
          <div key={i} className="testi-card">
            <div className="testi-card-top">
              <div className="testi-stars">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
              {t.verified && <span className="testi-verified">✓ Verified</span>}
            </div>
            <div className="testi-service-tag">{t.service}</div>
            <p className="testi-text">"{t.text}"</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.name.charAt(0)}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-loc">{t.loc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
