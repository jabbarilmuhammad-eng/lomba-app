"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/api/auth/login",
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
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-gray-400">
          Masuk ke akun peserta kamu.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="font-semibold text-white hover:underline"
          >
            Daftar
          </a>
        </p>
      </div>
    </main>
  );
}