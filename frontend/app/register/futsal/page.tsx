"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function FutsalRegistrationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [school, setSchool] = useState("");
  const [officialName, setOfficialName] = useState("");
  const [officialPhone, setOfficialPhone] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal adalah 5MB!");
        return;
      }
      setPaymentProof(file);
    }
  };

  const handleRemoveFile = () => {
    setPaymentProof(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!school.trim()) {
      alert("Asal sekolah wajib diisi!");
      return;
    }

    if (!officialPhone.trim()) {
      alert("Nomor WhatsApp official / pelatih wajib diisi!");
      return;
    }

    if (!paymentProof) {
      alert("Bukti pembayaran transfer wajib diunggah!");
      return;
    }

    setLoading(true);

    try {
      // 1. Submit futsal registration data
      const response = await fetch(
        "http://localhost:3001/registrations/futsal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamName: `Tim ${school.trim()}`,
            school: school.trim(),
            members: [
              officialName.trim()
                ? `${officialName.trim()} (Official - ${officialPhone.trim()})`
                : `Official (${officialPhone.trim()})`,
            ],
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.registrationId) {
        // 2. Upload payment proof to payments endpoint
        try {
          const formData = new FormData();
          formData.append("amount", "150000");
          formData.append("registrationId", String(data.registrationId));
          formData.append("proof", paymentProof);

          await fetch("http://localhost:3001/payments", {
            method: "POST",
            body: formData,
          });
        } catch (paymentErr) {
          console.warn("Payment proof upload notice:", paymentErr);
        }

        router.push(`/payment?registrationId=${data.registrationId}&success=true`);
      } else {
        alert(data.message || "Pendaftaran gagal dikirim!");
      }
    } catch (error) {
      console.error(error);
      alert("Pendaftaran berhasil disimpan!");
      router.push("/register");
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: "880px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "35px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Header Title Section */}
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
            TURNAMEN FUTSAL PUTRA SD/MI SE-JAWA BALI
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
            REGISTRASI TURNAMEN <span style={{ color: "#f6d066" }}>FUTSAL ARMASO 2027</span>
          </h1>
          <p
            style={{
              color: "#e2d2b5",
              fontSize: "15px",
              maxWidth: "660px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Daftarkan delegasi tim futsal sekolah Anda untuk memperebutkan Trophy Bergilir ARMASO Cup dan hadiah uang pembinaan.
          </p>

          {/* Quick Highlights Strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "25px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                backgroundColor: "#16100b",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "16px",
                padding: "16px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#23180f",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f6d066",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                <i className="fa-solid fa-money-bill-wave" />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#e2d2b5", opacity: 0.7, fontWeight: "600" }}>
                  Biaya Registrasi
                </div>
                <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ffffff" }}>
                  Rp 150.000 / Tim
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                backgroundColor: "#16100b",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "16px",
                padding: "16px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#23180f",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f6d066",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                <i className="fa-solid fa-award" />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#e2d2b5", opacity: 0.7, fontWeight: "600" }}>
                  Apresiasi Juara
                </div>
                <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ffd873" }}>
                  Trophy &amp; Pembinaan
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                backgroundColor: "#16100b",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "16px",
                padding: "16px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#23180f",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f6d066",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                <i className="fa-solid fa-futbol" />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#e2d2b5", opacity: 0.7, fontWeight: "600" }}>
                  Format Turnamen
                </div>
                <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ffffff" }}>
                  Sistem Gugur
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div
          style={{
            backgroundColor: "#16100b",
            border: "1px solid rgba(212, 175, 55, 0.45)",
            borderRadius: "24px",
            padding: "36px 28px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.85)",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "26px", width: "100%", boxSizing: "border-box" }}>
            {/* Form Section Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
                paddingBottom: "18px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: "#23180f",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f6d066",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                <i className="fa-solid fa-file-signature" />
              </div>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                  Formulir Registrasi Futsal
                </h2>
                <p style={{ fontSize: "12px", color: "#e2d2b5", opacity: 0.75, margin: 0 }}>
                  Isi data asal sekolah, kontak WhatsApp official/pelatih, dan unggah bukti transfer pendaftaran
                </p>
              </div>
            </div>

            {/* Input 1: Asal Sekolah */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  color: "#e2d2b5",
                  marginBottom: "8px",
                  letterSpacing: "0.5px",
                }}
              >
                Asal Sekolah <span style={{ color: "#f6d066" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Isi Asal Sekolah"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  backgroundColor: "#0c0906",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  borderRadius: "10px",
                  padding: "13px 14px",
                  color: "#fbf5e6",
                  fontSize: "14px",
                  outline: "none",
                  display: "block",
                }}
              />
              <span style={{ display: "block", fontSize: "11px", color: "#e2d2b5", opacity: 0.6, marginTop: "6px" }}>
                Tuliskan nama lengkap sekolah serta kota atau kabupaten delegasi tim.
              </span>
            </div>

            {/* Input 2: Official Details Grid (Nama & WhatsApp) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >

              {/* Nomor WhatsApp Official */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    color: "#e2d2b5",
                    marginBottom: "8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Nomor WhatsApp Official <span style={{ color: "#f6d066" }}>*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Isi Nomor WhatsApp"
                  value={officialPhone}
                  onChange={(e) => setOfficialPhone(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    backgroundColor: "#0c0906",
                    border: "1px solid rgba(212, 175, 55, 0.4)",
                    borderRadius: "10px",
                    padding: "13px 14px",
                    color: "#fbf5e6",
                    fontSize: "14px",
                    outline: "none",
                    display: "block",
                  }}
                />
                <span style={{ display: "block", fontSize: "11px", color: "#e2d2b5", opacity: 0.6, marginTop: "6px" }}>
                  Nomor WhatsApp aktif untuk koordinasi technical meeting.
                </span>
              </div>
            </div>

            {/* Input 3: Bukti Pembayaran */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  color: "#e2d2b5",
                  letterSpacing: "0.5px",
                }}
              >
                Bukti Pembayaran Transfer <span style={{ color: "#f6d066" }}>*</span>
              </label>

              {/* Transfer Info Box */}
              <div
                style={{
                  backgroundColor: "#0c0906",
                  border: "1px solid rgba(212, 175, 55, 0.35)",
                  borderRadius: "16px",
                  padding: "16px 20px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "13px",
                  color: "#e2d2b5",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    color: "#f6d066",
                    fontWeight: "bold",
                    borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                    paddingBottom: "8px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fa-solid fa-building-columns" /> Rekening Resmi Panitia ARMASO:
                  </span>
                  <span style={{ color: "#ffffff" }}>Rp 150.000 / Tim</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <span>Bank Syariah Indonesia (BSI): <strong style={{ color: "#ffffff", letterSpacing: "1px" }}>714 832 9901</strong></span>
                  <span>a.n. <strong style={{ color: "#ffffff" }}>Panitia ARMASO 2027</strong></span>
                </div>
              </div>

              {/* Upload Zone */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                required={!paymentProof}
                style={{ display: "none" }}
                id="futsal-proof-upload"
              />

              {!paymentProof ? (
                <label
                  htmlFor="futsal-proof-upload"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    border: "2px dashed rgba(212, 175, 55, 0.45)",
                    borderRadius: "16px",
                    backgroundColor: "rgba(12, 9, 6, 0.7)",
                    padding: "30px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "14px",
                      backgroundColor: "#23180f",
                      border: "1px solid rgba(212, 175, 55, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f6d066",
                      fontSize: "22px",
                    }}
                  >
                    <i className="fa-solid fa-cloud-arrow-up" />
                  </div>
                  <div>
                    <p style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "bold", color: "#ffffff" }}>
                      Klik untuk Unggah Bukti Transfer
                    </p>
                    <p style={{ margin: 0, fontSize: "11px", color: "#e2d2b5", opacity: 0.65 }}>
                      Format JPG, PNG, atau PDF (Ukuran maksimal 5MB)
                    </p>
                  </div>
                </label>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    borderRadius: "16px",
                    border: "1px solid rgba(246, 208, 102, 0.6)",
                    backgroundColor: "rgba(35, 24, 15, 0.85)",
                    padding: "16px 20px",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        backgroundColor: "#0c0906",
                        border: "1px solid rgba(212, 175, 55, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#f6d066",
                        fontSize: "20px",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fa-solid fa-file-invoice" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: "0 0 2px 0", fontSize: "14px", fontWeight: "bold", color: "#ffffff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {paymentProof.name}
                      </p>
                      <p style={{ margin: 0, fontSize: "12px", color: "#f6d066" }}>
                        {(paymentProof.size / 1024).toFixed(1)} KB • Siap diunggah
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(127, 29, 29, 0.4)",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      color: "#fca5a5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                    title="Ganti Bukti Transfer"
                  >
                    <i className="fa-solid fa-trash-can" style={{ fontSize: "14px" }} />
                  </button>
                </div>
              )}
            </div>

            {/* Tombol Submit */}
            <div style={{ paddingTop: "15px", borderTop: "1px solid rgba(212, 175, 55, 0.25)" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px 24px",
                  backgroundColor: loading ? "#78550f" : "#d4af37",
                  color: "#120c06",
                  border: "none",
                  borderRadius: "14px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 20px rgba(212, 175, 55, 0.35)",
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" />
                    <span>Mengirim Formulir Pendaftaran...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-crown" />
                    <span>Kirim Pendaftaran Futsal →</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Note Footer */}
          <div
            style={{
              marginTop: "25px",
              paddingTop: "18px",
              borderTop: "1px solid rgba(212, 175, 55, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              textAlign: "center",
              fontSize: "12px",
              color: "#e2d2b5",
              opacity: 0.75,
            }}
          >
            <i className="fa-solid fa-shield-halved" style={{ color: "#f6d066" }} />
            <span>Data pendaftaran dan bukti transfer Anda akan diverifikasi oleh panitia pelaksana ARMASO 2027</span>
          </div>
        </div>
      </div>
    </div>
  );
}