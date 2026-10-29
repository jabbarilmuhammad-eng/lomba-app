/**
 * Kuota Sport (futsal).
 *
 * Tampilan di beranda = SISA kuota = total - verified.
 * "verified" = jumlah tim futsal berstatus VERIFIED di backend (termasuk pendaftaran offline).
 *
 * Sumber data (diatur lewat variabel lingkungan, tanpa mengubah komponen):
 *   NEXT_PUBLIC_FUTSAL_QUOTA_URL = URL endpoint backend, mis. https://api.contoh.com/api/quota/futsal
 *   Respons yang diharapkan: { "total": 16, "verified": 5 }
 * Jika variabel itu kosong, dipakai nilai sementara di bawah (FALLBACK_VERIFIED).
 */

export const FUTSAL_QUOTA_TOTAL = 16;
export const FUTSAL_QUOTA_REFRESH_MS = 60_000;

/** Nilai sementara selama endpoint backend belum tersedia. Tidak dipakai jika URL endpoint diisi. */
const FALLBACK_VERIFIED = 0;

export interface FutsalQuota {
  total: number;
  verified: number;
}

export function remainingQuota(quota: FutsalQuota): number {
  return Math.max(0, quota.total - quota.verified);
}

function toCount(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : null;
}

export async function getFutsalQuota(signal?: AbortSignal): Promise<FutsalQuota> {
  const url = process.env.NEXT_PUBLIC_FUTSAL_QUOTA_URL;
  if (!url) {
    return { total: FUTSAL_QUOTA_TOTAL, verified: FALLBACK_VERIFIED };
  }

  const response = await fetch(url, { signal, cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Kuota futsal: HTTP ${response.status}`);
  }

  const data: unknown = await response.json();
  const record = (data ?? {}) as Record<string, unknown>;
  const verified = toCount(record.verified);
  if (verified === null) {
    throw new Error("Kuota futsal: respons tidak valid");
  }
  return { total: toCount(record.total) ?? FUTSAL_QUOTA_TOTAL, verified };
}
