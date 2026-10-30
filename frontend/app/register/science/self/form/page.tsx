
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type {
    ChangeEvent,
    CSSProperties,
    FormEvent,
} from "react";

type Step = 1 | 2 | 3;

const PRICE_PER_STUDENT = 35_000;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCOUNT_NUMBER = "3846-01-045309-53-9";
const ACCOUNT_OWNER = "PANITIA ARMASO 2027 (Rafi Aziz)";

const steps: { number: Step; label: string }[] = [
    { number: 1, label: "DATA PESERTA" },
    { number: 2, label: "PEMBAYARAN" },
    { number: 3, label: "UPLOAD BUKTI" },
];

const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(amount);



const sectionStyle: CSSProperties = {
    border: "1.5px solid #ffb400",
    borderRadius: 14,
    padding: "14px 16px",
    background: "#050505",
    boxSizing: "border-box",
};

const activeSectionStyle: CSSProperties = {
    ...sectionStyle,
    boxShadow: "0 0 18px rgba(255,180,0,.24)",
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
    border: "1.5px solid #ffb400",
    borderRadius: 11,
    padding: "12px 14px",
    color: "#fff",
    fontSize: 13,
    outline: "none",
};

const primaryButtonStyle: CSSProperties = {
    width: "100%",
    maxWidth: 440,
    minHeight: 48,
    alignSelf: "center",
    boxSizing: "border-box",
    border: 0,
    borderRadius: 18,
    background: "#ffb400",
    color: "#050505",
    padding: "12px 22px",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
};

const secondaryButtonStyle: CSSProperties = {
    width: "100%",
    maxWidth: 440,
    minHeight: 48,
    alignSelf: "center",
    boxSizing: "border-box",
    border: "1px solid #ffb400",
    borderRadius: 18,
    background: "#080808",
    color: "#ffb400",
    padding: "12px 22px",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
};

const linkButtonStyle: CSSProperties = {
    border: "1px solid #ffb400",
    borderRadius: 12,
    background: "#080808",
    color: "#ffb400",
    padding: "8px 12px",
    fontSize: 9,
    fontWeight: 900,
    cursor: "pointer",
    width: "auto",
    minHeight: "unset",
    whiteSpace: "nowrap",
};


const panelStyle: CSSProperties = {
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    boxSizing: "border-box",
    color: "#fff",
    background: "rgba(0,0,0,.76)",
    border: "5px solid #a77d2d",
    borderRadius: 42,
    padding: "clamp(18px, 2.5vw, 28px) 22px 26px",
    boxShadow: "0 12px 40px rgba(0,0,0,.3)",
};


