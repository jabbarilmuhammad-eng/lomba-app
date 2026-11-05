"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { ChangeEvent, CSSProperties, FormEvent } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ACCOUNT_NUMBER = "3846-01-045309-53-9";
const ACCOUNT_OWNER = "PANITIA ARMASO 2027 (Rafi Aziz)";

const GOLD = "#ffb400";

const panelStyle: CSSProperties = {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    boxSizing: "border-box",
    color: "#fff",
    background: "rgba(0,0,0,.65)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    border: `2px solid ${GOLD}`,
    borderRadius: 28,
    padding: "clamp(22px, 4vw, 38px) clamp(18px, 3vw, 30px)",
    boxShadow: "0 12px 40px rgba(0,0,0,.3)",
};

const titlePillStyle: CSSProperties = {
    width: "min(100%, 460px)",
    alignSelf: "center",
    textAlign: "center",
    background: "#160800",
    border: `2px solid ${GOLD}`,
    borderRadius: 28,
    padding: "16px 20px",
    color: GOLD,
    fontSize: "clamp(14px, 1.7vw, 19px)",
    fontWeight: 900,
    textTransform: "uppercase",
    boxSizing: "border-box",
};

const sectionStyle: CSSProperties = {
    border: `1.5px solid ${GOLD}`,
    borderRadius: 14,
    padding: "14px 16px",
    background: "#050505",
    boxSizing: "border-box",
};

const labelStyle: CSSProperties = {
    display: "block",
    color: GOLD,
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
    border: `1.5px solid ${GOLD}`,
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
    background: GOLD,
    color: "#050505",
    padding: "12px 22px",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
};

const secondaryButtonStyle: CSSProperties = {
    ...primaryButtonStyle,
    border: `1px solid ${GOLD}`,
    background: "#080808",
    color: GOLD,
};

function PageShell({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <main
            className="relative z-0"
            style={{
                minHeight: "100vh",
                isolation: "isolate",
                paddingTop: "clamp(90px, 10vw, 125px)",
            }}
        >
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
                    gap: 16,
                    boxSizing: "border-box",
                    paddingBottom: 60,
                }}
            >
                <div style={titlePillStyle}>{title}</div>

                <section style={panelStyle}>{children}</section>
            </div>
        </main>
    );
}

function RegistrationIdBox({ id }: { id: string }) {
    return (
        <div style={{ ...sectionStyle, boxShadow: "0 0 18px rgba(255,180,0,.24)" }}>
            <small
                style={{
                    display: "block",
                    color: GOLD,
                    fontSize: 10,
                    fontWeight: 900,
                    textTransform: "uppercase",
                }}
            >
                Registration ID
            </small>

            <strong
                style={{
                    display: "block",
                    marginTop: 6,
                    fontSize: 26,
                    letterSpacing: 1,
                }}
            >
                {id}
            </strong>
        </div>
    );
}

