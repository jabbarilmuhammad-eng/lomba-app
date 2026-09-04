"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://lomba-app-production.up.railway.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (response.ok) {
  alert("Register berhasil!");
      } else {
      alert("Register gagal!");
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
          Daftar Akun
        </h1>

        <p className="mt-2 text-gray-400">
          Buat akun untuk mengikuti kompetisi.
        </p>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Nama Lengkap
            </label>

            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
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
            Buat Akun
          </button>
        </form>
      </div>
    </main>
  );
}