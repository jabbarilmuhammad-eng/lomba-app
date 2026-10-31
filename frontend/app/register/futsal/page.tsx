
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal adalah 5MB!");
      event.target.value = "";
      setPaymentProof(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !school.trim() ||
      !officialName.trim() ||
      !officialPhone.trim()
    ) {
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
      const response = await fetch(
        `${API_BASE_URL}/registrations/futsal`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teamName: `Tim ${school.trim()}`,
            school: school.trim(),
            members: [
              `${officialName.trim()} (Official - ${officialPhone.trim()})`,
            ],
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.registrationId) {
        throw new Error(
          data.message || "Pendaftaran gagal dikirim!"
        );
      }

      const formData = new FormData();
      formData.append("amount", String(REGISTRATION_FEE));
      formData.append(
        "registrationId",
        String(data.registrationId)
      );
      formData.append("proof", paymentProof);

      const paymentResponse = await fetch(
        `${API_BASE_URL}/payments`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!paymentResponse.ok) {
        alert(
          "Data pendaftaran berhasil disimpan, tetapi bukti pembayaran gagal diunggah. Silakan coba kembali dari halaman pembayaran."
        );

        router.push(
          `/payment?registrationId=${encodeURIComponent(
            String(data.registrationId)
          )}&success=false`
        );
        return;
      }

      router.push(
        `/payment?registrationId=${encodeURIComponent(
          String(data.registrationId)
        )}&success=true`
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

  const panelStyle: CSSProperties = {
    background: "rgba(0,0,0,.65)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    border: "2px solid #ffb400",
    borderRadius: 24,
    padding: "clamp(18px, 3vw, 34px)",
    boxSizing: "border-box",
    width: "100%",
    color: "#fff",
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
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 12,
    textTransform: "uppercase",
  };

  const inputStyle: CSSProperties = {
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
    background: "rgba(0,0,0,.65)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    color: "#ffb400",
    padding: "13px 22px",
    fontWeight: 800,
    cursor: "pointer",
  };

  // Tombol khusus Guidebook dan Twibbon agar tidak terlalu besar.
  const resourceButtonStyle: CSSProperties = {
    border: "1px solid #ffb400",
    borderRadius: 12,
    background: "#080808",
    color: "#ffb400",
    padding: "8px 12px",
    fontSize: 10,
    fontWeight: 900,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <style jsx>{`
        .futsal-container {
          width: 100%;
          max-width: 1010px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 38px;
        }

        .futsal-notice {
          background: #000;
          border: 1.5px solid #ffb400;
          border-radius: 28px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
        }

        .futsal-notice-text {
          color: #ffb400;
          font-size: 13px;
          flex: 1 1 240px;
        }
          .futsal-resource-buttons {
         display: flex;
         align-items: center;
         flex-wrap: wrap;
         gap: 10px;
         margin-left: auto;
        }

        .futsal-progress {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
          margin: 4px auto 34px;
          max-width: 470px;
          width: 100%;
        }

        .futsal-step-number {
          width: 52px;
          height: 64px;
          border: 2px solid #ffb400;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 900;
          flex-shrink: 0;
        }

        .futsal-step-label {
          border: 2px solid #ffb400;
          color: #ffb400;
          background: #000;
          border-radius: 14px;
          padding: 6px 12px;
          font-size: 8px;
          font-weight: 900;
          white-space: nowrap;
        }

        .futsal-step-line {
          height: 1px;
          background: #ffb400;
          flex: 1;
          min-width: 22px;
          margin: 0 8px 31px;
        }

        .futsal-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .futsal-form-actions {
          border-top: 1px solid #b98200;
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .futsal-upload-area {
          min-height: 280px;
          border: 1.5px dashed #ffb400;
          border-radius: 22px;
          background: rgba(90, 31, 0, .92);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 18px;
          padding: 24px;
          cursor: pointer;
          box-sizing: border-box;
        }

        @media (max-width: 600px) {
          .futsal-container {
            gap: 18px;
          }

          .futsal-notice {
            border-radius: 16px;
            padding: 14px;
            gap: 10px;
          }

          .futsal-notice-text {
            flex: 1 1 calc(100% - 42px);
            font-size: 11px;
            line-height: 1.5;
          }

          .futsal-resource-buttons {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .futsal-panel {
            border-radius: 18px !important;
            padding: 16px 14px 24px !important;
          }

          .futsal-section {
            border-radius: 13px !important;
            padding: 14px !important;
          }

          .futsal-progress {
            max-width: 100%;
            margin: 4px auto 24px;
          }

          .futsal-step-number {
            width: 40px;
            height: 48px;
            border-radius: 13px;
            font-size: 13px;
          }

          .futsal-step-label {
            border-radius: 9px;
            padding: 5px 7px;
            font-size: 6px;
            border-width: 1px;
          }

          .futsal-step-line {
            min-width: 8px;
            margin: 0 4px 25px;
          }

          .futsal-input {
            padding: 12px 13px !important;
            font-size: 13px !important;
          }

          .futsal-label {
            font-size: 11px !important;
            margin-bottom: 9px !important;
          }

          .futsal-primary-button {
            padding: 15px 16px !important;
            font-size: 16px !important;
            border-radius: 16px !important;
          }

          .futsal-secondary-button {
            padding: 11px 16px !important;
            font-size: 12px !important;
            border-radius: 12px !important;
          }

          .futsal-upload-area {
            min-height: 210px;
            border-radius: 16px;
            padding: 16px 12px;
            gap: 12px;
          }

          .futsal-upload-title {
            font-size: 13px !important;
          }

          .futsal-upload-icon {
            font-size: 38px !important;
          }

          .futsal-payment-info {
            font-size: 12px !important;
            overflow-wrap: anywhere;
          }

          .futsal-total-box {
            padding: 12px !important;
          }

          .futsal-footer {
            margin-top: 20px !important;
            padding-top: 14px !important;
            font-size: 10px !important;
          }
        }

        @media (max-width: 360px) {
          .futsal-step-number {
            width: 35px;
            height: 43px;
          }

          .futsal-step-label {
            padding: 4px 5px;
            font-size: 5.5px;
          }

          .futsal-step-line {
            min-width: 5px;
            margin-left: 3px;
            margin-right: 3px;
          }
        }
      `}</style>

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

        }}
      >
        <div className="futsal-container">
          <div className="futsal-notice">
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

            <strong className="futsal-notice-text">
              Pastikan data yang kamu isi sudah sesuai
            </strong>

            <div className="futsal-resource-buttons">
              <button
                type="button"
                style={resourceButtonStyle}
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1CCw9lNwLfiDpU9ItVvk72xeD3igkh3dj/view?usp=drive_link",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Lihat guidebook ↗
              </button>

              <button
                type="button"
                style={resourceButtonStyle}
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1Tflq9U9gp-oV8W5cLw-aCiIpknxXmKPS/view?usp=drive_link",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Lihat twibbon ↗
              </button>
            </div>
          </div>

          <section className="futsal-panel" style={panelStyle}>
            <nav
              aria-label="Progress pendaftaran"
              className="futsal-progress"
            >
              {steps.map((item, index) => (
                <div
                  key={item.number}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: index < steps.length - 1 ? 1 : "0 0 auto",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 9,
                    }}
                  >
                    <div
                      aria-current={
                        step === item.number ? "step" : undefined
                      }
                      className="futsal-step-number"
                      style={{
                        background:
                          step === item.number ? "#ffb400" : "#000",
                        color:
                          step === item.number ? "#000" : "#ffb400",
                      }}
                    >
                      {item.number}
                    </div>

                    <span className="futsal-step-label">
                      {item.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="futsal-step-line"
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
                className="futsal-form"
              >
                <div className="futsal-section" style={sectionStyle}>
                  <label
                    htmlFor="officialName"
                    className="futsal-label"
                    style={labelStyle}
                  >
                    Nama Guru Pembina / Official
                  </label>

                  <input
                    id="officialName"
                    value={officialName}
                    onChange={(event) =>
                      setOfficialName(event.target.value)
                    }
                    placeholder="Nama Guru Pembina"
                    autoComplete="name"
                    required
                    className="futsal-input"
                    style={inputStyle}
                  />

                  <small
                    style={{
                      display: "block",
                      color: "#cfcfcf",
                      marginTop: 10,
                    }}
                  >
                    Isi dengan nama guru pembina atau official tim.
                  </small>
                </div>

                <div className="futsal-section" style={sectionStyle}>
                  <label
                    htmlFor="officialPhone"
                    className="futsal-label"
                    style={labelStyle}
                  >
                    Nomor WhatsApp Official/Guru Pembina
                  </label>

                  <input
                    id="officialPhone"
                    type="tel"
                    value={officialPhone}
                    onChange={(event) =>
                      setOfficialPhone(event.target.value)
                    }
                    placeholder="Nomor WhatsApp"
                    autoComplete="tel"
                    required
                    className="futsal-input"
                    style={inputStyle}
                  />

                  <small
                    style={{
                      display: "block",
                      color: "#cfcfcf",
                      marginTop: 10,
                    }}
                  >
                    Gunakan nomor WhatsApp aktif untuk koordinasi panitia.
                  </small>
                </div>

                <div className="futsal-section" style={sectionStyle}>
                  <label
                    htmlFor="school"
                    className="futsal-label"
                    style={labelStyle}
                  >
                    Asal Sekolah
                  </label>

                  <input
                    id="school"
                    value={school}
                    onChange={(event) =>
                      setSchool(event.target.value)
                    }
                    placeholder="Nama Sekolah"
                    autoComplete="organization"
                    required
                    className="futsal-input"
                    style={inputStyle}
                  />

                  <small
                    style={{
                      display: "block",
                      color: "#cfcfcf",
                      marginTop: 10,
                    }}
                  >
                    Tuliskan nama lengkap sekolah serta kota atau
                    kabupaten delegasi tim.
                  </small>
                </div>

                <div className="futsal-form-actions">
                  <button
                    type="button"
                    className="futsal-btn-primary futsal-primary-button"
                    onClick={goToPayment}
                    style={primaryButtonStyle}
                  >
                    LANJUT
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                }}
              >
                <section
                  className="futsal-section"
                  style={sectionStyle}
                >
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
                    <span style={{ fontSize: 14 }}>
                      ♙ &nbsp; REKENING RESMI PANITIA ARMASO:
                    </span>
                    <span>Rp150.000 (1 Tim)</span>
                  </div>

                  <div
                    className="futsal-payment-info"
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
                    <span>
                      Bank Syariah Indonesia (BSI):
                      3846-01-045309-53-9
                    </span>
                    <strong>
                      Panitia Armaso 2027 (Rafi Aziz)
                    </strong>
                  </div>
                </section>

                <section
                  className="futsal-section"
                  style={sectionStyle}
                >
                  <h2
                    style={{
                      color: "#ffb400",
                      fontSize: 14,
                      margin: "0 0 22px",
                      fontWeight: 900,
                    }}
                  >
                    ♙ &nbsp; TOTAL PEMBAYARAN
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                      gap: 14,
                      marginBottom: 22,
                    }}
                  >
                    <div
                      className="futsal-total-box"
                      style={{
                        border: "1px solid #ffb400",
                        borderRadius: 14,
                        padding: 16,
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          color: "#ffb400",
                          fontSize: 13,
                        }}
                      >
                        TOTAL TIM
                      </strong>
                      <span
                        style={{
                          display: "block",
                          marginTop: 6,
                          fontSize: 12,
                        }}
                      >
                        1 TIM
                      </span>
                    </div>

                    <div
                      className="futsal-total-box"
                      style={{
                        border: "1px solid #ffb400",
                        borderRadius: 14,
                        padding: 16,
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          color: "#ffb400",
                          fontSize: 10,
                        }}
                      >
                        TARIF PER TIM
                      </strong>
                      <span
                        style={{
                          display: "block",
                          marginTop: 6,
                          fontWeight: 900,
                        }}
                      >
                        {formatRupiah(REGISTRATION_FEE)}
                      </span>
                    </div>
                  </div>

                  <div
                    className="futsal-total-box"
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
                      <strong style={{ color: "#ffb400" }}>
                        TOTAL PEMBAYARAN KESELURUHAN
                      </strong>
                      <small
                        style={{
                          display: "block",
                          marginTop: 8,
                        }}
                      >
                        1 tim × {formatRupiah(REGISTRATION_FEE)}
                      </small>
                    </div>

                    <strong
                      style={{
                        color: "#ffb400",
                        fontSize: 17,
                      }}
                    >
                      {formatRupiah(REGISTRATION_FEE)}
                    </strong>
                  </div>
                </section>

                <div className="futsal-form-actions">
                  <button
                    type="button"
                    className="futsal-btn-primary futsal-primary-button"
                    onClick={goToUpload}
                    style={primaryButtonStyle}
                  >
                    LANJUT
                  </button>

                  <button
                    type="button"
                    className="futsal-btn-secondary futsal-secondary-button"
                    onClick={goBack}
                    style={secondaryButtonStyle}
                  >
                    KEMBALI
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 26,
                }}
              >
                <section
                  className="futsal-section"
                  style={sectionStyle}
                >
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
                    <span style={{ fontSize: 14 }}>
                      ♙ &nbsp; REKENING RESMI PANITIA ARMASO:
                    </span>
                    <span>Rp150.000 (1 Tim)</span>
                  </div>

                  <div
                    className="futsal-payment-info"
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
                    <span>
                      Bank Syariah Indonesia (BSI):
                      3846-01-045309-53-9
                    </span>
                    <strong>
                      Panitia Armaso 2027 (Rafi Aziz)
                    </strong>
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
                      className="futsal-upload-area"
                    >
                      <span
                        aria-hidden="true"
                        className="futsal-upload-icon"
                        style={{
                          fontSize: 48,
                          color: "#ffb400",
                        }}
                      >
                        ▤
                      </span>

                      <strong
                        className="futsal-upload-title"
                        style={{
                          color: "#ffb400",
                          fontSize: 16,
                        }}
                      >
                        KLIK UNTUK UNGGAH BUKTI TRANSFER
                      </strong>

                      <small
                        style={{
                          color: "#ddd",
                          fontSize: 11,
                        }}
                      >
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
                        <strong style={{ overflowWrap: "anywhere" }}>
                          {paymentProof.name}
                        </strong>

                        <small
                          style={{
                            display: "block",
                            color: "#ffb400",
                            marginTop: 8,
                          }}
                        >
                          {(paymentProof.size / 1024).toFixed(1)} KB
                          {" · "}Siap diunggah
                        </small>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="futsal-secondary-button"
                        style={secondaryButtonStyle}
                      >
                        HAPUS FILE
                      </button>
                    </div>
                  )}
                </section>

                <div className="futsal-form-actions">
                  <button
                    type="submit"
                    className="futsal-btn-primary futsal-primary-button"
                    disabled={loading}
                    style={primaryButtonStyle}
                  >
                    {loading
                      ? "MENGIRIM PENDAFTARAN..."
                      : "KIRIM PENDAFTARAN"}
                  </button>

                  <button
                    type="button"
                    className="futsal-btn-secondary futsal-secondary-button"
                    onClick={goBack}
                    style={secondaryButtonStyle}
                  >
                    KEMBALI
                  </button>
                </div>
              </form>
            )}

            <footer
              className="futsal-footer"
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
    </>
  );
}
