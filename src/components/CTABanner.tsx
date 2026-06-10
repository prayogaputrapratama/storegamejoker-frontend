export default function CTABanner() {
  return (
    <div className="cta-banner reveal">
      <h2>MULAI ORDER<br /><span style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>SEKARANG</span></h2>
      <p>Ribuan pelanggan sudah merasakan manfaatnya. Jangan ketinggalan harga terbaik!</p>
      <div className="cta-actions">
        <a
          href="#services"
          className="btn-primary"
        >
          🛍️ Lihat Semua Layanan
        </a>
        <a
          href="https://wa.me/62882009466583?text=Halo%20Kak%2C%20saya%20mau%20tanya-tanya%20dulu%20tentang%20layanan%20Storegame%20Joker%20%F0%9F%99%8F"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          💬 Chat WhatsApp
        </a>
      </div>
    </div>
  )
}
