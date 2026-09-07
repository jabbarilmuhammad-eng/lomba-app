"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ScienceSelfRegistrationPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [field, setField] = useState<
    "MATEMATIKA" | "IPA" | "IPS"
  >("MATEMATIKA");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!fullName.trim()) {
      alert("Nama lengkap wajib diisi!");
      return;
    }

    if (!school.trim()) {
      alert("Nama sekolah wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/registrations/science",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            type: "SELF",
            participants: [
              {
                fullName: fullName.trim(),
                school: school.trim(),
                field,
              },
            ],
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        router.push(
          `/payment?registrationId=${data.registrationId}`,
        );
      } else {
        alert(
          data.message ||
            "Pendaftaran gagal!",
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
      <div className="mx-auto max-w-2xl">
        <Link
          href="/register"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          ← Kembali ke Portal
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Science Individu
        </h1>

        <p className="mt-3 text-gray-400">
          Daftarkan diri kamu untuk mengikuti
          kompetisi Science ARMASO 2027.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Nama Lengkap
            </label>

            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Nama Sekolah
            </label>

            <input
              type="text"
              placeholder="Masukkan nama sekolah"
              value={school}
              onChange={(e) =>
                setSchool(e.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Bidang Kompetisi
            </label>

            <select
              value={field}
              onChange={(e) =>
                setField(
                  e.target.value as
                    | "MATEMATIKA"
                    | "IPA"
                    | "IPS",
                )
              }
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            >
              <option value="MATEMATIKA">
                Matematika
              </option>

              <option value="IPA">
                IPA
              </option>

              <option value="IPS">
                IPS
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white px-6 py-4 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
          >
            {loading
              ? "Mengirim..."
              : "Lanjut ke Pembayaran"}
          </button>
        </form>
      </div>
    </main>
  );
}