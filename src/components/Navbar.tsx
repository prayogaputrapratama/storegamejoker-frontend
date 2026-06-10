'use client'

import { useState, useEffect } from 'react'

interface NavbarProps {
  cartCount: number
  onCartOpen: () => void
  onThemeToggle: () => void
  theme: string
}

export default function Navbar({ cartCount, onCartOpen, onThemeToggle, theme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '#services', label: 'Layanan' },
    { href: '#cara-order', label: 'Cara Order' },
    { href: '#testimoni', label: 'Testimoni' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <>
      <nav>
        <a href="#" className="nav-logo">STOREGAME JOKER</a>

        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {/* Theme toggle */}
          <button
            onClick={onThemeToggle}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border2)',
              color: 'var(--muted)',
              fontSize: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Cart button */}
          <button className="cart-btn" onClick={onCartOpen} aria-label="Keranjang">
            <span>🛒</span>
            <span>Keranjang</span>
            <span className={`cart-count ${cartCount > 0 ? 'has-items' : ''}`}>
              {cartCount}
            </span>
          </button>

          {/* Hamburger */}
          <button
            className={`hamburger ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map(l => (
          <a
            key={l.href}
            href={l.href}
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {l.label === 'Layanan' && '🛍️'}
            {l.label === 'Cara Order' && '📋'}
            {l.label === 'Testimoni' && '⭐'}
            {l.label === 'FAQ' && '❓'}
            {' '}{l.label}
          </a>
        ))}
        <a
          href="https://wa.me/62882009466583"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-nav-link mobile-nav-wa"
          onClick={() => setMobileOpen(false)}
        >
          💬 Chat WhatsApp
        </a>
      </div>
    </>
  )
}
