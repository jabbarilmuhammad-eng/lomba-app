
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://lomba-app-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (response.ok) {
        alert("Login berhasil!");
        router.push("/dashboard");
      } else {
        alert(data.message || "Login gagal!");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghubungi backend!");
    } finally {
      setLoading(false);
    }
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

        {/* LOGO */}
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

        {/* MAIN CONTENT */}
        <div className="relative z-10 max-w-xl">

          {/* DECORATIVE SYMBOL */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-12 bg-[#ffb206]" />
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.35em] text-[#ffb206]">
              Welcome to ARMASO
            </span>
          </div>

          <h1 className="font-poppins text-5xl font-black leading-[1.15] xl:text-6xl">
            Unleash Your
            <span className="mt-2 block text-[#ffb206]">
              Potential.
            </span>
          </h1>

          <p className="mt-7 max-w-md font-poppins text-sm leading-8 text-[#d8c2a8] xl:text-base">
            Bergabunglah dalam ARMASO 2027 dan jadilah bagian dari generasi
            berprestasi melalui kompetisi Olimpiade dan Olahraga.
          </p>

          {/* DECORATIVE LINE */}
          <div className="mt-12 flex items-center gap-4">
            <div className="h-[2px] w-16 bg-[#ffb206]" />
            <div className="h-2 w-2 rotate-45 border border-[#ffb206]" />
            <div className="h-px w-20 bg-[#ffb206]/30" />
          </div>

          <p className="mt-5 font-poppins text-xs uppercase tracking-[0.25em] text-[#a98a6a]">
            Classic & Majestic Egyptian Theme
          </p>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 flex items-center justify-between">
          <p className="font-poppins text-xs text-[#a98a6a]">
            © 2027 ARMASO
          </p>
          <p className="font-poppins text-xs tracking-widest text-[#a98a6a]">
            AR-RAHMAT
          </p>
        </div>

        {/* DECORATIVE CORNER */}
        <div className="pointer-events-none absolute bottom-24 right-16 h-32 w-32 rotate-45 border border-[#ffb206]/10" />
        <div className="pointer-events-none absolute bottom-32 right-24 h-16 w-16 rotate-45 border border-[#ffb206]/10" />
      </section>

      {/* RIGHT PANEL */}
      <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-10 lg:w-1/2 lg:px-12">

        {/* MOBILE BRANDING */}
        <div className="mb-10 flex flex-col items-center lg:hidden">
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
          <div className="mb-10">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-[#ffb206]" />
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#ffb206]">
                Participant Portal
              </span>
            </div>

            <h2 className="font-poppins text-3xl font-black tracking-tight sm:text-4xl">
              Welcome <span className="text-[#ffb206]">Back.</span>
            </h2>

            <p className="mt-3 font-poppins text-sm leading-7 text-[#bda58c]">
              Masuk ke akun peserta untuk mengakses dashboard ARMASO 2027.
            </p>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-3 block font-poppins text-sm font-semibold text-[#f3dfc5]"
              >
                Email
              </label>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#ffb206]/20 bg-[#2b1205] px-5 py-4 font-poppins text-sm text-white outline-none transition placeholder:text-[#8e735a] hover:border-[#ffb206]/40 focus:border-[#ffb206] focus:ring-2 focus:ring-[#ffb206]/10"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-3 block font-poppins text-sm font-semibold text-[#f3dfc5]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#ffb206]/20 bg-[#2b1205] px-5 py-4 font-poppins text-sm text-white outline-none transition placeholder:text-[#8e735a] hover:border-[#ffb206]/40 focus:border-[#ffb206] focus:ring-2 focus:ring-[#ffb206]/10"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-[#ffb206] px-6 py-4 font-poppins text-sm font-black uppercase tracking-[0.15em] text-[#1c0a00] transition duration-300 hover:-translate-y-1 hover:bg-[#ffc43d] hover:shadow-[0_8px_30px_rgba(255,178,6,0.2)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10">
                {loading ? "Memproses..." : "Login to Account"}
              </span>
            </button>
          </form>

          {/* REGISTER LINK */}
          <div className="mt-9 border-t border-[#ffb206]/15 pt-7 text-center">
            <p className="font-poppins text-sm text-[#bda58c]">
              Belum memiliki akun?
              <Link
                href="/register"
                className="ml-2 font-bold text-[#ffb206] transition hover:text-[#ffd16b] hover:underline"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>

          {/* BACK TO HOME */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-poppins text-xs font-medium text-[#9e8062] transition hover:text-[#ffb206]"
            >
              <span aria-hidden="true">←</span>
              Kembali ke Beranda
            </Link>
          </div>

        </div>

        {/* MOBILE FOOTER */}
        <p className="mt-12 font-poppins text-[10px] tracking-widest text-[#80664e] lg:hidden">
          © 2027 ARMASO
        </p>
      </section>
    </main>
  );
}
