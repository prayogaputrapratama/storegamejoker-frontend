export default function Footer() {
  const year = new Date().getFullYear()

  const links = {
    Layanan: [
      { label: 'Aplikasi Premium', href: '#services' },
      { label: 'Suntik Sosmed', href: '#services' },
    ],
    Informasi: [
      { label: 'Cara Order', href: '#cara-order' },
      { label: 'Testimoni', href: '#testimoni' },
      { label: 'FAQ', href: '#faq' },
    ],
    Kontak: [
      { label: 'WhatsApp', href: 'https://wa.me/62882009466583' },
      { label: 'Instagram', href: 'https://instagram.com/storegamejoker' },
    ],
  }

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <span className="nav-logo">STOREGAME JOKER</span>
          <p>Toko digital terpercaya sejak 2020. Harga terbaik, proses cepat, garansi penuh untuk semua layanan digital.</p>
        </div>

        {Object.entries(links).map(([title, items]) => (
          <div key={title} className="footer-links">
            <h4>{title}</h4>
            <ul>
              {items.map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© {year} Storegame Joker. Trusted Since 2020.</p>
        <p style={{ color: 'var(--muted2)', fontSize: '12px' }}>
          Made with ❤️ for digital needs
        </p>
      </div>
    </footer>
  )
}
