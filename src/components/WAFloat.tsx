'use client'

import { useState } from 'react'

export default function WAFloat() {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      {/* Popup */}
      <div className={`wa-popup ${showPopup ? 'show' : ''}`}>
        <button
          className="wa-popup-close"
          onClick={() => setShowPopup(false)}
          aria-label="Tutup"
        >
          ✕
        </button>
        <div className="wa-popup-avatar">
          🤖
          <div className="wa-popup-online" />
        </div>
        <div className="wa-popup-name">CS Storegame Joker</div>
        <div className="wa-popup-status">● Online Sekarang</div>
        <div className="wa-popup-bubble">
          Halo! Ada yang bisa dibantu? Kami siap membantu kamu memilih layanan terbaik 😊
        </div>
        <a
          href="https://wa.me/62882009466583?text=Halo%20Kak%2C%20saya%20mau%20tanya-tanya%20dulu%20tentang%20layanan%20Storegame%20Joker%20%F0%9F%99%8F"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-popup-btn"
          onClick={() => setShowPopup(false)}
        >
          💬 Mulai Chat
        </a>
      </div>

      {/* Float button */}
      <button
        className="wa-float"
        onClick={() => setShowPopup(!showPopup)}
        aria-label="Chat WhatsApp"
      >
        💬
      </button>
    </>
  )
}
