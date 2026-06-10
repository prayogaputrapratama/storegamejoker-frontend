export default function HowToOrder() {
  const steps = [
    {
      num: '01',
      title: 'Pilih Layanan',
      desc: 'Browse kategori, temukan layanan yang kamu butuhkan, klik "Lihat Paket" untuk detail.',
    },
    {
      num: '02',
      title: 'Order via WA',
      desc: 'Klik tombol Order, otomatis terhubung ke WhatsApp kami dengan detail pesanan lengkap.',
    },
    {
      num: '03',
      title: 'Bayar & Terima',
      desc: 'Transfer sesuai nominal, konfirmasi pembayaran, layanan aktif dalam 1–30 menit.',
    },
  ]

  return (
    <section id="cara-order">
      <div className="section-eyebrow reveal">📋 Cara Order</div>
      <div className="section-title reveal">MUDAH & CEPAT</div>
      <p className="section-desc reveal">
        Tiga langkah mudah untuk mendapatkan layanan digital impianmu.
      </p>

      <div className="steps reveal">
        {steps.map(s => (
          <div key={s.num} className="step">
            <div className="step-num">{s.num}</div>
            <div className="step-title">{s.title}</div>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