function SuccessView({ registrationId }: { registrationId: string }) {
    const nextSteps = [
        "Panitia sedang memeriksa bukti transfer kamu.",
        "Status pembayaran diperbarui setelah diverifikasi.",
        "Pantau WhatsApp yang kamu daftarkan untuk informasi selanjutnya.",
    ];

    return (
        <PageShell title="PENDAFTARAN BERHASIL">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    textAlign: "center",
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        width: 84,
                        height: 84,
                        margin: "0 auto",
                        borderRadius: "50%",
                        border: `3px solid ${GOLD}`,
                        color: GOLD,
                        fontSize: 42,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,180,0,.08)",
                        boxShadow: "0 0 28px rgba(255,180,0,.35)",
                    }}
                >
                    ✓
                </div>

                <div>
                    <h1
                        style={{
                            margin: 0,
                            color: GOLD,
                            fontSize: "clamp(18px, 2.6vw, 26px)",
                            fontWeight: 900,
                            textTransform: "uppercase",
                        }}
                    >
                        Terima kasih sudah mendaftar!
                    </h1>

                    <p
                        style={{
                            margin: "12px auto 0",
                            maxWidth: 520,
                            color: "#ddd",
                            fontSize: 13,
                            fontWeight: 700,
                            lineHeight: 1.7,
                        }}
                    >
                        Data pendaftaran dan bukti pembayaran kamu sudah kami
                        terima.
                    </p>
                </div>

                <RegistrationIdBox id={registrationId} />

                <div style={{ ...sectionStyle, textAlign: "left" }}>
                    <strong
                        style={{
                            display: "block",
                            color: GOLD,
                            fontSize: 12,
                            fontWeight: 700,
                            marginBottom: 12,
                            textTransform: "uppercase",
                        }}
                    >
                        Langkah selanjutnya
                    </strong>

                    <ol
                        style={{
                            margin: 0,
                            paddingLeft: 18,
                            color: "#ddd",
                            fontSize: 12,
                            fontWeight: 700,
                            lineHeight: 1.9,
                        }}
                    >
                        {nextSteps.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                </div>

                <div
                    style={{
                        borderTop: "1px solid #b98200",
                        paddingTop: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    <Link
                        href="/"
                        className="futsal-btn-primary"
                        style={primaryButtonStyle}
                    >
                        KEMBALI KE BERANDA
                    </Link>
                </div>

                <footer
                    style={{
                        color: "#ddd",
                        fontSize: 11,
                        lineHeight: 1.6,
                    }}
                >
                    Simpan Registration ID sebagai referensi pendaftaranmu.
                </footer>
            </div>
        </PageShell>
    );
}

function UploadView({
    registrationId,
    retry,
    onUploaded,
}: {
    registrationId: string | null;
    retry: boolean;
    onUploaded: () => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [whatsapp, setWhatsapp] = useState("");
    const [proof, setProof] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;

        if (!file) {
            setProof(null);
            return;
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError("Format file harus JPG, PNG, atau WEBP.");
            event.target.value = "";
            setProof(null);
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError("Ukuran file maksimal 5 MB.");
            event.target.value = "";
            setProof(null);
            return;
        }

        setError("");
        setProof(file);
    };

    const removeFile = () => {
        setProof(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loading) return;

        if (!registrationId) {
            setError("Registration ID tidak ditemukan.");
            return;
        }

        if (!whatsapp.trim()) {
            setError("Nomor WhatsApp wajib diisi.");
            return;
        }

        if (!proof) {
            setError("Bukti pembayaran wajib diunggah.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("registrationId", registrationId);
            formData.append("whatsapp", whatsapp.trim());
            formData.append("proof", proof);

            const response = await fetch(`${API_BASE_URL}/payments`, {
                method: "POST",
                body: formData, // jangan set Content-Type manual
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const message = Array.isArray(data.message)
                    ? data.message.join(", ")
                    : data.message;

                setError(message || "Pembayaran gagal dikirim.");
                return;
            }

            onUploaded();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            console.error(err);
            setError("Gagal menghubungi server. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageShell title="PEMBAYARAN">
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                }}
            >
                <p
                    style={{
                        margin: 0,
                        textAlign: "center",
                        color: "#ddd",
                        fontSize: 12,
                        lineHeight: 1.7,
                    }}
                >
                    {retry
                        ? "Data pendaftaran sudah tersimpan, tetapi bukti transfer belum terunggah. Silakan unggah ulang di bawah ini."
                        : "Silakan lakukan pembayaran, lalu unggah bukti transfer."}
                </p>

                <RegistrationIdBox id={registrationId ?? "-"} />

                <section style={sectionStyle}>
                    <strong
                        style={{
                            display: "block",
                            color: GOLD,
                            fontSize: 11,
                            textTransform: "uppercase",
                        }}
                    >
                        Rekening resmi panitia ARMASO
                    </strong>

                    <div
                        style={{
                            color: "#ddd",
                            fontSize: 11,
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
                            fontSize: 11,
                            marginTop: 4,
                        }}
                    >
                        {ACCOUNT_OWNER}
                    </strong>
                </section>

                <div>
                    <label htmlFor="whatsapp" style={labelStyle}>
                        NOMOR WHATSAPP PENDAFTAR*
                    </label>

                    <input
                        id="whatsapp"
                        type="tel"
                        value={whatsapp}
                        onChange={(event) => setWhatsapp(event.target.value)}
                        placeholder="Nomor yang sama saat mendaftar"
                        autoComplete="tel"
                        required
                        style={inputStyle}
                    />

                    <small
                        style={{
                            display: "block",
                            color: "#ddd",
                            fontSize: 9,
                            marginTop: 7,
                        }}
                    >
                        Harus sama persis dengan nomor WhatsApp yang diisi saat
                        pendaftaran.
                    </small>
                </div>

                <div>
                    <input
                        ref={fileInputRef}
                        id="paymentProof"
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />

                    {!proof ? (
                        <label
                            htmlFor="paymentProof"
                            style={{
                                minHeight: 170,
                                border: `1.5px dashed ${GOLD}`,
                                borderRadius: 16,
                                background: "rgba(90,31,0,.92)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                gap: 12,
                                padding: 22,
                                cursor: "pointer",
                                boxSizing: "border-box",
                            }}
                        >
                            <span
                                aria-hidden="true"
                                style={{ fontSize: 36, color: GOLD }}
                            >
                                ▤
                            </span>

                            <strong style={{ color: GOLD, fontSize: 13 }}>
                                KLIK UNTUK UNGGAH BUKTI TRANSFER
                            </strong>

                            <small style={{ color: "#ddd", fontSize: 9 }}>
                                Format JPG, PNG, atau WEBP (Ukuran Maksimal 5MB)
                            </small>
                        </label>
                    ) : (
                        <div
                            style={{
                                border: `1.5px solid ${GOLD}`,
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
                                    {proof.name}
                                </strong>

                                <small
                                    style={{
                                        display: "block",
                                        color: GOLD,
                                        marginTop: 7,
                                    }}
                                >
                                    {(proof.size / 1024).toFixed(1)} KB · Siap
                                    diunggah
                                </small>
                            </div>

                            <button
                                type="button"
                                onClick={removeFile}
                                disabled={loading}
                                style={{
                                    ...secondaryButtonStyle,
                                    maxWidth: 200,
                                }}
                            >
                                HAPUS FILE
                            </button>
                        </div>
                    )}
                </div>

                {error && (
                    <p
                        role="alert"
                        style={{
                            margin: 0,
                            color: "#ff6b6b",
                            fontSize: 12,
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </p>
                )}

                <div
                    style={{
                        borderTop: "1px solid #b98200",
                        paddingTop: 14,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    <button
                        type="submit"
                        disabled={loading}
                        className="futsal-btn-primary"
                        style={{
                            ...primaryButtonStyle,
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "MENGIRIM..." : "KIRIM BUKTI PEMBAYARAN"}
                    </button>
                </div>
            </form>
        </PageShell>
    );
}

function PaymentContent() {
    const searchParams = useSearchParams();

    const registrationId = searchParams.get("registrationId");
    const successParam = searchParams.get("success");

    const [uploaded, setUploaded] = useState(false);

    if (registrationId && (successParam === "true" || uploaded)) {
        return <SuccessView registrationId={registrationId} />;
    }

    return (
        <UploadView
            registrationId={registrationId}
            retry={successParam === "false"}
            onUploaded={() => setUploaded(true)}
        />
    );
}

export default function PaymentPage() {
    return (
        <Suspense
            fallback={
                <div
                    style={{
                        minHeight: "100vh",
                        padding: 32,
                        textAlign: "center",
                        color: "#ddd",
                    }}
                >
                    Memuat...
                </div>
            }
        >
            <PaymentContent />
        </Suspense>
    );
}