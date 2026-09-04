"use client";

import { useState } from "react";

export default function BackendTest() {
  const [message, setMessage] = useState("");

  async function testBackend() {
    try {
      const response = await fetch("http://localhost:3001/api/status");

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      setMessage("Backend tidak bisa dihubungi.");
    }
  }

  return (
    <section className="px-6 py-10 text-center">
      <button
        onClick={testBackend}
        className="rounded-lg bg-white px-6 py-3 font-semibold text-black"
      >
        Test Backend
      </button>

      {message && (
        <p className="mt-4">
          {message}
        </p>
      )}
    </section>
  );
}