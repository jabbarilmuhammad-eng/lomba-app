"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const registrationId = searchParams.get("registrationId");

  const [amount, setAmount] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!registrationId) {
      alert("Registration ID tidak ditemukan!");
      return;
    }

    if (!amount.trim()) {
      alert("Nominal pembayaran wajib diisi!");
      return;
    }

    if (!proof) {
      alert("Bukti pembayaran wajib diupload!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("amount", amount);
      formData.append(
        "registrationId",
        registrationId,
      );
      formData.append("proof", proof);

      const response = await fetch(
        "http://localhost:3001/payments",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert(
          "Bukti pembayaran berhasil dikirim! Menunggu verifikasi.",
        );
      } else {
        alert(
          data.message ||
            "Pembayaran gagal dikirim!",
        );
      }
    } catch (error) {
      console.error(error);

      alert("Gagal menghubungi backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-bold">
          Pembayaran
        </h1>

        <p className="mt-3 text-gray-400">
          Silakan lakukan pembayaran dan upload
          bukti transfer.
        </p>

        <div className="mt-8 rounded-xl border border-gray-800 p-5">
          <p className="text-sm text-gray-400">
            Registration ID
          </p>

          <p className="mt-1 text-lg font-semibold">
            {registrationId || "-"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label className="mb-2 block font-medium">
              Nominal Pembayaran
            </label>

            <input
              type="number"
              placeholder="Contoh: 50000"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              required
              min="1"
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Bukti Transfer
            </label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(e) =>
                setProof(
                  e.target.files?.[0] || null,
                )
              }
              required
              className="w-full rounded-lg border border-gray-700 p-3"
            />

            <p className="mt-2 text-sm text-gray-500">
              Format: JPG, JPEG, atau PNG
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white px-6 py-4 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
          >
            {loading
              ? "Mengirim..."
              : "Kirim Bukti Pembayaran"}
          </button>
        </form>
      </div>
    </main>
  );
}