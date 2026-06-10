'use client'

import { useEffect, useRef } from 'react'
import type { Product } from '@/data/products'
import { buildWaLink } from '@/data/products'

interface CartItem {
  productKey: string
  productName: string
  variantName: string
  price: string
  emoji: string
}

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (item: CartItem) => void
  onToast: (msg: string) => void
}

export default function ProductModal({ product, onClose, onAddToCart, onToast }: ProductModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [product])

  if (!product) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleOrder = (variantName: string, price: string) => {
    const link = buildWaLink(product.name, variantName, price)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const handleCart = (variantName: string, price: string) => {
    onAddToCart({
      productKey: product.key,
      productName: product.name,
      variantName,
      price,
      emoji: product.emoji,
    })
    onToast(`✅ ${product.name} – ${variantName} ditambahkan ke keranjang!`)
  }

  return (
    <div
      ref={overlayRef}
      className={`modal-overlay ${product ? 'open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-emoji">{product.emoji}</span>
            <div>
              <div className="modal-product-name">{product.name}</div>
              <div className="modal-product-sub">{product.sub}</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Tutup">✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* TOS */}
          {product.tos && (
            <div style={{
              background: 'rgba(245,166,35,0.08)',
              border: '1px solid rgba(245,166,35,0.2)',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '16px',
              fontSize: '12px',
              color: 'var(--muted)',
              lineHeight: 1.6,
            }}>
              ⚠️ <strong style={{ color: 'var(--orange)' }}>Perhatian:</strong> {product.tos}
            </div>
          )}

          {/* Variants */}
          <div className="modal-section-label">Pilih Paket</div>
          <div className="variant-list">
            {product.variants.map((v, i) => (
              <div key={i} className="variant-card">
                <div className="variant-left">
                  <div className="variant-name">{v.name}</div>
                  {v.desc && (
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '3px', lineHeight: 1.5 }}>
                      {v.desc}
                    </div>
                  )}
                </div>
                <div className="variant-right">
                  <div>
                    {v.priceOld && <div className="item-price-old">{v.priceOld}</div>}
                    <div className="variant-price">
                      {v.price} <small>{v.per}</small>
                    </div>
                  </div>
                  <div className="variant-btns">
                    <button
                      className="variant-order"
                      style={{
                        background: 'rgba(34,199,122,0.08)',
                        border: '1px solid rgba(34,199,122,0.25)',
                        color: 'var(--green)',
                      }}
                      onClick={() => handleCart(v.name, v.price)}
                    >
                      🛒
                    </button>
                    <a
                      href={buildWaLink(product.name, v.name, v.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="variant-order"
                      onClick={() => handleOrder(v.name, v.price)}
                    >
                      Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info bawah */}
          <div style={{
            marginTop: '20px',
            padding: '14px',
            background: 'var(--surface)',
            borderRadius: '10px',
            fontSize: '12px',
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}>
            <div style={{ marginBottom: '6px', fontWeight: 700, color: 'var(--text)', fontSize: '13px' }}>
              📋 Informasi Pemesanan
            </div>
            <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Klik tombol <strong>Order</strong> untuk langsung chat WhatsApp</li>
              <li>Atau klik 🛒 untuk tambah ke keranjang lalu checkout sekaligus</li>
              <li>Konfirmasi pembayaran diterima dalam 1–15 menit</li>
              <li>Garansi penuh selama masa aktif berlaku</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
