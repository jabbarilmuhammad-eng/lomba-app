"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HomeFooter from "@/components/home/HomeFooter";
import type { CSSProperties } from "react";

type Step = 1 | 2 | 3;

const REGISTRATION_FEE = 150000;
const API_BASE_URL = "http://localhost:3001";

const steps = [
  { number: 1, label: "DATA TIM" },
  { number: 2, label: "PEMBAYARAN" },
  { number: 3, label: "UPLOAD BUKTI" },
] as const;

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function FutsalRegistrationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>(1);
  const [school, setSchool] = useState("");
  const [officialName, setOfficialName] = useState("");
  const [officialPhone, setOfficialPhone] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal adalah 5MB!");
      event.target.value = "";
      setPaymentProof(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Format file harus JPG, PNG, atau PDF.");
      event.target.value = "";
      setPaymentProof(null);
      return;
    }

    setPaymentProof(file);
  };

  const handleRemoveFile = () => {
    setPaymentProof(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const goToPayment = () => {
    if (!school.trim()) {
      alert("Asal sekolah wajib diisi!");
      return;
    }
    if (!officialName.trim()) {
      alert("Nama guru pembina / official wajib diisi!");
      return;
    }
    if (!officialPhone.trim()) {
      alert("Nomor WhatsApp official / guru pembina wajib diisi!");
      return;
    }
    setStep(2);
    scrollToTop();
  };

  const goToUpload = () => {
    setStep(3);
    scrollToTop();
  };

  const goBack = () => {
    setStep((current) => (current === 3 ? 2 : 1));
    scrollToTop();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!school.trim() || !officialName.trim() || !officialPhone.trim()) {
      alert("Pastikan semua data tim sudah diisi dengan benar.");
      setStep(1);
      return;
    }

    if (!paymentProof) {
      alert("Bukti pembayaran transfer wajib diunggah!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/registrations/futsal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: `Tim ${school.trim()}`,
          school: school.trim(),
          members: [
            `${officialName.trim()} (Official - ${officialPhone.trim()})`,
          ],
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.registrationId) {
        throw new Error(data.message || "Pendaftaran gagal dikirim!");
      }

      const formData = new FormData();
      formData.append("amount", String(REGISTRATION_FEE));
      formData.append("registrationId", String(data.registrationId));
      formData.append("proof", paymentProof);

      const paymentResponse = await fetch(`${API_BASE_URL}/payments`, {
        method: "POST",
        body: formData,
      });

      if (!paymentResponse.ok) {
        alert(
          "Data pendaftaran berhasil disimpan, tetapi bukti pembayaran gagal diunggah. Silakan coba kembali dari halaman pembayaran."
        );
        router.push(
          `/payment?registrationId=${encodeURIComponent(String(data.registrationId))}&success=false`
        );
        return;
      }

      router.push(
        `/payment?registrationId=${encodeURIComponent(String(data.registrationId))}&success=true`
      );
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  const panelStyle: React.CSSProperties = {
    background: "rgba(0, 0, 0, 0.88)",
    border: "2px solid #ffb400",
    borderRadius: 24,
    padding: "clamp(18px, 3vw, 34px)",
    boxSizing: "border-box",
    width: "100%",
    color: "#fff",
    boxShadow: "0 12px 40px rgba(0,0,0,.3)",
  };

  const sectionStyle: React.CSSProperties = {
    border: "2px solid #ffb400",
    borderRadius: 18,
    padding: "22px",
    background: "rgba(0,0,0,.9)",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "#ffb400",
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 12,
    textTransform: "uppercase",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    background: "#050505",
    border: "1px solid #ffb400",
    borderRadius: 12,
    padding: "14px 16px",
    color: "#fff",
    fontSize: 14,
    outline: "none",
  };

  const primaryButtonStyle: CSSProperties = {
    width: "100%",
    border: 0,
    borderRadius: 24,
    background: loading ? "#a97900" : "#ffb400",
    color: "#050505",
    padding: "19px 24px",
    fontSize: 20,
    fontWeight: 900,
    cursor: loading ? "not-allowed" : "pointer",
  };

  const secondaryButtonStyle: CSSProperties = {
    border: "1px solid #ffb400",
    borderRadius: 14,
    background: "#080808",
    color: "#ffb400",
    padding: "13px 22px",
    fontWeight: 800,
    cursor: "pointer",
  };

  return (
    <>
      <main
        style={{
          position: "relative",
          isolation: "isolate",
          minHeight: "calc(100vh - 80px)",
          width: "100%",
          padding: "clamp(20px, 5vw, 70px) 16px 60px",
          boxSizing: "border-box",
          color: "#fff",
          fontFamily: "Arial, Helvetica, sans-serif",
          backgroundColor: "#06101d",
          backgroundImage: `linear-gradient(rgba(0,0,0,.14), rgba(0,0,0,.58)), url('/images/home/bg-${step}.png')`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1010,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 38,
          }}
        >
          <div
            style={{
              background: "#000",
              border: "1.5px solid #ffb400",
              borderRadius: 28,
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                color: "#ffb400",
                border: "2px solid #ffb400",
                width: 27,
                height: 27,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              !
            </span>
            <strong style={{ color: "#ffb400", fontSize: 13, flex: "1 1 240px" }}>
              Pastikan data yang kamu isi sudah sesuai
            </strong>
            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={() => window.open("/guidebook", "_blank", "noopener,noreferrer")}
            >
              Lihat guidebook ↗
            </button>
            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={() => window.open("https://drive.google.com/file/d/14VcVTzPsxzHjdhxtIKGmmYChlc8tYD-Y/view?usp=drive_link", "_blank", "noopener,noreferrer")}
            >
              Lihat twibbon ↗
            </button>
          </div>

          <section style={panelStyle}>
            <nav
              aria-label="Progress pendaftaran"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 0,
                margin: "4px auto 34px",
                maxWidth: 470,
              }}
            >
              {steps.map((item, index) => (
                <div
                  key={item.number}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: index < steps.length - 1 ? 1 : "0 0 auto",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }}>
                    <div
                      aria-current={step === item.number ? "step" : undefined}
                      style={{
                        width: 52,
                        height: 64,
                        border: "2px solid #ffb400",
                        borderRadius: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: step === item.number ? "#ffb400" : "#000",
                        color: step === item.number ? "#000" : "#ffb400",
                        fontSize: 15,
                        fontWeight: 900,
                      }}
                    >
                      {item.number}
                    </div>
                    <span
                      style={{
                        border: "2px solid #ffb400",
                        color: "#ffb400",
                        background: "#000",
                        borderRadius: 14,
                        padding: "6px 12px",
                        fontSize: 8,
                        fontWeight: 900,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      style={{
                        height: 1,
                        background: "#ffb400",
                        flex: 1,
                        minWidth: 22,
                        margin: "0 8px 31px",
                      }}
                    />
                  )}
                </div>
              ))}
            </nav>

            {step === 1 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  goToPayment();
                }}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div style={sectionStyle}>
                  <label htmlFor="officialName" style={labelStyle}>
                    Nama Guru Pembina / Official
                  </label>
                  <input
                    id="officialName"
                    value={officialName}
                    onChange={(event) => setOfficialName(event.target.value)}
                    placeholder="Nama Guru Pembina"
                    autoComplete="name"
                    required
                    style={inputStyle}
                  />
                  <small style={{ display: "block", color: "#cfcfcf", marginTop: 10 }}>
                    Isi dengan nama guru pembina atau official tim.
                  </small>
                </div>

                <div style={sectionStyle}>
                  <label htmlFor="officialPhone" style={labelStyle}>
                    Nomor WhatsApp Official/Guru Pembina
                  </label>
                  <input
                    id="officialPhone"
                    type="tel"
                    value={officialPhone}
                    onChange={(event) => setOfficialPhone(event.target.value)}
                    placeholder="Nomor WhatsApp"
                    autoComplete="tel"
                    required
                    style={inputStyle}
                  />
                  <small style={{ display: "block", color: "#cfcfcf", marginTop: 10 }}>
                    Gunakan nomor WhatsApp aktif untuk koordinasi panitia.
                  </small>
                </div>

                <div style={sectionStyle}>
                  <label htmlFor="school" style={labelStyle}>
                    Asal Sekolah
                  </label>
                  <input
                    id="school"
                    value={school}
                    onChange={(event) => setSchool(event.target.value)}
                    placeholder="Nama Sekolah"
                    autoComplete="organization"
                    required
                    style={inputStyle}
                  />
                  <small style={{ display: "block", color: "#cfcfcf", marginTop: 10 }}>
                    Tuliskan nama lengkap sekolah serta kota atau kabupaten delegasi tim.
                  </small>
                </div>

                <div style={{ borderTop: "1px solid #b98200", paddingTop: 14 }}>
                  <button
                    type="button"
                    className="futsal-btn-primary"
                    onClick={goToPayment}
                    style={primaryButtonStyle}
                  >
                    LANJUT
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <section style={sectionStyle}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      color: "#ffb400",
                      fontWeight: 900,
                    }}
                  >
                    <span style={{ fontSize: 14 }}>♙ &nbsp; REKENING RESMI PANITIA ARMASO:</span>
                    <span>Rp150.000 (1 Tim)</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      marginTop: 18,
                      color: "#ddd",
                      fontSize: 14,
                    }}
                  >
                    <span>Bank Syariah Indonesia (BSI): 3846-01-045309-53-9</span>
                    <strong>Panitia Armaso 2027 (Rafi Aziz)</strong>
                  </div>
                </section>

                <section style={sectionStyle}>
                  <h2 style={{ color: "#ffb400", fontSize: 14, margin: "0 0 22px", fontWeight: 900 }}>
                    ♙ &nbsp; TOTAL PEMBAYARAN
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                      gap: 14,
                      marginBottom: 22,
                    }}
                  >
                    <div style={{ border: "1px solid #ffb400", borderRadius: 14, padding: 16 }}>
                      <strong style={{ display: "block", color: "#ffb400", fontSize: 13 }}>TOTAL TIM</strong>
                      <span style={{ display: "block", marginTop: 6, fontSize: 12 }}>1 TIM</span>
                    </div>
                    <div style={{ border: "1px solid #ffb400", borderRadius: 14, padding: 16 }}>
                      <strong style={{ display: "block", color: "#ffb400", fontSize: 10 }}>TARIF PER TIM</strong>
                      <span style={{ display: "block", marginTop: 6, fontWeight: 900 }}>{formatRupiah(REGISTRATION_FEE)}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      border: "1px solid #ffb400",
                      borderRadius: 14,
                      padding: 18,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <div>
                      <strong style={{ color: "#ffb400" }}>TOTAL PEMBAYARAN KESELURUHAN</strong>
                      <small style={{ display: "block", marginTop: 8 }}>1 tim × {formatRupiah(REGISTRATION_FEE)}</small>
                    </div>
                    <strong style={{ color: "#ffb400", fontSize: 17 }}>{formatRupiah(REGISTRATION_FEE)}</strong>
                  </div>
                </section>

                <div style={{ borderTop: "1px solid #b98200", paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                  <button
                    type="button"
                    className="futsal-btn-primary"
                    onClick={goToUpload}
                    style={primaryButtonStyle}
                  >
                    LANJUT
                  </button>
                  <button
                    type="button"
                    className="futsal-btn-secondary"
                    onClick={goBack}
                    style={secondaryButtonStyle}
                  >
                    KEMBALI
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                <section style={sectionStyle}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      color: "#ffb400",
                      fontWeight: 900,
                    }}
                  >
                    <span style={{ fontSize: 14 }}>♙ &nbsp; REKENING RESMI PANITIA ARMASO:</span>
                    <span>Rp150.000 (1 Tim)</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      marginTop: 18,
                      color: "#ddd",
                      fontSize: 14,
                    }}
                  >
                    <span>Bank Syariah Indonesia (BSI): 3846-01-045309-53-9</span>
                    <strong>Panitia Armaso 2027 (Rafi Aziz)</strong>
                  </div>
                </section>

                <section>
                  <input
                    ref={fileInputRef}
                    id="paymentProof"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />

                  {!paymentProof ? (
                    <label
                      htmlFor="paymentProof"
                      style={{
                        minHeight: 280,
                        border: "1.5px dashed #ffb400",
                        borderRadius: 22,
                        background: "rgba(90, 31, 0, .92)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        gap: 18,
                        padding: 24,
                        cursor: "pointer",
                        boxSizing: "border-box",
                      }}
                    >
                      <span aria-hidden="true" style={{ fontSize: 48, color: "#ffb400" }}>▤</span>
                      <strong style={{ color: "#ffb400", fontSize: 16 }}>
                        KLIK UNTUK UNGGAH BUKTI TRANSFER
                      </strong>
                      <small style={{ color: "#ddd", fontSize: 11 }}>
                        Format JPEG, PNG, atau PDF (Ukuran Maksimal 5MB)
                      </small>
                    </label>
                  ) : (
                    <div
                      style={{
                        border: "1.5px solid #ffb400",
                        borderRadius: 18,
                        background: "rgba(0,0,0,.9)",
                        padding: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <strong style={{ overflowWrap: "anywhere" }}>{paymentProof.name}</strong>
                        <small style={{ display: "block", color: "#ffb400", marginTop: 8 }}>
                          {(paymentProof.size / 1024).toFixed(1)} KB · Siap diunggah
                        </small>
                      </div>
                      <button type="button" onClick={handleRemoveFile} style={secondaryButtonStyle}>
                        HAPUS FILE
                      </button>
                    </div>
                  )}
                </section>

                <div style={{ borderTop: "1px solid #b98200", paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>

                  <button
                    type="submit"
                    className="futsal-btn-primary"
                    disabled={loading}
                    style={primaryButtonStyle}
                  >
                    {loading ? "MENGIRIM PENDAFTARAN..." : "KIRIM PENDAFTARAN"}
                  </button>

                  <button
                    type="button"
                    className="futsal-btn-secondary"
                    onClick={goBack}
                    style={secondaryButtonStyle}
                  >
                    KEMBALI
                  </button>
                </div>
              </form>
            )}

            <footer
              style={{
                borderTop: "1px solid rgba(255,180,0,.35)",
                marginTop: 28,
                paddingTop: 18,
                color: "#ddd",
                textAlign: "center",
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              Data pendaftaran dan bukti transfer akan diverifikasi
              oleh panitia pelaksana ARMASO 2027.
            </footer>
          </section>
        </div>
      </main>

      {/* FOOTER UTAMA — DI LUAR AREA FORMULIR */}




    </>
  );
}