export default function IndividualRegistrationPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState<Step>(1);

    const [participantName, setParticipantName] = useState("");
    const [school, setSchool] = useState("");
    const [participantPhone, setParticipantPhone] = useState("");

    const [paymentProof, setPaymentProof] = useState<File | null>(null);

    const totalPayment = PRICE_PER_STUDENT;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const changeStep = (nextStep: Step) => {
        setStep(nextStep);
        scrollToTop();
    };

    const goToPayment = () => {
        if (
            !participantName.trim() ||
            !school.trim() ||
            !participantPhone.trim()
        ) {
            alert("Lengkapi nama lengkap, asal sekolah, dan nomor WhatsApp.");
            return;
        }

        changeStep(2);
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

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

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!paymentProof) {
            alert("Unggah bukti pembayaran terlebih dahulu.");
            return;
        }

        // Integrasi backend belum ditambahkan.
        // Endpoint dan payload mengikuti kontrak dari tim backend.
        console.info("Data pendaftaran individu:", {
            participantName,
            school,
            participantPhone,
            totalPayment,
            paymentProof,
        });

        alert(
            "Data frontend sudah tervalidasi. Pengiriman ke server belum diaktifkan."
        );
    };

    return (
        <main
            className="relative z-0"
            style={{
                minHeight: "100vh",
                isolation: "isolate",
                paddingTop: "clamp(90px, 10vw, 125px)",
            }}
        >
            {/* BACKGROUND */}
            <Image
                src="/images/home/bg-form-olim-individu.png"
                alt=""
                fill
                priority
                sizes="100vw"
                style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    zIndex: -2,
                }}
            />

            {/* OVERLAY */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: -1,
                    pointerEvents: "none",
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,.04), rgba(0,0,0,.35) 42%, #000 100%)",
                }}
            />

            <div
                style={{
                    width: "calc(100% - 32px)",
                    maxWidth: 850,
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    boxSizing: "border-box",
                    paddingBottom: 24,
                }}
            >
                {/* TITLE */}
                <div
                    style={{
                        width: "min(100%, 580px)",
                        alignSelf: "center",
                        textAlign: "center",
                        background: "#160800",
                        border: "2px solid #ffb400",
                        borderRadius: 28,
                        padding: "17px 20px",
                        color: "#ffb400",
                        fontSize: "clamp(14px, 1.7vw, 20px)",
                        fontWeight: 900,
                        textTransform: "uppercase",
                    }}
                >
                    PENDAFTARAN OLIMPIADE SAINS MANDIRI
                </div>

                {/* INFORMATION BANNER */}
                <div
                    style={{
                        width: "min(100%, 700px)",
                        alignSelf: "center",
                        background: "#000",
                        border: "1.5px solid #ffb400",
                        borderRadius: 22,
                        padding: "16px 18px",
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

                    <strong
                        style={{
                            color: "#ffb400",
                            fontSize: 10,
                            flex: "1 1 180px",
                        }}
                    >
                        Pastikan data yang kamu isi sudah sesuai
                    </strong>

                    <a
                        href=""
                        onClick={(event) => event.preventDefault()}
                        aria-disabled="true"
                        title="Tautan guidebook belum tersedia"
                        style={{
                            ...linkButtonStyle,
                            textDecoration: "none",
                            opacity: 0.7,
                        }}
                    >
                        Lihat guidebook ↗
                    </a>

                    <a
                        href=""
                        onClick={(event) => event.preventDefault()}
                        aria-disabled="true"
                        title="Tautan twibbon belum tersedia"
                        style={{
                            ...linkButtonStyle,
                            textDecoration: "none",
                            opacity: 0.7,
                        }}
                    >
                        Lihat twibbon ↗
                    </a>
                </div>

                {/* MAIN PANEL */}
                <section style={panelStyle}>
                    {/* PROGRESS */}
                    <nav
                        aria-label="Progress pendaftaran"
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            maxWidth: 500,
                            width: "100%",
                            margin: "4px auto 14px",
                        }}
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
                                        gap: 8,
                                    }}
                                >
                                    <div
                                        aria-current={
                                            step === item.number ? "step" : undefined
                                        }
                                        style={{
                                            width: "clamp(40px, 5vw, 56px)",
                                            height: "clamp(46px, 6vw, 62px)",
                                            border: "2px solid #ffb400",
                                            borderRadius: 17,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background:
                                                step === item.number ? "#ffb400" : "#000",
                                            color:
                                                step === item.number ? "#000" : "#ffb400",
                                            fontSize: 14,
                                            fontWeight: 900,
                                            transition: "all .3s ease",
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
                                        aria-hidden="true"
                                        style={{
                                            height: 1,
                                            background: "#ffb400",
                                            flex: 1,
                                            minWidth: 8,
                                            margin: "0 5px 28px",
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* STEP 1 */}
                    {step === 1 && (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                goToPayment();
                            }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 9,
                                padding: "12px 4px 0",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 7,
                                }}
                            >
                                <label htmlFor="participantName" style={labelStyle}>
                                    NAMA LENGKAP*
                                </label>

                                <input
                                    id="participantName"
                                    value={participantName}
                                    onChange={(event) =>
                                        setParticipantName(event.target.value)
                                    }

                                    autoComplete="name"
                                    required
                                    style={inputStyle}
                                />

                                <small
                                    style={{
                                        display: "block",
                                        color: "#ddd",
                                        fontSize: 9,
                                    }}
                                >
                                    Isi sesuai dengan nama yang tercantum pada rapor atau kartu pelajar.
                                </small>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 7,
                                }}
                            >
                                <label htmlFor="school" style={labelStyle}>
                                    ASAL SEKOLAH*
                                </label>

                                <input
                                    id="school"
                                    value={school}
                                    onChange={(event) => setSchool(event.target.value)}
                                    placeholder=""
                                    autoComplete="organization"
                                    required
                                    style={inputStyle}
                                />

                                <small
                                    style={{
                                        display: "block",
                                        color: "#ddd",
                                        fontSize: 9,
                                    }}
                                >
                                    Isi dengan nama sekolah peserta.
                                </small>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 7,
                                }}
                            >
                                <label htmlFor="participantPhone" style={labelStyle}>
                                    NOMOR WHATSAPP*
                                </label>

                                <input
                                    id="participantPhone"
                                    type="tel"
                                    value={participantPhone}
                                    onChange={(event) =>
                                        setParticipantPhone(event.target.value)
                                    }

                                    autoComplete="tel"
                                    required
                                    style={inputStyle}
                                />

                                <small
                                    style={{
                                        display: "block",
                                        color: "#ddd",
                                        fontSize: 9,
                                    }}
                                >
                                    Isi dengan nomor whatsapp peserta.
                                </small>
                            </div>

                            <div
                                style={{
                                    borderTop: "1px solid #b98200",
                                    marginTop: 70,
                                    paddingTop: 13,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                }}
                            >
                                <button
                                    type="submit"
                                    className="futsal-btn-primary"
                                    style={primaryButtonStyle}
                                >
                                    LANJUT
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                                maxWidth: 700,
                                margin: "0 auto",
                            }}
                        >
                            {/* ACCOUNT INFORMATION */}
                            <section style={activeSectionStyle}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: 10,
                                    }}
                                >
                                    <strong
                                        style={{
                                            color: "#ffb400",
                                            fontSize: 12,
                                        }}
                                    >
                                        REKENING RESMI PANITIA ARMASO:
                                    </strong>

                                    <strong
                                        style={{
                                            color: "#ffb400",
                                            fontSize: 12,
                                        }}
                                    >
                                        Rp 35.000 (1 Peserta)
                                    </strong>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: 8,
                                        color: "#ddd",
                                        fontSize: 10,
                                        marginTop: 10,
                                    }}
                                >
                                    <span>Bank Syariah Indonesia (BSI): {ACCOUNT_NUMBER}</span>
                                    <strong>{ACCOUNT_OWNER}</strong>
                                </div>
                            </section>

                            {/* PAYMENT SUMMARY */}
                            <section style={activeSectionStyle}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 16,
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            color: "#ffb400",
                                            fontSize: 24,
                                            lineHeight: 1,
                                        }}
                                    >
                                        ♙
                                    </span>

                                    <strong
                                        style={{
                                            color: "#ffb400",
                                            fontSize: 11,
                                        }}
                                    >
                                        JUMLAH PESERTA
                                    </strong>
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "minmax(0, 1fr) auto",
                                        gap: 12,
                                    }}
                                >
                                    <div
                                        style={{
                                            border: "1px solid #ffb400",
                                            borderRadius: 11,
                                            padding: 9,
                                        }}
                                    >
                                        <small
                                            style={{
                                                display: "block",
                                                color: "#ffb400",
                                                fontSize: 9,
                                                fontWeight: 900,
                                            }}
                                        >
                                            TOTAL PESERTA
                                        </small>

                                        <strong
                                            style={{
                                                display: "block",
                                                marginTop: 6,
                                                fontSize: 10,
                                            }}
                                        >
                                            1 PESERTA
                                        </strong>
                                    </div>

                                    <div
                                        style={{
                                            border: "1px solid #ffb400",
                                            borderRadius: 11,
                                            padding: 9,
                                            minWidth: 95,
                                        }}
                                    >
                                        <small
                                            style={{
                                                display: "block",
                                                color: "#ffb400",
                                                fontSize: 8,
                                                fontWeight: 900,
                                            }}
                                        >
                                            TARIF PER PESERTA
                                        </small>

                                        <strong
                                            style={{
                                                display: "block",
                                                marginTop: 6,
                                                fontSize: 12,
                                            }}
                                        >
                                            {formatRupiah(PRICE_PER_STUDENT)}
                                        </strong>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        border: "1px solid #ffb400",
                                        borderRadius: 11,
                                        padding: 11,
                                        marginTop: 16,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: 10,
                                    }}
                                >
                                    <div>
                                        <strong
                                            style={{
                                                color: "#ffb400",
                                                fontSize: 11,
                                            }}
                                        >
                                            TOTAL PEMBAYARAN KESELURUHAN
                                        </strong>

                                        <small
                                            style={{
                                                display: "block",
                                                color: "#ddd",
                                                marginTop: 6,
                                                fontSize: 9,
                                            }}
                                        >
                                            1 peserta × Rp 35.000
                                        </small>
                                    </div>

                                    <strong
                                        style={{
                                            color: "#ffb400",
                                            fontSize: 14,
                                        }}
                                    >
                                        {formatRupiah(totalPayment)}
                                    </strong>
                                </div>
                            </section>

                            {/* BUTTONS */}
                            <div
                                style={{
                                    borderTop: "1px solid #b98200",
                                    paddingTop: 13,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => changeStep(3)}
                                    className="futsal-btn-primary"
                                    style={primaryButtonStyle}
                                >
                                    LANJUT
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changeStep(1)}
                                    className="futsal-btn-secondary"
                                    style={secondaryButtonStyle}
                                >
                                    KEMBALI
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                maxWidth: 700,
                                margin: "0 auto",
                            }}
                        >
                            {/* ACCOUNT INFORMATION */}
                            <section style={activeSectionStyle}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: 10,
                                    }}
                                >
                                    <strong
                                        style={{
                                            color: "#ffb400",
                                            fontSize: 11,
                                        }}
                                    >
                                        REKENING RESMI PANITIA ARMASO:
                                    </strong>

                                    <strong
                                        style={{
                                            color: "#ffb400",
                                            fontSize: 11,
                                        }}
                                    >
                                        Rp 35.000 (1 Peserta)
                                    </strong>
                                </div>

                                <div
                                    style={{
                                        color: "#ddd",
                                        fontSize: 10,
                                        marginTop: 10,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    Bank Syariah Indonesia (BSI): {ACCOUNT_NUMBER}
                                </div>

                                <strong
                                    style={{
                                        display: "block",
                                        color: "#ddd",
                                        fontSize: 10,
                                        marginTop: 6,
                                    }}
                                >
                                    {ACCOUNT_OWNER}
                                </strong>
                            </section>

                            {/* UPLOAD */}
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
                                            minHeight: 190,
                                            border: "1.5px dashed #ffb400",
                                            borderRadius: 16,
                                            background: "rgba(90,31,0,.92)",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            gap: 13,
                                            padding: 22,
                                            cursor: "pointer",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                fontSize: 38,
                                                color: "#ffb400",
                                            }}
                                        >
                                            ▤
                                        </span>

                                        <strong
                                            style={{
                                                color: "#ffb400",
                                                fontSize: 13,
                                            }}
                                        >
                                            KLIK UNTUK UNGGAH BUKTI TRANSFER
                                        </strong>

                                        <small
                                            style={{
                                                color: "#ddd",
                                                fontSize: 9,
                                            }}
                                        >
                                            Format JPG, PNG, atau PDF (Ukuran Maksimal 5MB)
                                        </small>
                                    </label>
                                ) : (
                                    <div
                                        style={{
                                            border: "1.5px solid #ffb400",
                                            borderRadius: 16,
                                            background: "rgba(0,0,0,.9)",
                                            padding: 18,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 14,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <div style={{ minWidth: 0 }}>
                                            <strong
                                                style={{
                                                    overflowWrap: "anywhere",
                                                    fontSize: 12,
                                                }}
                                            >
                                                {paymentProof.name}
                                            </strong>

                                            <small
                                                style={{
                                                    display: "block",
                                                    color: "#ffb400",
                                                    marginTop: 7,
                                                }}
                                            >
                                                {(paymentProof.size / 1024).toFixed(1)} KB ·
                                                Siap diunggah
                                            </small>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            style={secondaryButtonStyle}
                                        >
                                            HAPUS FILE
                                        </button>
                                    </div>
                                )}
                            </section>

                            {/* BUTTONS */}
                            <div
                                style={{
                                    borderTop: "1px solid #b98200",
                                    paddingTop: 13,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                }}
                            >
                                <button
                                    type="submit"
                                    className="futsal-btn-primary"
                                    style={primaryButtonStyle}
                                >
                                    LANJUT
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changeStep(2)}
                                    className="futsal-btn-secondary"
                                    style={secondaryButtonStyle}
                                >
                                    KEMBALI
                                </button>
                            </div>
                        </form>
                    )}

                    {/* PANEL FOOTER */}
                    <footer
                        style={{
                            borderTop: "1px solid rgba(255,180,0,.35)",
                            marginTop: 24,
                            paddingTop: 16,
                            color: "#ddd",
                            textAlign: "center",
                            fontSize: 11,
                            lineHeight: 1.6,
                        }}
                    >
                        Data pendaftaran dan bukti transfer akan diverifikasi oleh
                        panitia pelaksana ARMASO 2027.
                    </footer>
                </section>
            </div>
        </main>
    );
}
