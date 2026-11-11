"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMyRegistration,
  UnauthorizedError,
  type PaymentStatus,
  type Registration,
} from "../../lib/registration";

const STATUS_UI: Record<
  PaymentStatus,
  { label: string; hint: string; text: string }
> = {
  pending: {
    label: "Menunggu verifikasi",
    hint: "Bukti pembayaranmu sudah kami terima dan sedang dicek panitia.",
    text: "text-yellow-300",
  },
  verified: {
    label: "Terverifikasi",
    hint: "Pembayaran diterima. Timmu resmi terdaftar.",
    text: "text-green-300",
  },
  rejected: {
    label: "Ditolak",
    hint: "Pembayaran belum bisa diterima. Hubungi panitia untuk mengirim ulang bukti.",
    text: "text-red-300",
  },
};

const CARD =
  "rounded-3xl border-2 border-amber-400 bg-[#061f20]/85 p-5";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<Registration | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getMyRegistration());
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        router.replace("/login");
        return;
      }
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  function logout() {
    try {
      localStorage.removeItem("token");
    } catch { }
    router.push("/login");
  }

  const firstName = data?.participant.name.split(" ")[0];

  return (
    <div
      className="min-h-screen bg-[#173737] bg-cover bg-bottom bg-no-repeat text-white md:bg-fixed"
      style={{ backgroundImage: "url('/images/home/bg-1.png')" }}
    >
      {/* Sidebar */}
      <aside className="flex items-center justify-between gap-3 border-amber-400/30 bg-[#04181a] p-4 md:border-r md:fixed md:inset-y-0 md:left-0 md:w-40 md:flex-col md:justify-start md:py-8">
        <div className="text-center md:mt-auto md:mb-auto">
          <p className="font-bold">{firstName ?? "Peserta"}</p>
          <button
            className="mt-3 w-full rounded bg-amber-400 px-4 py-1.5 text-xs font-bold text-[#1a0a02]"
            aria-current="page"
          >
            Beranda
          </button>
        </div>
        <button
          onClick={logout}
          className="rounded bg-red-700 px-4 py-1.5 text-xs font-bold hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:w-full"
        >
          Keluar
        </button>
      </aside>

      {/* Konten */}
      <main className="p-6 sm:p-10 md:ml-40">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-end">

          </div>


          {data && !loading && (
            <>
              <p className="mt-2 text-sm font-semibold">Selamat datang di dashboard</p>
              <h1 className="mt-1 text-5xl font-bold text-amber-400">
                Halo, {firstName}!
              </h1>
              <p className="mt-2 text-xs text-white/80">
                Nomor registrasi{" "}
                <span className="font-bold">{data.participant.registration_code}</span>
                {" · "}Tim <span className="font-bold">{data.team.name}</span>
              </p>

              <h2 className="mt-10 text-2xl font-bold">Berkas pendaftaran</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <TeamCard team={data.team} status={data.payment.status} />
                <PaymentCard payment={data.payment} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function TeamCard({
  team,
  status,
}: {
  team: Registration["team"];
  status: PaymentStatus;
}) {
  const ui = STATUS_UI[status];
  return (
    <section className={CARD}>
      <h3 className="text-xl font-bold">Profil tim</h3>
      <p className="mt-1 text-xs text-white/70">
        Cabang {team.category}
      </p>
      <ul className="mt-4 space-y-2">
        {team.members.map((m, i) => (
          <li
            key={m}
            className={`rounded-lg p-3 ${i === 0 ? "border border-amber-400/60 bg-amber-500/25" : "border border-amber-400/20 bg-[#0b2e2f]"}`}
          >
            <p className="text-[11px] font-semibold text-white/80">
              {i === 0 ? "Ketua tim" : `Anggota ${i}`}
            </p>
            <p className="text-sm font-bold">{m}</p>
            <p className={`mt-0.5 text-[11px] ${ui.text}`}>{ui.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PaymentCard({ payment }: { payment: Registration["payment"] }) {
  const ui = STATUS_UI[payment.status];
  return (
    <section className={CARD}>
      <h3 className="text-xl font-bold">Bukti pembayaran</h3>
      <div className="mt-4 rounded-lg border border-amber-400/20 bg-[#0b2e2f] p-3">
        <p className="text-[11px] font-semibold text-white/80">Status</p>
        <p className={`text-sm font-bold ${ui.text}`}>{ui.label}</p>
      </div>
      <p className="mt-3 text-sm text-white/80">{ui.hint}</p>

      {payment.status === "rejected" && payment.rejection_reason && (
        <p className="mt-3 rounded-lg bg-red-500/15 p-3 text-sm text-red-200">
          Alasan: {payment.rejection_reason}
        </p>
      )}

      {payment.proof_url && (
        <a
          href={payment.proof_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-amber-300 underline underline-offset-4 hover:text-amber-200"
        >
          Lihat bukti pembayaran
        </a>
      )}
    </section>
  );
}

function Skeleton() {
  return (
    <div className="mt-8 space-y-4" aria-busy="true" aria-label="Memuat data">
      <div className="h-12 w-64 animate-pulse rounded bg-white/10" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-64 animate-pulse rounded-xl bg-white/10" />
        <div className="h-64 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}