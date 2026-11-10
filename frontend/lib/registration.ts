// Kontrak API yang disepakati dengan teman backend.
// Saat endpoint siap: ubah USE_MOCK jadi false, selesai.

export type PaymentStatus = "pending" | "verified" | "rejected";

export type Registration = {
    participant: { name: string; whatsapp: string; registration_code: string };
    team: { name: string; category: string; members: string[] };
    payment: {
        status: PaymentStatus;
        rejection_reason: string | null;
        proof_url: string | null;
    };
};

export class UnauthorizedError extends Error { }

const USE_MOCK = true;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// Mock: buka /dashboard?status=verified atau ?status=rejected untuk mencoba tiap tampilan.
function mockRegistration(): Registration {
    const q = new URLSearchParams(window.location.search).get("status");
    const status: PaymentStatus =
        q === "verified" || q === "rejected" ? q : "pending";
    return {
        participant: {
            name: "Budi Santoso",
            whatsapp: "081234567890",
            registration_code: "FUT-0123",
        },
        team: {
            name: "FC Madiun",
            category: "Futsal",
            members: ["Budi Santoso", "Andi Pratama", "Rizky Maulana", "Dimas Aji", "Fajar Nugroho"],
        },
        payment: {
            status,
            rejection_reason:
                status === "rejected" ? "Nominal transfer tidak sesuai dengan biaya pendaftaran." : null,
            proof_url: null,
        },
    };
}

export async function getMyRegistration(): Promise<Registration> {
    if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 600));
        return mockRegistration();
    }

    const token = localStorage.getItem("token");
    if (!token) throw new UnauthorizedError();

    const res = await fetch(`${API_URL}/api/me/registration`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    if (res.status === 401) throw new UnauthorizedError();
    if (!res.ok) throw new Error(`Gagal memuat data (${res.status})`);
    return res.json();
}