"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FutsalRegistrationPage() {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");
  const [school, setSchool] = useState("");

  const [members, setMembers] = useState<string[]>([
    "",
  ]);

  const [loading, setLoading] = useState(false);

  const addMember = () => {
    setMembers([...members, ""]);
  };

  const removeMember = (index: number) => {
    if (members.length === 1) {
      alert("Minimal harus ada 1 anggota tim!");
      return;
    }

    setMembers(
      members.filter((_, i) => i !== index),
    );
  };

  const updateMember = (
    index: number,
    value: string,
  ) => {
    const updatedMembers = [...members];

    updatedMembers[index] = value;

    setMembers(updatedMembers);
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    const cleanMembers = members
      .map((member) => member.trim())
      .filter((member) => member !== "");

    if (!teamName.trim()) {
      alert("Nama tim wajib diisi!");
      return;
    }

    if (!school.trim()) {
      alert("Nama sekolah wajib diisi!");
      return;
    }

    if (cleanMembers.length === 0) {
      alert("Minimal harus ada 1 anggota tim!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/registrations/futsal",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            teamName,
            school,
            members: cleanMembers,
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
      <div className="mx-auto max-w-3xl">
        <Link
          href="/register"
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Kembali ke Portal
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Futsal Competition
        </h1>

        <p className="mt-3 text-gray-400">
          Isi data tim untuk mengikuti
          kompetisi Futsal ARMASO 2027.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
        >
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">
              Data Tim
            </h2>

            <input
              type="text"
              placeholder="Nama tim"
              value={teamName}
              onChange={(e) =>
                setTeamName(e.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            />

            <input
              type="text"
              placeholder="Nama sekolah"
              value={school}
              onChange={(e) =>
                setSchool(e.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Anggota Tim
              </h2>

              <span className="text-sm text-gray-400">
                {members.length} Anggota
              </span>
            </div>

            {members.map((member, index) => (
              <div
                key={index}
                className="flex gap-3"
              >
                <input
                  type="text"
                  placeholder={`Nama anggota ${index + 1}`}
                  value={member}
                  onChange={(e) =>
                    updateMember(
                      index,
                      e.target.value,
                    )
                  }
                  required
                  className="flex-1 rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
                />

                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeMember(index)
                    }
                    className="rounded-lg border border-red-500 px-4 text-red-400 transition hover:bg-red-500/10"
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addMember}
            className="rounded-lg border border-gray-600 px-5 py-3 transition hover:bg-gray-900"
          >
            + Tambah Anggota
          </button>

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