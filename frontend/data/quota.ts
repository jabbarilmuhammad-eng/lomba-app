export type FutsalQuota = {
  total: number;
  verified: number;
};

export const FUTSAL_QUOTA_REFRESH_MS = 30_000;

const STATIC_QUOTA: FutsalQuota = {
  total: 16,
  verified: 0,
};

const QUOTA_URL = process.env.NEXT_PUBLIC_FUTSAL_QUOTA_URL;

export async function getFutsalQuota(signal?: AbortSignal): Promise<FutsalQuota> {
  if (!QUOTA_URL) return STATIC_QUOTA;

  const res = await fetch(QUOTA_URL, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`Quota request failed: ${res.status}`);

  const data = (await res.json()) as Partial<FutsalQuota>;
  return {
    total: Number(data.total ?? STATIC_QUOTA.total),
    verified: Number(data.verified ?? 0),
  };
}

export function remainingQuota(quota: FutsalQuota): number {
  return Math.max(0, quota.total - quota.verified);
}