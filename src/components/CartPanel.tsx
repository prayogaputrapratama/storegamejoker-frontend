'use client'

import { WA } from '@/data/products'

export interface CartItem {
  id: string
  productKey: string
  productName: string
  variantName: string
  price: string
  emoji: string
}

interface CartPanelProps {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  onRemove: (id: string) => void
  onClear: () => void
}

function parsePrice(price: string): number {
  return parseInt(price.replace(/[^\d]/g, ''), 10) || 0
}

function formatRp(n: number): string {
  return 'Rp' + n.toLocaleString('id-ID')
}

export default function CartPanel({ isOpen, items, onClose, onRemove, onClear }: CartPanelProps) {
  const total = items.reduce((sum, i) => sum + parsePrice(i.price), 0)

  const handleCheckout = () => {
    if (items.length === 0) return
    const lines = items.map((item, i) =>
      `${i + 1}. *${item.productName}*\n   Paket: ${item.variantName}\n   Harga: ${item.price}`
    ).join('\n\n')
    const msg = encodeURIComponent(
      `Halo Kak, saya mau order beberapa item:\n\n${lines}\n\n💰 Total Estimasi: ${formatRp(total)}\n\nMohon konfirmasi stok & info pembayaran. Terima kasih! 🙏`
    )
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <span className="cart-title">🛒 KERANJANG</span>
          <button className="cart-header-close" onClick={onClose} aria-label="Tutup keranjang">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              <p>
                Keranjang masih kosong.<br />
                Tambahkan layanan yang kamu inginkan!
              </p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-emoji">{item.emoji}</span>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.productName}</div>
                  <div className="cart-item-variant">{item.variantName}</div>
                  <span className="cart-item-price">{item.price}</span>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemove(item.id)}
                  aria-label="Hapus item"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>{items.length} item</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total Estimasi</span>
              <span>{formatRp(total)}</span>
            </div>
            <button className="cart-checkout" onClick={handleCheckout}>
              💬 Checkout via WhatsApp
            </button>
            <button className="cart-clear" onClick={onClear}>
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </>
  )
}
