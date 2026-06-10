'use client'

import { useState, useMemo } from 'react'
import type { Product } from '@/data/products'
import { premiumProducts, sosmedProducts, topupProducts, ewalletProducts, digitalProducts } from '@/data/products'
import ProductModal from './ProductModal'
import SosmedModal from './SosmedModal'

interface CartItem {
  productKey: string
  productName: string
  variantName: string
  price: string
  emoji: string
}

interface ProductListProps {
  onAddToCart: (item: CartItem) => void
  onToast: (msg: string) => void
}

type TabKey = 'premium' | 'sosmed' | 'topup' | 'data' | 'ewallet' | 'digital'

export default function ProductList({ onAddToCart, onToast }: ProductListProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('premium')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSosmed, setSelectedSosmed] = useState<Product | null>(null)

  const categories: { key: TabKey; label: string; icon: string; count: string }[] = [
    { key: 'premium', label: 'Aplikasi Premium', icon: '💎', count: `${premiumProducts.length} layanan` },
    { key: 'sosmed', label: 'Suntik Sosmed', icon: '📣', count: `${sosmedProducts.length} layanan` },
    { key: 'topup', label: 'Top Up Game', icon: '🎮', count: `${topupProducts.length} layanan` },
    { key: 'data', label: 'Paket Data', icon: '📡', count: '5 layanan' },
    { key: 'ewallet', label: 'E-Wallet', icon: '💳', count: `${ewalletProducts.length} layanan` },
    { key: 'digital', label: 'Digital & Tools', icon: '🌐', count: `${digitalProducts.length} layanan` },
  ]

  const productMap: Record<TabKey, Product[]> = {
    premium: premiumProducts,
    sosmed: sosmedProducts,
    topup: topupProducts,
    data: [],
    ewallet: ewalletProducts,
    digital: digitalProducts,
  }

  const filtered = useMemo(() => {
    const list = productMap[activeTab] || []
    if (!search) return list
    const q = search.toLowerCase()
    return list.filter(p =>
      p.name.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q)
    )
  }, [activeTab, search])

  const isComingSoon = activeTab === 'data'

  return (
    <section id="services">
      <div className="services-header reveal">
        <div className="section-label">🛒 LAYANAN KAMI</div>
        <div className="section-title">SEMUA LAYANAN</div>
        <p className="section-desc">
          Pilih kategori layanan yang kamu butuhkan. Semua diproses cepat dengan garansi penuh.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="cat-tabs reveal">
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`cat-tab ${activeTab === cat.key ? 'active' : ''}`}
            onClick={() => { setActiveTab(cat.key); setSearch('') }}
          >
            <div className="cat-tab-icon">{cat.icon}</div>
            <div className="cat-tab-info">
              <span className="cat-tab-name">{cat.label}</span>
              <span className="cat-tab-count">{cat.count}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      {!isComingSoon && (
        <div className="cat-search-wrap reveal">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="cat-search"
            placeholder={`Cari layanan ${categories.find(c => c.key === activeTab)?.label.toLowerCase()}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Product Grid */}
      {isComingSoon ? (
        <div className="cat-panel active">
          <ComingSoon />
        </div>
      ) : filtered.length === 0 ? (
        <div className="cat-panel active">
          <EmptyState onReset={() => setSearch('')} />
        </div>
      ) : (
        <div className="cat-panel active">
          <div className="items-grid">
            {filtered.map(product => (
              <ProductCard
                key={product.key}
                product={product}
                onOpen={() => {
                  if (product.category === 'sosmed') {
                    setSelectedSosmed(product)
                  } else {
                    setSelectedProduct(product)
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
        onToast={onToast}
      />
      <SosmedModal
        service={selectedSosmed as any}
        onClose={() => setSelectedSosmed(null)}
        onToast={onToast}
      />
    </section>
  )
}

// ---- PRODUCT CARD ----
function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <div className="item-card">
      {product.badge && (
        <span className={`item-badge ${product.bdgClass || 'badge-bestseller'}`}>
          {product.badge}
        </span>
      )}
      <div className="item-top">
        {product.logoSrc ? (
          <img
            src={product.logoSrc}
            alt={product.name}
            className="item-logo"
            onError={e => {
              const t = e.currentTarget as HTMLImageElement
              t.style.display = 'none'
              const fb = t.nextElementSibling as HTMLElement
              if (fb) fb.style.display = 'flex'
            }}
          />
        ) : null}
        <span className="item-emoji" style={{ display: product.logoSrc ? 'none' : 'flex' }}>
          {product.emoji}
        </span>
        <div className="item-name">{product.name}</div>
      </div>
      <p className="item-desc">{product.sub}</p>
      <div className="item-footer">
        <div className="item-price-wrap">
          <div className="item-price">
            {product.startPrice || product.variants[0]?.price}
            <span> /mulai dari</span>
          </div>
        </div>
        <button className="item-order" onClick={onOpen}>Order</button>
      </div>
      <button className="item-view-btn" onClick={onOpen}>✦ Lihat Paket</button>
    </div>
  )
}

// ---- EMPTY STATE ----
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
      <p style={{ marginBottom: '16px' }}>Layanan tidak ditemukan.</p>
      <button onClick={onReset} className="btn-secondary">Reset Pencarian</button>
    </div>
  )
}

// ---- COMING SOON ----
function ComingSoon() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '28px', letterSpacing: '2px',
        color: 'var(--text)', marginBottom: '8px'
      }}>SEGERA HADIR</div>
      <p style={{ fontSize: '14px', marginBottom: '24px' }}>
        Kategori ini sedang dalam persiapan. Hubungi CS untuk info lebih lanjut.
      </p>
      <a
        href="https://wa.me/62882009466583"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{ display: 'inline-flex' }}
      >
        💬 Chat CS Sekarang
      </a>
    </div>
  )
}
