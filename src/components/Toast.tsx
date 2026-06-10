'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  visible: boolean
  onHide: () => void
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onHide, 3000)
      return () => clearTimeout(t)
    }
  }, [visible, onHide])

  return (
    <div className={`toast ${visible ? 'show' : ''}`}>
      <span style={{ fontSize: '20px' }}>✅</span>
      <span>{message}</span>
    </div>
  )
}
