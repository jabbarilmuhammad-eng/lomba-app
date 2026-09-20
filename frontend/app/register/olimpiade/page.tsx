import Link from "next/link";

export default function OlimpiadeCategoryPage() {
  return (
    <div
      className="register-page-wrapper"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#0c0906",
        color: "#fbf5e6",
        padding: "120px 20px 60px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Container Utama */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Header Title */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              backgroundColor: "#16100b",
              border: "1px solid #d4af37",
              color: "#f6d066",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            PENDAFTARAN OLIMPIADE SAINS ARMASO 2027
          </div>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "900",
              textTransform: "uppercase",
              margin: "0 0 12px 0",
              color: "#ffffff",
              lineHeight: "1.2",
            }}
          >
            PILIH SKEMA <span style={{ color: "#f6d066" }}>PENDAFTARAN OLIMPIADE</span>
          </h1>
          <p
            style={{
              color: "#e2d2b5",
              fontSize: "15px",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Tentukan skema pendaftaran yang sesuai, baik pendaftaran mandiri perorangan (Individu) maupun pendaftaran rombongan perwakilan sekolah (Kolektif).
          </p>
        </div>

        {/* Grid 2 Kartu */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
            alignItems: "stretch",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* KARTU 1: SCIENCE INDIVIDU */}
          <div
            style={{
              backgroundColor: "#16100b",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              borderRadius: "24px",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div>
              {/* Header Badge Dalam Card (Dijamin Tidak Menabrak Border) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "22px",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#23180f",
                    border: "1px solid #d4af37",
                    color: "#f6d066",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Akademik Mandiri
                </span>
                <span style={{ color: "#e2d2b5", fontSize: "12px", opacity: 0.85 }}>
                  1 Peserta
                </span>
              </div>

              {/* Icon Box */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  backgroundColor: "#23180f",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f6d066",
                  fontSize: "24px",
                  marginBottom: "18px",
                }}
              >
                <i className="fa-solid fa-user-graduate" />
              </div>

              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  margin: "0 0 10px 0",
                }}
              >
                Science Individu
              </h2>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#f6d066",
                  marginBottom: "14px",
                }}
              >
                Biaya: Rp 35.000 / Peserta
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#e2d2b5",
                  lineHeight: "1.6",
                  margin: "0 0 20px 0",
                  opacity: 0.9,
                }}
              >
                Pendaftaran 1 peserta mandiri untuk cabang Olimpiade Matematika, IPA (Science), atau IPS (Social) tingkat SD/MI.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "28px",
                  fontSize: "13px",
                  color: "#e2d2b5",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-check" style={{ color: "#f6d066", flexShrink: 0 }} />
                  <span>Satu formulir untuk satu peserta mandiri</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-check" style={{ color: "#f6d066", flexShrink: 0 }} />
                  <span>Pilihan mata pelajaran: Matematika, IPA, atau IPS</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-check" style={{ color: "#f6d066", flexShrink: 0 }} />
                  <span>Verifikasi dan invoice pembayaran perorangan</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/register/science/self"
                style={{
                  display: "block",
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                  padding: "14px",
                  backgroundColor: "#d4af37",
                  color: "#120c06",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "background-color 0.2s ease",
                }}
              >
                Daftar Sendiri →
              </Link>
            </div>
          </div>

          {/* KARTU 2: SCIENCE KOLEKTIF */}
          <div
            style={{
              backgroundColor: "#16100b",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              borderRadius: "24px",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div>
              {/* Header Badge Dalam Card (Dijamin Tidak Menabrak Border) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "22px",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#23180f",
                    border: "1px solid #d4af37",
                    color: "#f6d066",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Delegasi Sekolah
                </span>
                <span style={{ color: "#ffd873", fontSize: "12px", fontWeight: "bold" }}>
                  Bebas Kuota (Bonus 10+1)
                </span>
              </div>

              {/* Icon Box */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  backgroundColor: "#23180f",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f6d066",
                  fontSize: "24px",
                  marginBottom: "18px",
                }}
              >
                <i className="fa-solid fa-users-rectangle" />
              </div>

              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  margin: "0 0 10px 0",
                }}
              >
                Science Kolektif
              </h2>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#f6d066",
                  marginBottom: "14px",
                }}
              >
                Biaya: Rp 35.000 / Peserta
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#e2d2b5",
                  lineHeight: "1.6",
                  margin: "0 0 20px 0",
                  opacity: 0.9,
                }}
              >
                Daftarkan seluruh siswa delegasi sekolah sekaligus dalam 1 formulir registrasi yang praktis dan terpadu.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "28px",
                  fontSize: "13px",
                  color: "#e2d2b5",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-gift" style={{ color: "#f6d066", flexShrink: 0 }} />
                  <span><strong>Promo Bonus:</strong> Tiap 10 berbayar, GRATIS 1 siswa</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-check" style={{ color: "#f6d066", flexShrink: 0 }} />
                  <span>Bebas tambah siswa delegasi tanpa batasan kuota</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-check" style={{ color: "#f6d066", flexShrink: 0 }} />
                  <span>Kalkulasi biaya otomatis &amp; pembayaran terpadu</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/register/science/collective"
                style={{
                  display: "block",
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                  padding: "14px",
                  backgroundColor: "#d4af37",
                  color: "#120c06",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "background-color 0.2s ease",
                }}
              >
                Daftar Kolektif →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
