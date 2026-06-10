'use client'

import { useState, useEffect, useRef } from 'react'
import type { Product } from '@/data/products'

interface SosmedModalProps {
  service: Product | null
  onClose: () => void
  onToast: (msg: string) => void
}

const WA_NUMBER = '62882009466583'

export default function SosmedModal({ service, onClose, onToast }: SosmedModalProps) {
  const [target, setTarget] = useState('')
  const [selectedVariant, setSelectedVariant] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden'
      setTarget('')
      setSelectedVariant(0)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [service])

  if (!service) return null

  const variants = service.variants || []
  const sections = service.sections || []
  const currentVariant = variants[selectedVariant]

  const handleOrder = () => {
    if (!target.trim()) {
      onToast('Isi target akun terlebih dahulu!')
      return
    }
    if (!currentVariant) {
      onToast('Pilih paket terlebih dahulu!')
      return
    }
    const label = service.targetLabel || 'Target'
    const msg = encodeURIComponent(
      `Halo Kak, saya mau order:\n\n📱 *${service.name}*\n📦 Paket: ${currentVariant.name}\n💰 Harga: ${currentVariant.price}\n${label}: ${target}\n\nMohon konfirmasi. Terima kasih! 🙏`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank')
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      className="modal-overlay active"
      onClick={handleOverlayClick}
      style={{ zIndex: 9999 }}
    >
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            {service.logoSrc ? (
              <img src={service.logoSrc} alt={service.name} className="modal-logo" />
            ) : (
              <span className="modal-emoji">{service.emoji}</span>
            )}
            <div>
              <div className="modal-title">{service.name}</div>
              <div className="modal-sub">{service.sub}</div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Target input */}
          <div className="modal-field">
            <label className="modal-label">
              {service.targetLabel || 'Target Akun'}
            </label>
            <input
              type="text"
              className="modal-input"
              placeholder={service.targetPlaceholder || 'Masukkan username/link'}
              value={target}
              onChange={e => setTarget(e.target.value)}
            />
            {service.hint && (
              <p className="modal-hint">{service.hint}</p>
            )}
          </div>

          {/* Sections / Variants */}
          {sections.length > 0 ? (
            sections.map((sec, si) => (
              <div key={si} className="modal-section">
                <div className="modal-section-title">{sec.title}</div>
                <div className="modal-variants-grid">
                  {sec.items.map((item, vi) => {
                    const globalIdx = variants.findIndex(v => v.name === item.name && v.price === item.price)
                    const isActive = selectedVariant === globalIdx
                    return (
                      <button
                        key={vi}
                        className={`modal-variant-btn ${isActive ? 'active' : ''}`}
                        onClick={() => globalIdx >= 0 && setSelectedVariant(globalIdx)}
                      >
                        <span className="variant-name">{item.name}</span>
                        <span className="variant-amount">{item.amount}</span>
                        <span className="variant-price">{item.price}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="modal-variants-grid">
              {variants.map((v, vi) => (
                <button
                  key={vi}
                  className={`modal-variant-btn ${selectedVariant === vi ? 'active' : ''}`}
                  onClick={() => setSelectedVariant(vi)}
                >
                  <span className="variant-name">{v.name}</span>
                  <span className="variant-price">{v.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {currentVariant && (
            <div className="modal-selected-price">
              Dipilih: <strong>{currentVariant.name}</strong> — <strong>{currentVariant.price}</strong>
            </div>
          )}
          <button
            className="btn-primary modal-order-btn"
            onClick={handleOrder}
            disabled={!target.trim() || !currentVariant}
          >
            💬 Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
