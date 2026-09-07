import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          ← Kembali ke Beranda
        </Link>

        <div className="mt-10 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Portal Pendaftaran
          </h1>

          <p className="mt-4 text-gray-400">
            Pilih jenis kompetisi yang ingin kamu ikuti.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* SELF */}
          <Link
            href="/register/science/self"
            className="rounded-2xl border border-gray-800 p-8 transition hover:border-white hover:bg-gray-900"
          >
            <div className="text-4xl">🧑</div>

            <h2 className="mt-6 text-2xl font-bold">
              Science Individu
            </h2>

            <p className="mt-3 text-gray-400">
              Daftar kompetisi Science sebagai peserta individu.
            </p>

            <div className="mt-6 font-semibold">
              Daftar Sendiri →
            </div>
          </Link>

          {/* COLLECTIVE */}
          <Link
            href="/register/science/collective"
            className="rounded-2xl border border-gray-800 p-8 transition hover:border-white hover:bg-gray-900"
          >
            <div className="text-4xl">👥</div>

            <h2 className="mt-6 text-2xl font-bold">
              Science Kolektif
            </h2>

            <p className="mt-3 text-gray-400">
              Daftar beberapa peserta sekaligus untuk kompetisi Science.
            </p>

            <div className="mt-6 font-semibold">
              Daftar Kolektif →
            </div>
          </Link>

          {/* FUTSAL */}
          <Link
            href="/register/futsal"
            className="rounded-2xl border border-gray-800 p-8 transition hover:border-white hover:bg-gray-900"
          >
            <div className="text-4xl">⚽</div>

            <h2 className="mt-6 text-2xl font-bold">
              Futsal Competition
            </h2>

            <p className="mt-3 text-gray-400">
              Daftarkan tim futsal kamu untuk ARMASO 2027.
            </p>

            <div className="mt-6 font-semibold">
              Daftar Futsal →
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}