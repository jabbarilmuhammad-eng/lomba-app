
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak sesuai!");
      return;
    }

    // Integrasi API registrasi menunggu kontrak backend.
    alert("Formulir sudah siap. Integrasi pembuatan akun akan diaktifkan setelah API backend tersedia.");
  };

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#1c0a00] text-white">

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#ffb206]/[0.06] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#ff6d00]/[0.06] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,178,6,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,178,6,0.5) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      {/* LEFT PANEL */}
      <section className="relative hidden min-h-screen w-1/2 flex-col justify-between border-r border-[#ffb206]/15 px-12 py-10 lg:flex xl:px-20">

        <Link href="/" className="relative z-10 flex w-fit items-center gap-3">
          <Image
            src="/images/home/logo-armaso.png"
            alt="Logo ARMASO 2027"
            width={150}
            height={60}
            priority
            className="h-auto w-[125px] object-contain"
          />

          <div className="h-9 w-px bg-[#ffb206]/40" />

          <span className="font-poppins text-sm font-bold tracking-wider text-[#ffb206]">
            ARMASO 2027
          </span>
        </Link>

        <div className="relative z-10 max-w-xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-12 bg-[#ffb206]" />
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.35em] text-[#ffb206]">
              Join ARMASO
            </span>
          </div>

          <h1 className="font-poppins text-5xl font-black leading-[1.15] xl:text-6xl">
            Begin Your
            <span className="mt-2 block text-[#ffb206]">
              Journey.
            </span>
          </h1>

          <p className="mt-7 max-w-md font-poppins text-sm leading-8 text-[#d8c2a8] xl:text-base">
            Buat akun peserta ARMASO 2027 dan persiapkan dirimu untuk menjadi
            bagian dari kompetisi akademik dan olahraga yang penuh prestasi.
          </p>

          <div className="mt-12 flex items-center gap-4">
            <div className="h-[2px] w-16 bg-[#ffb206]" />
            <div className="h-2 w-2 rotate-45 border border-[#ffb206]" />
            <div className="h-px w-20 bg-[#ffb206]/30" />
          </div>

          <p className="mt-5 font-poppins text-xs uppercase tracking-[0.25em] text-[#a98a6a]">
            Classic & Majestic Egyptian Theme
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <p className="font-poppins text-xs text-[#a98a6a]">
            © 2027 ARMASO
          </p>

          <p className="font-poppins text-xs tracking-widest text-[#a98a6a]">
            AR-RAHMAT
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-24 right-16 h-32 w-32 rotate-45 border border-[#ffb206]/10" />
        <div className="pointer-events-none absolute bottom-32 right-24 h-16 w-16 rotate-45 border border-[#ffb206]/10" />
      </section>

      {/* RIGHT PANEL */}
      <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-10 lg:w-1/2 lg:px-12">

        {/* MOBILE BRANDING */}
        <div className="mb-8 flex flex-col items-center lg:hidden">
          <Link href="/">
            <Image
              src="/images/home/logo-armaso.png"
              alt="Logo ARMASO 2027"
              width={180}
              height={72}
              priority
              className="h-auto w-[150px] object-contain"
            />
          </Link>

          <p className="mt-3 font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#ffb206]">
            ARMASO 2027
          </p>
        </div>

        <div className="w-full max-w-md">

          {/* FORM HEADING */}
          <div className="mb-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-[#ffb206]" />
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#ffb206]">
                Participant Registration
              </span>
            </div>

            <h2 className="font-poppins text-3xl font-black tracking-tight sm:text-4xl">
              Create <span className="text-[#ffb206]">Account.</span>
            </h2>

            <p className="mt-3 font-poppins text-sm leading-7 text-[#bda58c]">
              Buat akun peserta untuk memulai perjalananmu di ARMASO 2027.
            </p>
          </div>

          {/* REGISTER FORM */}
          <form onSubmit={handleRegister} className="space-y-5">

            {/* FULL NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-poppins text-sm font-semibold text-[#f3dfc5]"
              >
                Nama Lengkap
              </label>

              <input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full rounded-xl border border-[#ffb206]/20 bg-[#2b1205] px-5 py-3.5 font-poppins text-sm text-white outline-none transition placeholder:text-[#8e735a] hover:border-[#ffb206]/40 focus:border-[#ffb206] focus:ring-2 focus:ring-[#ffb206]/10"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-poppins text-sm font-semibold text-[#f3dfc5]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-[#ffb206]/20 bg-[#2b1205] px-5 py-3.5 font-poppins text-sm text-white outline-none transition placeholder:text-[#8e735a] hover:border-[#ffb206]/40 focus:border-[#ffb206] focus:ring-2 focus:ring-[#ffb206]/10"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-poppins text-sm font-semibold text-[#f3dfc5]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Buat password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-xl border border-[#ffb206]/20 bg-[#2b1205] px-5 py-3.5 font-poppins text-sm text-white outline-none transition placeholder:text-[#8e735a] hover:border-[#ffb206]/40 focus:border-[#ffb206] focus:ring-2 focus:ring-[#ffb206]/10"
              />

              <p className="mt-2 font-poppins text-[10px] text-[#9e8062]">
                Minimal 8 karakter.
              </p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-poppins text-sm font-semibold text-[#f3dfc5]"
              >
                Konfirmasi Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-xl border border-[#ffb206]/20 bg-[#2b1205] px-5 py-3.5 font-poppins text-sm text-white outline-none transition placeholder:text-[#8e735a] hover:border-[#ffb206]/40 focus:border-[#ffb206] focus:ring-2 focus:ring-[#ffb206]/10"
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-[#ffb206] px-6 py-4 font-poppins text-sm font-black uppercase tracking-[0.15em] text-[#1c0a00] transition duration-300 hover:-translate-y-1 hover:bg-[#ffc43d] hover:shadow-[0_8px_30px_rgba(255,178,6,0.2)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Buat Akun
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-7 border-t border-[#ffb206]/15 pt-6 text-center">
            <p className="font-poppins text-sm text-[#bda58c]">
              Sudah memiliki akun?
              <Link
                href="/login"
                className="ml-2 font-bold text-[#ffb206] transition hover:text-[#ffd16b] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

          {/* BACK TO HOME */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-poppins text-xs font-medium text-[#9e8062] transition hover:text-[#ffb206]"
            >
              <span aria-hidden="true">←</span>
              Kembali ke Beranda
            </Link>
          </div>
        </div>

        <p className="mt-10 font-poppins text-[10px] tracking-widest text-[#80664e] lg:hidden">
          © 2027 ARMASO
        </p>
      </section>
    </main>
  );
}
