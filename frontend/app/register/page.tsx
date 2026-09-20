import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="register-page-wrapper" style={{ minHeight: '100vh', width: '100%', backgroundColor: '#0c0906', color: '#fbf5e6', padding: '120px 20px 60px 20px', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}>

      {/* Container Utama */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* Header Title */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: '#16100b', border: '1px solid #d4af37', color: '#f6d066', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px' }}>
            PORTAL PENDAFTARAN RESMI ARMASO 2027
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 10px 0', color: '#ffffff' }}>
            PILIH KATEGORI <span style={{ color: '#f6d066' }}>PENDAFTARAN LOMBA</span>
          </h1>
          <p style={{ color: '#e2d2b5', fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
            Tentukan jenis kompetisi yang ingin Anda ikuti. Ikuti olimpiade akademik bergengsi atau unjuk ketangkasan dalam turnamen futsal SD/MI se-Jawa Bali.
          </p>
        </div>

        {/* Grid 2 Kartu */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>

          {/* KARTU 1: OLIMPIADE */}
          <div style={{ backgroundColor: '#16100b', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
            <div>
              {/* Header Badge Dalam Card (Dijamin Tidak Keluar) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ backgroundColor: '#23180f', border: '1px solid #d4af37', color: '#f6d066', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  Bidang Akademik
                </span>
                <span style={{ color: '#e2d2b5', fontSize: '12px', opacity: 0.8 }}>
                  SD/MI Se-Jawa Bali
                </span>
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 10px 0' }}>
                Olimpiade Sains
              </h2>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f6d066', marginBottom: '15px' }}>
                Biaya: Rp 35.000 / Peserta
              </div>
              <p style={{ fontSize: '14px', color: '#e2d2b5', lineHeight: '1.5', margin: '0 0 20px 0', opacity: 0.9 }}>
                Kompetisi akademik sains dan penalaran bergengsi untuk cabang Matematika, IPA (Science), dan IPS (Social) dengan standar soal HOTS.
              </p>
            </div>

            <div>
              <Link
                href="/register/olimpiade"
                style={{ display: 'block', textAlign: 'center', padding: '14px', backgroundColor: '#d4af37', color: '#120c06', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}
              >
                Pilih Jalur Pendaftaran →
              </Link>
            </div>
          </div>

          {/* KARTU 2: FUTSAL */}
          <div style={{ backgroundColor: '#16100b', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
            <div>
              {/* Header Badge Dalam Card (Dijamin Tidak Keluar) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ backgroundColor: '#23180f', border: '1px solid #d4af37', color: '#f6d066', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  Turnamen Olahraga
                </span>
                <span style={{ color: '#e2d2b5', fontSize: '12px', opacity: 0.8 }}>
                  1 Tim Sekolah
                </span>
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 10px 0' }}>
                Kompetisi Futsal
              </h2>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f6d066', marginBottom: '15px' }}>
                Biaya: Rp 150.000 / Tim
              </div>
              <p style={{ fontSize: '14px', color: '#e2d2b5', lineHeight: '1.5', margin: '0 0 20px 0', opacity: 0.9 }}>
                Turnamen futsal bergengsi tingkat SD/MI se-Jawa Bali. Daftarkan skuad tim sekolah Anda untuk bertanding memperebutkan Trophy Bergilir.
              </p>
            </div>

            <div>
              <Link
                href="/register/futsal"
                style={{ display: 'block', textAlign: 'center', padding: '14px', backgroundColor: '#d4af37', color: '#120c06', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}
              >
                Daftar Tim Futsal →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}