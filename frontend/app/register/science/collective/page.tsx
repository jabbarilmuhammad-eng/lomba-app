"use client";

import { useState } from "react";
import Link from "next/link";

type Participant = {
  fullName: string;
  school: string;
  field: "MATEMATIKA" | "IPA" | "IPS";
};

export default function ScienceCollectiveRegistrationPage() {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      fullName: "",
      school: "",
      field: "MATEMATIKA",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const addParticipant = () => {
    if (participants.length >= 8) {
      alert("Maksimal 8 peserta!");
      return;
    }

    setParticipants([
      ...participants,
      {
        fullName: "",
        school: "",
        field: "MATEMATIKA",
      },
    ]);
  };

  const removeParticipant = (index: number) => {
    if (participants.length === 1) {
      alert("Minimal harus ada 1 peserta!");
      return;
    }

    setParticipants(
      participants.filter((_, i) => i !== index),
    );
  };

  const updateParticipant = (
    index: number,
    field: keyof Participant,
    value: string,
  ) => {
    const updatedParticipants = [...participants];

    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    } as Participant;

    setParticipants(updatedParticipants);
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    const hasEmptyData = participants.some(
      (participant) =>
        !participant.fullName.trim() ||
        !participant.school.trim(),
    );

    if (hasEmptyData) {
      alert("Semua data peserta wajib diisi!");
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
            type: "COLLECTIVE",
            participants: participants.map(
              (participant) => ({
                fullName: participant.fullName.trim(),
                school: participant.school.trim(),
                field: participant.field,
              }),
            ),
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert(
          "Pendaftaran Science Kolektif berhasil!",
        );

        console.log(
          "Registration ID:",
          data.registrationId,
        );

        setParticipants([
          {
            fullName: "",
            school: "",
            field: "MATEMATIKA",
          },
        ]);
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
          className="text-sm text-gray-400 transition hover:text-white"
        >
          ← Kembali ke Portal
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Science Kolektif
        </h1>

        <p className="mt-3 text-gray-400">
          Daftarkan beberapa peserta sekaligus untuk
          mengikuti kompetisi Science ARMASO 2027.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Data Peserta
            </h2>

            <span className="text-sm text-gray-400">
              {participants.length}/8 Peserta
            </span>
          </div>

          <div className="space-y-6">
            {participants.map(
              (participant, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-800 p-6"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-semibold">
                      Peserta {index + 1}
                    </h3>

                    {participants.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeParticipant(index)
                        }
                        className="text-sm text-red-400 hover:text-red-300"
                      >
                        Hapus
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nama lengkap"
                      value={participant.fullName}
                      onChange={(e) =>
                        updateParticipant(
                          index,
                          "fullName",
                          e.target.value,
                        )
                      }
                      required
                      className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
                    />

                    <input
                      type="text"
                      placeholder="Nama sekolah"
                      value={participant.school}
                      onChange={(e) =>
                        updateParticipant(
                          index,
                          "school",
                          e.target.value,
                        )
                      }
                      required
                      className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-white"
                    />

                    <select
                      value={participant.field}
                      onChange={(e) =>
                        updateParticipant(
                          index,
                          "field",
                          e.target.value,
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
                </div>
              ),
            )}
          </div>

          {participants.length < 8 && (
            <button
              type="button"
              onClick={addParticipant}
              className="rounded-lg border border-gray-600 px-5 py-3 transition hover:bg-gray-900"
            >
              + Tambah Peserta
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white px-6 py-4 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
          >
            {loading
              ? "Mengirim..."
              : "Daftar Science Kolektif"}
          </button>
        </form>
      </div>
    </main>
  );
}