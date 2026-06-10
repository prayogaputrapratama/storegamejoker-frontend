'use client'

import { useState } from 'react'
import { faqItems } from '@/data/products'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq">
      <div style={{ textAlign: 'center', marginBottom: '0' }}>
        <div className="section-eyebrow reveal" style={{ justifyContent: 'center', display: 'flex' }}>
          ❓ FAQ
        </div>
        <div className="section-title reveal" style={{ textAlign: 'center' }}>PERTANYAAN UMUM</div>
        <p className="section-desc reveal" style={{ margin: '0 auto 0', textAlign: 'center' }}>
          Ada yang masih bingung? Cek jawaban di sini dulu.
        </p>
      </div>

      <div className="faq-list">
        {faqItems.map((item, i) => (
          <div
            key={i}
            className={`faq-item reveal ${openIndex === i ? 'open' : ''}`}
          >
            <div className="faq-q" onClick={() => toggle(i)}>
              <span className="faq-q-text">{item.q}</span>
              <span className="faq-arrow">▼</span>
            </div>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
