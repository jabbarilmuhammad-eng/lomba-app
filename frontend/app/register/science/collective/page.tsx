"use client";

import Image from "next/image";

import { Fragment, useMemo, useRef, useState } from "react";
import type { ChangeEvent, CSSProperties, FormEvent } from "react";
import HomeNavbar from "@/components/home/HomeNavbar";
import HomeFooter from "@/components/home/HomeFooter";


type Step = 1 | 2 | 3 | 4;
type Subject = "Matematika" | "Sosial" | "IPA";

type Participant = {
  id: number;
  name: string;
  subject: Subject | "";
};

const PRICE_PER_STUDENT = 35_000;
const MAX_PAID_STUDENTS = 10;
const MAX_PARTICIPANTS = 11;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SUBJECTS: Subject[] = ["Matematika", "Sosial", "IPA"];

const steps: { number: Step; label: string }[] = [
  { number: 1, label: "DATA GURU PEMBINA" },
  { number: 2, label: "DATA PESERTA" },
  { number: 3, label: "PEMBAYARAN" },
  { number: 4, label: "UPLOAD BUKTI" },
];

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

const panelStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  color: "#fff",
  background: "rgba(0,0,0,.65)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  border: "2px solid #ffb400",
  borderRadius: 28,
  padding: "clamp(20px, 3vw, 34px) 24px 60px",
  boxShadow: "0 12px 40px rgba(0,0,0,.3)",
};

const sectionStyle: CSSProperties = {
  border: "none",
  borderRadius: 0,
  padding: 0,
  background: "transparent",
  boxSizing: "border-box",
};

const labelStyle: CSSProperties = {
  display: "block",
  color: "#ffb400",
  fontSize: 11,
  fontWeight: 900,
  marginBottom: 9,
  textTransform: "uppercase",
};

const inputStyle: CSSProperties = {
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  background: "#050505",
  border: "1px solid #ffb400",
  borderRadius: 11,
  padding: "12px 14px",
  color: "#fff",
  fontSize: 13,
  outline: "none",
};

const primaryButtonStyle: CSSProperties = {
  width: "100%",
  border: 0,
  borderRadius: 24,
  background: "#ffb400",
  color: "#050505",
  padding: "17px 22px",
  fontSize: 19,
  fontWeight: 900,
  cursor: "pointer",
};

const secondaryButtonStyle: CSSProperties = {
  border: "1px solid #ffb400",
  borderRadius: 12,
  background: "#080808",
  color: "#ffb400",
  padding: "11px 16px",
  fontWeight: 800,
  cursor: "pointer",
};

