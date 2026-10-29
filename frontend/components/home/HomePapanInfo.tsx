// HomePapanInfo.tsx — Section "Papan Informasi" (Tahap 2)
// Tiga kolom info: Biaya Pendaftaran | Total Hadiah | Jangkauan Wilayah
// Latar: menyambung dari hero (#1c0a00) → gradasi ke #531901 (latar About)
// "se-" tidak boleh terputus dari kata berikutnya (whitespace-nowrap atau non-breaking)

export default function HomePapanInfo() {
  return (
    <section
      id="papan-informasi"
      style={{
        background: "linear-gradient(to bottom, #1c0a00 0%, #2a0d00 100%)",
        padding: "2.5rem 1rem 3rem",
      }}
    >
      {/* Panel utama: border oranye, latar cokelat gelap */}
      <div
        className="mx-auto w-full max-w-4xl home-reveal"
        style={{
          background: "#531901",
          border: "3px solid #ff6d00",
          borderRadius: "30px",
          overflow: "hidden",
        }}
      >
        {/*
          Desktop: 3 kolom dengan pembatas vertikal emas.
          HP: 1 kolom dengan pembatas horizontal.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Kolom 1: Biaya Pendaftaran */}
          <div
            className="flex flex-col items-center justify-center text-center px-6 py-6
                        md:border-r md:border-[#ff6d00]/50
                        border-b border-[#ff6d00]/50 md:border-b-0"
          >
            <p
              className="font-poppins font-medium text-white uppercase tracking-widest mb-2"
              style={{ fontSize: "clamp(10px, 1vw, 13px)", letterSpacing: "0.18em" }}
            >
              BIAYA PENDAFTARAN
            </p>
            <p
              className="font-poppins font-bold leading-snug"
              style={{ fontSize: "clamp(16px, 2vw, 22px)", color: "#efbb52" }}
            >
              Olimpiade Rp 35k
              <br />
              Futsal Rp 150k
            </p>
          </div>

          {/* Kolom 2: Total Hadiah Pembinaan */}
          <div
            className="flex flex-col items-center justify-center text-center px-6 py-6
                        md:border-r md:border-[#ff6d00]/50
                        border-b border-[#ff6d00]/50 md:border-b-0"
          >
            <p
              className="font-poppins font-medium text-white uppercase tracking-widest mb-2"
              style={{ fontSize: "clamp(10px, 1vw, 13px)", letterSpacing: "0.18em" }}
            >
              TOTAL HADIAH PEMBINAAN
            </p>
            <p
              className="font-poppins font-bold leading-snug"
              style={{ fontSize: "clamp(16px, 2vw, 22px)", color: "#efbb52" }}
            >
              Prize Pool Jutaan
              <br />
              Rupiah
            </p>
          </div>

          {/* Kolom 3: Jangkauan Wilayah */}
          {/* "se-" tidak boleh terputus — pakai whitespace-nowrap pada "se-Jawa & Bali" */}
          <div className="flex flex-col items-center justify-center text-center px-6 py-6">
            <p
              className="font-poppins font-medium text-white uppercase tracking-widest mb-2"
              style={{ fontSize: "clamp(10px, 1vw, 13px)", letterSpacing: "0.18em" }}
            >
              JANGKAUAN WILAYAH
            </p>
            <p
              className="font-poppins font-bold leading-snug"
              style={{ fontSize: "clamp(16px, 2vw, 22px)", color: "#efbb52" }}
            >
              {/* "SD/MI se-" + non-breaking + "Jawa & Bali" agar "se-" tidak pindah baris sendiri */}
              SD/MI <span className="whitespace-nowrap">se-Jawa &amp; Bali</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

