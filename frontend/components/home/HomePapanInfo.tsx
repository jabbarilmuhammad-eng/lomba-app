// HomePapanInfo.tsx — Section "Papan Informasi" (Batch A rev2)
// Ukuran sesuai NOTES.md: max-w-[783px] (51%), min-h-[118px], menimpa tepi bawah hero -mt-[67px].
// Latar #531901, border 3px #ff6d00, radius 30px.

export default function HomePapanInfo() {
  return (
    <section
      id="papan-informasi"
      className="relative z-10 -mt-[67px] px-4 pb-10 flex justify-center"
      style={{
        background: "linear-gradient(to bottom, #1c0a00 0%, #2a0d00 100%)",
      }}
    >
      <div className="w-full max-w-[783px] bg-[#531901] border-[3px] border-[#ff6d00] rounded-[30px] overflow-hidden shadow-2xl home-reveal">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[118px]">
          {/* Kolom 1: Biaya Pendaftaran */}
          <div className="flex-1 w-full flex flex-col items-center justify-center text-center p-4 sm:p-5">
            <p className="font-poppins font-medium text-[14px] text-white tracking-[0.1em] uppercase mb-1.5">
              BIAYA PENDAFTARAN
            </p>
            <p className="font-poppins font-bold text-[clamp(16px,1.3vw,20px)] text-[#efbb52] leading-snug">
              Olimpiade Rp 35k
              <br />
              Futsal Rp 150k
            </p>
          </div>

          {/* Pembatas 1 */}
          <div className="hidden md:block w-[2px] h-[68px] bg-[#ff6d00]/45 shrink-0 self-center" />
          <div className="block md:hidden w-full h-[2px] bg-[#ff6d00]/45 shrink-0" />

          {/* Kolom 2: Total Hadiah Pembinaan */}
          <div className="flex-1 w-full flex flex-col items-center justify-center text-center p-4 sm:p-5">
            <p className="font-poppins font-medium text-[14px] text-white tracking-[0.1em] uppercase mb-1.5">
              TOTAL HADIAH PEMBINAAN
            </p>
            <p className="font-poppins font-bold text-[clamp(16px,1.3vw,20px)] text-[#efbb52] leading-snug">
              Prize Pool Jutaan
              <br />
              Rupiah
            </p>
          </div>

          {/* Pembatas 2 */}
          <div className="hidden md:block w-[2px] h-[68px] bg-[#ff6d00]/45 shrink-0 self-center" />
          <div className="block md:hidden w-full h-[2px] bg-[#ff6d00]/45 shrink-0" />

          {/* Kolom 3: Jangkauan Wilayah */}
          <div className="flex-1 w-full flex flex-col items-center justify-center text-center p-4 sm:p-5">
            <p className="font-poppins font-medium text-[14px] text-white tracking-[0.1em] uppercase mb-1.5">
              JANGKAUAN WILAYAH
            </p>
            <p className="font-poppins font-bold text-[clamp(16px,1.3vw,20px)] text-[#efbb52] leading-snug">
              SD/MI <span className="whitespace-nowrap">se-Jawa &amp; Bali</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
