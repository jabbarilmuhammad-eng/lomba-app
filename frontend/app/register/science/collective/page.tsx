"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Participant = {
  fullName: string;
  school: string;
  field: "MATEMATIKA" | "IPA" | "IPS";
};

export default function ScienceCollectiveRegistrationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [coordinatorName, setCoordinatorName] = useState("");
  const [coordinatorPhone, setCoordinatorPhone] = useState("");

  const [participants, setParticipants] = useState<Participant[]>([
    {
      fullName: "",
      school: "",
      field: "MATEMATIKA",
    },
  ]);

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Kalkulasi Biaya Otomatis: Setiap 10 peserta berbayar, dapat bonus 1 slot gratis
  // 11 total = 10 berbayar + 1 gratis; 22 total = 20 berbayar + 2 gratis
  const totalParticipants = participants.length;
  const freeSlots = Math.floor(totalParticipants / 11);
  const paidParticipants = totalParticipants - freeSlots;
  const pricePerParticipant = 35000;
  const totalCost = paidParticipants * pricePerParticipant;
  const totalSavings = freeSlots * pricePerParticipant;
  const nextBonusTarget = (freeSlots + 1) * 11;
  const remainingForBonus = nextBonusTarget - totalParticipants;

  const addParticipant = () => {
    // Default nama sekolah menggunakan nama sekolah peserta pertama jika sudah diisi
    const defaultSchool = participants[0]?.school || "";

    setParticipants([
      ...participants,
      {
        fullName: "",
        school: defaultSchool,
        field: "MATEMATIKA",
      },
    ]);
  };

  const removeParticipant = (index: number) => {
    if (participants.length === 1) {
      alert("Minimal harus ada 1 peserta dalam formulir kolektif!");
      return;
    }

    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (
    index: number,
    field: keyof Participant,
    value: string,
  ) => {
    const updatedParticipants = [...participants];

    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    } as Participant;

    setParticipants(updatedParticipants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coordinatorPhone.trim()) {
      alert("Nomor WhatsApp official / guru pembina wajib diisi!");
      return;
    }

    const hasEmptyData = participants.some(
      (participant) =>
        !participant.fullName.trim() ||
        !participant.school.trim(),
    );

    if (hasEmptyData) {
      alert("Semua data peserta (Nama Lengkap dan Asal Sekolah) wajib diisi!");
      return;
    }

    // Validasi asal sekolah harus seragam untuk pendaftaran delegasi kolektif
    const primarySchool = participants[0].school.trim().toLowerCase();
    const isSameSchool = participants.every(
      (p) => p.school.trim().toLowerCase() === primarySchool,
    );

    if (!isSameSchool) {
      alert("Semua siswa dalam satu pendaftaran delegasi kolektif harus berasal dari sekolah yang sama!");
      return;
    }

    if (!paymentProof) {
      alert("Bukti pembayaran transfer wajib diunggah!");
      return;
    }

    setLoading(true);

    try {
      // 1. Submit pendaftaran science kolektif
      const response = await fetch("http://localhost:3001/registrations/science", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "COLLECTIVE",
          participants: participants.map((participant) => ({
            fullName: participant.fullName.trim(),
            school: participant.school.trim(),
            field: participant.field,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.registrationId) {
        // 2. Unggah berkas bukti pembayaran langsung
        try {
          const formData = new FormData();
          formData.append("amount", String(totalCost));
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
            DELEGASI SEKOLAH RESMI ARMASO 2027
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
            SCIENCE <span style={{ color: "#f6d066" }}>KOLEKTIF ARMASO</span>
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
            Daftarkan seluruh siswa delegasi sekolah Anda sekaligus untuk mengikuti cabang Olimpiade Matematika, IPA, atau IPS tanpa batasan kuota peserta.
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
                  Rp 35.000 / Peserta
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
                <i className="fa-solid fa-gift" />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#e2d2b5", opacity: 0.7, fontWeight: "600" }}>
                  Bonus Delegasi
                </div>
                <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ffd873" }}>
                  Tiap 10 Siswa, +1 Gratis
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
                <i className="fa-solid fa-users" />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#e2d2b5", opacity: 0.7, fontWeight: "600" }}>
                  Kapasitas Delegasi
                </div>
                <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ffffff" }}>
                  Bebas (Tanpa Batas)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card Container */}
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
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "30px", width: "100%", boxSizing: "border-box" }}>
            {/* Form Section Header dengan Counter Badge yang Aman */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "14px",
                borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
                paddingBottom: "18px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                  <i className="fa-solid fa-id-card-clip" />
                </div>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                    Formulir Delegasi Sekolah
                  </h2>
                  <p style={{ fontSize: "12px", color: "#e2d2b5", opacity: 0.75, margin: 0 }}>
                    Lengkapi kontak guru penanggung jawab dan tambahkan seluruh siswa delegasi
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  backgroundColor: "#23180f",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  borderRadius: "12px",
                  color: "#f6d066",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                <i className="fa-solid fa-users" style={{ fontSize: "12px" }} />
                <span>{participants.length} Siswa Terdaftar</span>
              </div>
            </div>

            {/* Kontak Guru Pembina / Penanggung Jawab (Satu-satunya Kontak WhatsApp yang Dibutuhkan) */}
            <div
              style={{
                backgroundColor: "#0c0906",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                borderRadius: "18px",
                padding: "24px 20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                  paddingBottom: "12px",
                }}
              >
                <i className="fa-solid fa-user-tie" style={{ color: "#f6d066", fontSize: "16px" }} />
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff", margin: "0 0 2px 0", textTransform: "uppercase" }}>
                    Kontak Guru Pembina / Penanggung Jawab
                  </h3>
                  <p style={{ fontSize: "11px", color: "#e2d2b5", opacity: 0.7, margin: 0 }}>
                    Kontak WhatsApp utama untuk konfirmasi pendaftaran, technical meeting, dan surat tugas peserta delegasi
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "18px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
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
                    Nama Guru Pembina / Official
                  </label>
                  <input
                    type="text"
                    placeholder="Nama guru pembina / pendamping"
                    value={coordinatorName}
                    onChange={(e) => setCoordinatorName(e.target.value)}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      backgroundColor: "#16100b",
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      color: "#fbf5e6",
                      fontSize: "14px",
                      outline: "none",
                      display: "block",
                    }}
                  />
                </div>

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
                    placeholder="Masukkan nomor WhatsApp"
                    value={coordinatorPhone}
                    onChange={(e) => setCoordinatorPhone(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      backgroundColor: "#16100b",
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      color: "#fbf5e6",
                      fontSize: "14px",
                      outline: "none",
                      display: "block",
                    }}
                  />
                  <span style={{ display: "block", fontSize: "11px", color: "#e2d2b5", opacity: 0.6, marginTop: "6px" }}>
                    Narahubung utama perwakilan sekolah.
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Participants List (Unlimited Delegasi) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", boxSizing: "border-box" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#ffd873", margin: 0, textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fa-solid fa-clipboard-user" />
                  Daftar Siswa Delegasi ({participants.length})
                </h3>
                <span style={{ fontSize: "12px", color: "#e2d2b5", opacity: 0.75 }}>
                  Bebas tambah siswa tanpa batasan
                </span>
              </div>

              {participants.map((participant, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#0c0906",
                    border: "1px solid rgba(212, 175, 55, 0.4)",
                    borderRadius: "18px",
                    padding: "24px 20px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                    width: "100%",
                  }}
                >
                  {/* Header Kartu Peserta */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                      paddingBottom: "12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          backgroundColor: "#23180f",
                          border: "1px solid #d4af37",
                          color: "#f6d066",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </span>
                      <h4 style={{ fontSize: "15px", fontWeight: "bold", color: "#ffffff", margin: 0, textTransform: "uppercase" }}>
                        Peserta {index + 1}
                      </h4>
                    </div>

                    {participants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParticipant(index)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 12px",
                          backgroundColor: "rgba(127, 29, 29, 0.4)",
                          border: "1px solid rgba(239, 68, 68, 0.4)",
                          color: "#fca5a5",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <i className="fa-solid fa-trash-can" style={{ fontSize: "11px" }} />
                        <span>Hapus</span>
                      </button>
                    )}
                  </div>

                  {/* Input Grid Peserta (Nama Lengkap, Asal Sekolah, Bidang Kompetisi) */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                      gap: "18px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    {/* Nama Lengkap Siswa */}
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
                        Nama Lengkap Siswa <span style={{ color: "#f6d066" }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nama lengkap siswa"
                        value={participant.fullName}
                        onChange={(e) => updateParticipant(index, "fullName", e.target.value)}
                        required
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          backgroundColor: "#16100b",
                          border: "1px solid rgba(212, 175, 55, 0.4)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          color: "#fbf5e6",
                          fontSize: "14px",
                          outline: "none",
                          display: "block",
                        }}
                      />
                      <span style={{ display: "block", fontSize: "11px", color: "#e2d2b5", opacity: 0.6, marginTop: "6px" }}>
                        Sesuai nama rapor / kartu pelajar.
                      </span>
                    </div>

                    {/* Asal Sekolah */}
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
                        Nama Sekolah <span style={{ color: "#f6d066" }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Masukkan asal sekolah"
                        value={participant.school}
                        onChange={(e) => updateParticipant(index, "school", e.target.value)}
                        required
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          backgroundColor: "#16100b",
                          border: "1px solid rgba(212, 175, 55, 0.4)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          color: "#fbf5e6",
                          fontSize: "14px",
                          outline: "none",
                          display: "block",
                        }}
                      />
                      <span style={{ display: "block", fontSize: "11px", color: "#e2d2b5", opacity: 0.6, marginTop: "6px" }}>
                        Nama sekolah asal delegasi.
                      </span>
                    </div>

                    {/* Bidang Kompetisi */}
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
                        Bidang Kompetisi <span style={{ color: "#f6d066" }}>*</span>
                      </label>
                      <select
                        value={participant.field}
                        onChange={(e) =>
                          updateParticipant(
                            index,
                            "field",
                            e.target.value as "MATEMATIKA" | "IPA" | "IPS",
                          )
                        }
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          backgroundColor: "#16100b",
                          border: "1px solid rgba(212, 175, 55, 0.4)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          color: "#fbf5e6",
                          fontSize: "14px",
                          outline: "none",
                          display: "block",
                          cursor: "pointer",
                        }}
                      >
                        <option value="MATEMATIKA" style={{ backgroundColor: "#16100b", color: "#fbf5e6" }}>
                          Matematika
                        </option>
                        <option value="IPA" style={{ backgroundColor: "#16100b", color: "#fbf5e6" }}>
                          IPA (Sains)
                        </option>
                        <option value="IPS" style={{ backgroundColor: "#16100b", color: "#fbf5e6" }}>
                          IPS (Sosial)
                        </option>
                      </select>
                      <span style={{ display: "block", fontSize: "11px", color: "#e2d2b5", opacity: 0.6, marginTop: "6px" }}>
                        Cabang bidang studi yang diikuti.
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol Tambah Peserta Delegasi (Unlimited) */}
            <div>
              <button
                type="button"
                onClick={addParticipant}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  backgroundColor: "#23180f",
                  border: "1px solid #d4af37",
                  color: "#f6d066",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <i className="fa-solid fa-user-plus" />
                <span>Tambah Peserta Delegasi</span>
              </button>
            </div>

            {/* Rincian Kalkulator Biaya Otomatis (Real-time Calculation) */}
            <div
              style={{
                backgroundColor: "#0c0906",
                border: "1px solid rgba(212, 175, 55, 0.5)",
                borderRadius: "18px",
                padding: "24px 20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
              }}
            >
              {/* Header Kalkulator */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
                  paddingBottom: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className="fa-solid fa-calculator" style={{ color: "#f6d066", fontSize: "18px" }} />
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#ffffff", margin: 0, textTransform: "uppercase" }}>
                    Rincian Kalkulasi Biaya Pendaftaran
                  </h3>
                </div>

                <span
                  style={{
                    backgroundColor: "#23180f",
                    border: "1px solid #d4af37",
                    color: "#f6d066",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Promo 10 + 1 Gratis
                </span>
              </div>

              {/* Status Bonus Info Banner */}
              {freeSlots > 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    backgroundColor: "rgba(35, 60, 25, 0.6)",
                    border: "1px solid rgba(74, 222, 128, 0.5)",
                    borderRadius: "12px",
                    color: "#86efac",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  <i className="fa-solid fa-circle-check" style={{ fontSize: "18px", flexShrink: 0 }} />
                  <div>
                    <strong>Selamat!</strong> Anda mendapatkan <strong>{freeSlots} Slot Peserta GRATIS</strong> (Hemat Rp {totalSavings.toLocaleString("id-ID")}).
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    backgroundColor: "rgba(35, 24, 15, 0.8)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "12px",
                    color: "#e2d2b5",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  <i className="fa-solid fa-circle-info" style={{ color: "#f6d066", fontSize: "16px", flexShrink: 0 }} />
                  <div>
                    Daftarkan 10 peserta berbayar untuk mendapatkan <strong>1 slot gratis</strong>!
                    {remainingForBonus > 0 && (
                      <span> (Tambah <strong>{remainingForBonus} siswa lagi</strong> untuk klaim bonus 1 slot gratis).</span>
                    )}
                  </div>
                </div>
              )}

              {/* Tabel Rincian */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "14px",
                  padding: "10px 0",
                }}
              >
                <div style={{ backgroundColor: "#16100b", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                  <div style={{ fontSize: "11px", color: "#e2d2b5", opacity: 0.7, textTransform: "uppercase", marginBottom: "4px" }}>
                    Total Peserta
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff" }}>
                    {totalParticipants} Siswa
                  </div>
                </div>

                <div style={{ backgroundColor: "#16100b", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                  <div style={{ fontSize: "11px", color: "#e2d2b5", opacity: 0.7, textTransform: "uppercase", marginBottom: "4px" }}>
                    Peserta Berbayar
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#f6d066" }}>
                    {paidParticipants} Siswa
                  </div>
                </div>

                <div style={{ backgroundColor: "#16100b", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                  <div style={{ fontSize: "11px", color: "#e2d2b5", opacity: 0.7, textTransform: "uppercase", marginBottom: "4px" }}>
                    Slot Gratis (Bonus)
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: freeSlots > 0 ? "#4ade80" : "#e2d2b5" }}>
                    {freeSlots} Siswa {freeSlots > 0 ? "🎉" : ""}
                  </div>
                </div>

                <div style={{ backgroundColor: "#16100b", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                  <div style={{ fontSize: "11px", color: "#e2d2b5", opacity: 0.7, textTransform: "uppercase", marginBottom: "4px" }}>
                    Tarif per Siswa
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff" }}>
                    Rp 35.000
                  </div>
                </div>
              </div>

              {/* Total Keseluruhan Box */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  padding: "16px 20px",
                  backgroundColor: "#16100b",
                  border: "1px solid #d4af37",
                  borderRadius: "14px",
                  marginTop: "6px",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", color: "#e2d2b5", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>
                    TOTAL PEMBAYARAN KESELURUHAN
                  </div>
                  <div style={{ fontSize: "12px", color: "#e2d2b5", opacity: 0.75, marginTop: "2px" }}>
                    {paidParticipants} peserta berbayar × Rp 35.000
                  </div>
                </div>

                <div style={{ fontSize: "28px", fontWeight: "900", color: "#f6d066", letterSpacing: "0.5px" }}>
                  Rp {totalCost.toLocaleString("id-ID")}
                </div>
              </div>
            </div>

            {/* Informasi Rekening Resmi & Upload Bukti Pembayaran */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
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
                  <span style={{ color: "#ffffff" }}>
                    Rp {totalCost.toLocaleString("id-ID")} ({totalParticipants} Siswa{freeSlots > 0 ? ` • ${freeSlots} Gratis` : ""})
                  </span>
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
                id="science-collective-proof-upload"
              />

              {!paymentProof ? (
                <label
                  htmlFor="science-collective-proof-upload"
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

            {/* Tombol Submit Pendaftaran */}
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
                  padding: "18px 24px",
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
                    <span>Mengirim Formulir Delegasi &amp; Bukti Pembayaran...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-crown" />
                    <span>
                      Kirim Pendaftaran Olimpiade Kolektif ({totalParticipants} Siswa • Rp {totalCost.toLocaleString("id-ID")}) →
                    </span>
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
            <span>Data seluruh delegasi dan bukti transfer Anda akan diverifikasi oleh panitia pelaksana ARMASO 2027</span>
          </div>
        </div>
      </div>
    </div>
  );
}