'use client'

import { useState, useCallback, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProductList from '@/components/ProductList'
import HowToOrder from '@/components/HowToOrder'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'
import CartPanel, { type CartItem } from '@/components/CartPanel'
import WAFloat from '@/components/WAFloat'
import Toast from '@/components/Toast'
import { useReveal } from '@/lib/useReveal'

export default function Home() {
  const [theme, setTheme] = useState('dark')
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [toast, setToast] = useState({ visible: false, message: '' })

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sgj_theme')
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  // Reveal scroll animation
  useReveal()

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('sgj_theme', next)
  }, [theme])

  const showToast = useCallback((msg: string) => {
    setToast({ visible: true, message: msg })
  }, [])

  const hideToast = useCallback(() => {
    setToast(t => ({ ...t, visible: false }))
  }, [])

  const addToCart = useCallback((item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.productKey}-${item.variantName}-${Date.now()}`,
    }
    setCartItems(prev => [...prev, newItem])
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  return (
    <>
      <Navbar
        cartCount={cartItems.length}
        onCartOpen={() => setCartOpen(true)}
        onThemeToggle={toggleTheme}
        theme={theme}
      />

      <main>
        <Hero />
        <ProductList
          onAddToCart={addToCart}
          onToast={showToast}
        />
        <HowToOrder />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>

      <Footer />

      <CartPanel
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <WAFloat />

      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={hideToast}
      />
    </>
  )
}