export default function KolektifRegistrationPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [officialName, setOfficialName] = useState("");
  const [officialPhone, setOfficialPhone] = useState("");
  const [school, setSchool] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "", subject: "" },
  ]);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const registeredCount = participants.length;
  const paidCount = Math.min(registeredCount, MAX_PAID_STUDENTS);
  const bonusCount = Math.max(0, registeredCount - MAX_PAID_STUDENTS);
  const bonusSlotAvailable = registeredCount >= MAX_PAID_STUDENTS;
  const totalPayment = paidCount * PRICE_PER_STUDENT;

  const paymentSummary = useMemo(
    () => ({
      registered: registeredCount,
      paid: paidCount,
      bonus: bonusCount,
      amount: totalPayment,
    }),
    [registeredCount, paidCount, bonusCount, totalPayment],
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const changeStep = (nextStep: Step) => {
    setStep(nextStep);
    scrollToTop();
  };

  const addParticipant = () => {
    if (participants.length >= MAX_PARTICIPANTS) return;
    setParticipants((current) => [
      ...current,
      { id: Math.max(0, ...current.map((item) => item.id)) + 1, name: "", subject: "" },
    ]);
  };

  const removeParticipant = (id: number) => {
    if (participants.length <= 1) return;
    setParticipants((current) => current.filter((item) => item.id !== id));
  };

  const updateParticipant = (
    id: number,
    field: "name" | "subject",
    value: string,
  ) => {
    setParticipants((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const goToParticipants = () => {
    if (!officialName.trim() || !officialPhone.trim() || !school.trim()) {
      alert("Lengkapi nama guru pembina, nomor WhatsApp, dan asal sekolah.");
      return;
    }
    changeStep(2);
  };

  const goToPayment = () => {
    const invalidParticipant = participants.find(
      (participant) => !participant.name.trim() || !participant.subject,
    );
    if (invalidParticipant) {
      alert("Lengkapi nama dan bidang kompetisi seluruh peserta.");
      return;
    }
    changeStep(3);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Format file harus JPG, PNG, atau PDF.");
      event.target.value = "";
      setPaymentProof(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("Ukuran file maksimal 5 MB.");
      event.target.value = "";
      setPaymentProof(null);
      return;
    }
    setPaymentProof(file);
  };

  const removeFile = () => {
    setPaymentProof(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFrontendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!paymentProof) {
      alert("Unggah bukti pembayaran terlebih dahulu.");
      return;
    }

    // Integrasi API sengaja belum ditambahkan: kontrak endpoint dan payload
    // harus mengikuti backend yang dikelola tim backend.
    console.info("Data Science Kolektif siap diintegrasikan ke backend:", {
      officialName,
      officialPhone,
      school,
      participants,
      payment: paymentSummary,
      paymentProof,
    });
    alert(
      "Validasi frontend berhasil. Pengiriman ke server belum diaktifkan karena endpoint backend belum diberikan.",
    );
  };

  return (
    <>
      <HomeNavbar />
      <main className="relative z-0 -mt-[clamp(64px,5vw,80px)]" style={{ paddingTop: "32px" }}>
        <Image
          src="/images/home/bg-form-olim-kolektif.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top", zIndex: -2 }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(0,0,0,.08), rgba(0,0,0,.72) 58%, #000 100%)",
          }}
        />

        <div
          style={{
            width: "calc(100% - 32px)",
            maxWidth: 1010,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "min(100%, 580px)",
              alignSelf: "center",
              textAlign: "center",
              background: "#160800",
              border: "1.5px solid #ffb400",
              borderRadius: 18,
              padding: "15px 20px",
              color: "#ffb400",
              fontSize: "clamp(13px, 1.4vw, 17px)",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Pendaftaran Olimpiade Sains ARMASO 2027
          </div>

          <div
            style={{
              background: "#000",
              border: "1.5px solid #ffb400",
              borderRadius: 22,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                color: "#ffb400",
                border: "1.5px solid #ffb400",
                width: 22,
                height: 22,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                flexShrink: 0,
                fontSize: 12,
              }}
            >
              !
            </span>
            <strong style={{ color: "#ffb400", fontSize: 11, flex: "1 1 220px" }}>
              Pastikan data yang kamu isi sudah sesuai
            </strong>
            <a
              href="https://drive.google.com/file/d/1l46a6rSyUPGYH3w8aYpOgEk4s02KutG0/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              title="Guidebook"
              style={{
                ...secondaryButtonStyle,
                fontSize: 10,
                textDecoration: "none",
                opacity: 1,
              }}
            >
              Lihat guidebook ↗
            </a>

            <a
              href="https://drive.google.com/file/d/1Tflq9U9gp-oV8W5cLw-aCiIpknxXmKPS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              title="Twibbon"
              style={{
                ...secondaryButtonStyle,
                fontSize: 10,
                textDecoration: "none",
                opacity: 1,
              }}
            >
              Lihat twibbon ↗
            </a>
          </div>

          <section style={panelStyle}>
            <nav
              aria-label="Progress pendaftaran"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 24px 1fr 24px 1fr 24px 1fr",
                alignItems: "start",
                maxWidth: 650,
                width: "100%",
                margin: "4px auto 28px",
              }}
            >
              {steps.map((item, index) => (
                <Fragment key={item.number}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      minWidth: 0,
                    }}
                  >
                    <div
                      aria-current={step === item.number ? "step" : undefined}
                      style={{
                        width: "clamp(38px, 5vw, 56px)",
                        height: "clamp(46px, 6vw, 62px)",
                        border: "2px solid #ffb400",
                        borderRadius: 17,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: step === item.number ? "#ffb400" : "#000",
                        color: step === item.number ? "#000" : "#ffb400",
                        fontSize: 14,
                        fontWeight: 900,
                      }}
                    >
                      {item.number}
                    </div>

                    <span
                      style={{
                        border: "1.5px solid #ffb400",
                        color: "#ffb400",
                        background: "#000",
                        borderRadius: 14,
                        padding: "5px 7px",
                        fontSize: "clamp(6px, .75vw, 9px)",
                        fontWeight: 900,
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      key={`line-${item.number}`}
                      aria-hidden="true"
                      style={{
                        height: 1,
                        width: "100%",
                        background: "#ffb400",
                        marginTop: "clamp(23px, 3vw, 31px)",
                      }}
                    />
                  )}
                </Fragment>
              ))}
            </nav>

            {step === 1 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  goToParticipants();
                }}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <section style={sectionStyle}>
                  <label htmlFor="officialName" style={labelStyle}>Nama Guru Pembina / Official</label>
                  <input id="officialName" value={officialName} onChange={(event) => setOfficialName(event.target.value)} placeholder="Nama Guru Pembina" autoComplete="name" required style={inputStyle} />
                  <small style={{ display: "block", color: "#ccc", marginTop: 8 }}>Isi dengan nama guru pembina atau official.</small>
                </section>
                <section style={sectionStyle}>
                  <label htmlFor="officialPhone" style={labelStyle}>Nomor WhatsApp</label>
                  <input id="officialPhone" type="tel" value={officialPhone} onChange={(event) => setOfficialPhone(event.target.value)} placeholder="Nomor WhatsApp" autoComplete="tel" required style={inputStyle} />
                  <small style={{ display: "block", color: "#ccc", marginTop: 8 }}>Gunakan nomor WhatsApp aktif.</small>
                </section>
                <section style={sectionStyle}>
                  <label htmlFor="school" style={labelStyle}>Asal Sekolah</label>
                  <input id="school" value={school} onChange={(event) => setSchool(event.target.value)} placeholder="Nama Sekolah" autoComplete="organization" required style={inputStyle} />
                  <small style={{ display: "block", color: "#ccc", marginTop: 8 }}>Tuliskan nama lengkap sekolah.</small>
                </section>
                <div style={{ borderTop: "1px solid #b98200", paddingTop: 14 }}>
                  <button type="submit" className="futsal-btn-primary" style={primaryButtonStyle}>LANJUT</button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div
                  style={{
                    border: "1px solid #ffb400",
                    borderRadius: 12,
                    padding: "11px 14px",
                    background: "rgba(90,31,0,.7)",
                    color: "#ffb400",
                    fontSize: 12,
                    fontWeight: 900,
                  }}
                >
                  ♙ &nbsp; DAFTARKAN 10 PESERTA BERBAYAR UNTUK MENDAPATKAN 1 SLOT GRATIS!
                  <div style={{ color: "#ddd", fontWeight: 500, marginTop: 5 }}>
                    Maksimal 11 peserta dalam satu pendaftaran kolektif.
                  </div>
                </div>

                {participants.map((participant, index) => (
                  <section key={participant.id} style={sectionStyle}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
                      <h2 style={{ color: "#ffb400", fontSize: 15, margin: 0, fontWeight: 900 }}>
                        PESERTA {index + 1}
                      </h2>
                      {participants.length > 1 && (
                        <button type="button" onClick={() => removeParticipant(participant.id)} style={{ ...secondaryButtonStyle, color: "#ff8c68", borderColor: "#ff8c68", fontSize: 10 }}>
                          HAPUS
                        </button>
                      )}
                    </div>
                    <div style={{ height: 1, background: "rgba(255,180,0,.45)", marginBottom: 14 }} />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)",
                        gap: 12,
                      }}
                    >
                      <div>
                        <label htmlFor={`participant-name-${participant.id}`} style={labelStyle}>Nama Lengkap Siswa *</label>
                        <input id={`participant-name-${participant.id}`} value={participant.name} onChange={(event) => updateParticipant(participant.id, "name", event.target.value)} placeholder="Nama Lengkap Siswa" required style={{ ...inputStyle, height: 48 }} />
                        <small style={{ display: "block", color: "#aaa", marginTop: 6, fontSize: 9 }}>Sesuai nama resmi peserta.</small>
                      </div>
                      <div>
                        <label htmlFor={`participant-subject-${participant.id}`} style={labelStyle}>Bidang Kompetisi *</label>
                        <select id={`participant-subject-${participant.id}`} value={participant.subject} onChange={(event) => updateParticipant(participant.id, "subject", event.target.value)} required style={{ ...inputStyle, minHeight: 42 }}>
                          <option value="">Pilih bidang</option>
                          {SUBJECTS.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                        </select>
                        <small style={{ display: "block", color: "#aaa", marginTop: 6, fontSize: 9 }}>Pilih satu bidang.</small>
                      </div>
                    </div>
                  </section>
                ))}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <button type="button" onClick={addParticipant} disabled={participants.length >= MAX_PARTICIPANTS} className="futsal-btn-secondary" style={{
                    ...secondaryButtonStyle,
                    padding: "8px 12px",
                    fontSize: 11,
                    borderRadius: 10,
                    width: "fit-content",
                    maxWidth: "100%",
                    opacity:
                      participants.length >= MAX_PARTICIPANTS ? 0.45 : 1,
                    cursor:
                      participants.length >= MAX_PARTICIPANTS
                        ? "not-allowed"
                        : "pointer",
                  }}>
                    + TAMBAH PESERTA ({participants.length}/{MAX_PARTICIPANTS})
                  </button>
                  <span style={{ color: "#ddd", fontSize: 10 }}>
                    {participants.length >= MAX_PARTICIPANTS ? "Kuota peserta sudah penuh." : `${MAX_PARTICIPANTS - participants.length} slot tersisa.`}
                  </span>
                </div>

                <div style={{ borderTop: "1px solid #b98200", paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                  <button type="button" onClick={goToPayment} className="futsal-btn-primary" style={primaryButtonStyle}>LANJUT</button>
                  <button type="button" onClick={() => changeStep(1)} className="futsal-btn-secondary" style={secondaryButtonStyle}>KEMBALI</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <section style={{ ...sectionStyle, padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                    <strong style={{ color: "#ffb400", fontSize: 12 }}>♙ &nbsp; REKENING RESMI PANITIA ARMASO:</strong>
                    <strong style={{ color: "#ffb400", fontSize: 12 }}>{formatRupiah(paymentSummary.amount)} ({paymentSummary.registered} peserta terdaftar)</strong>
                  </div>
                  <div style={{ color: "#ddd", fontSize: 12, marginTop: 12 }}>
                    Bank Syariah Indonesia (BSI): 3846-01-045309-53-9
                  </div>
                  <strong style={{ display: "block", color: "#ddd", fontSize: 11, marginTop: 7 }}>
                    PANITIA ARMASO 2027 (Rafi Aziz)
                  </strong>
                </section>

                <section style={sectionStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <h2 style={{ color: "#ffb400", fontSize: 15, margin: 0, fontWeight: 900 }}>JUMLAH PESERTA</h2>
                    <span style={{ border: "1px solid #ffb400", borderRadius: 10, padding: "6px 12px", color: "#ffb400", fontSize: 9, fontWeight: 900 }}>
                      PROMO 10 + 1 GRATIS
                    </span>
                  </div>
                  <div style={{ background: "rgba(90,31,0,.85)", border: "1px solid #a96800", borderRadius: 10, padding: 11, margin: "16px 0", color: "#ffca4b", fontSize: 10 }}>
                    {bonusSlotAvailable
                      ? "Kamu memenuhi syarat 1 slot bonus gratis. Slot bonus akan terisi jika peserta ke-11 didaftarkan."
                      : `Daftarkan ${MAX_PAID_STUDENTS - registeredCount} peserta lagi untuk membuka 1 slot bonus gratis.`}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)",
                      gap: 12,
                      alignItems: "start",
                    }}
                  >

                    {[
                      ["TOTAL PESERTA", `${paymentSummary.registered} SISWA`],
                      ["PESERTA BERBAYAR", `${paymentSummary.paid} SISWA`],
                      ["SLOT GRATIS (BONUS)", bonusSlotAvailable ? `${paymentSummary.bonus}/1 TERISI` : "0/1 TERSEDIA"],
                      ["TARIF PER PESERTA", formatRupiah(PRICE_PER_STUDENT)],
                    ].map(([label, value]) => (
                      <div key={label} style={{ border: "1px solid #9c7300", borderRadius: 11, padding: 12, minWidth: 0 }}>
                        <small style={{ display: "block", color: "#ffb400", fontSize: 9, fontWeight: 800 }}>{label}</small>
                        <strong style={{ display: "block", marginTop: 7, fontSize: 12, overflowWrap: "anywhere" }}>{value}</strong>
                      </div>
                    ))}
                  </div>

                  <div style={{ border: "1px solid #ffb400", borderRadius: 12, padding: 15, marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <strong style={{ color: "#ffb400", fontSize: 12 }}>TOTAL PEMBAYARAN KESELURUHAN</strong>
                      <small style={{ display: "block", color: "#ddd", marginTop: 7 }}>
                        {paymentSummary.paid} peserta berbayar × {formatRupiah(PRICE_PER_STUDENT)}
                      </small>
                    </div>
                    <strong style={{ color: "#ffb400", fontSize: 20 }}>{formatRupiah(paymentSummary.amount)}</strong>
                  </div>
                </section>

                <div style={{ borderTop: "1px solid #b98200", paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                  <button type="button" onClick={() => changeStep(4)} className="futsal-btn-primary" style={primaryButtonStyle}>LANJUT</button>
                  <button type="button" onClick={() => changeStep(2)} className="futsal-btn-secondary" style={secondaryButtonStyle}>KEMBALI</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <form onSubmit={handleFrontendSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <section style={{ ...sectionStyle, padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                    <strong style={{ color: "#ffb400", fontSize: 12 }}>♙ &nbsp; REKENING RESMI PANITIA ARMASO:</strong>
                    <strong style={{ color: "#ffb400", fontSize: 12 }}>{formatRupiah(paymentSummary.amount)}</strong>
                  </div>
                  <div style={{ color: "#ddd", fontSize: 12, marginTop: 10 }}>BSI: 3846-01-045309-53-9</div>
                  <strong style={{ display: "block", color: "#ddd", fontSize: 11, marginTop: 6 }}>PANITIA ARMASO 2027 (Rafi Aziz)</strong>
                </section>

                <section>
                  <input ref={fileInputRef} id="paymentProof" type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" onChange={handleFileChange} style={{ display: "none" }} />
                  {!paymentProof ? (
                    <label htmlFor="paymentProof" style={{ minHeight: 260, border: "1.5px dashed #ffb400", borderRadius: 20, background: "rgba(90,31,0,.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 15, padding: 22, cursor: "pointer", boxSizing: "border-box" }}>
                      <span aria-hidden="true" style={{ fontSize: 46, color: "#ffb400" }}>▤</span>
                      <strong style={{ color: "#ffb400", fontSize: 15 }}>KLIK UNTUK UNGGAH BUKTI TRANSFER</strong>
                      <small style={{ color: "#ddd", fontSize: 11 }}>Format JPG, PNG, atau PDF (Ukuran Maksimal 5MB)</small>
                    </label>
                  ) : (
                    <div style={{ border: "1.5px solid #ffb400", borderRadius: 16, background: "rgba(0,0,0,.9)", padding: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                      <div style={{ minWidth: 0 }}>
                        <strong style={{ overflowWrap: "anywhere" }}>{paymentProof.name}</strong>
                        <small style={{ display: "block", color: "#ffb400", marginTop: 7 }}>{(paymentProof.size / 1024).toFixed(1)} KB · Siap diunggah</small>
                      </div>
                      <button type="button" onClick={removeFile} style={secondaryButtonStyle}>HAPUS FILE</button>
                    </div>
                  )}
                </section>

                <div style={{ borderTop: "1px solid #b98200", paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                  <button type="submit" className="futsal-btn-primary" style={primaryButtonStyle}>KIRIM PENDAFTARAN</button>
                  <button type="button" onClick={() => changeStep(3)} className="futsal-btn-secondary" style={secondaryButtonStyle}>KEMBALI</button>
                </div>
              </form>
            )}

            <footer style={{ borderTop: "1px solid rgba(255,180,0,.35)", marginTop: 24, paddingTop: 16, color: "#ddd", textAlign: "center", fontSize: 11, lineHeight: 1.6 }}>
              Data pendaftaran dan bukti transfer akan diverifikasi oleh panitia pelaksana ARMASO 2027.
            </footer>
          </section>
        </div>
      </main>

    </ >
  );
}
