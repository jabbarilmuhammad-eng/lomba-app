"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-800 px-6 py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="text-xl font-bold">
          LOMBA APP
        </div>

        {/* Menu desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="/">Beranda</a>
          <a href="#tentang">Tentang</a>
          <a href="#timeline">Timeline</a>
          <a href="/login">Login</a>
        </div>

        {/* Tombol hamburger */}
        <button
          type="button"
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Buka menu"
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="mx-auto mt-4 flex max-w-6xl flex-col gap-4 border-t border-gray-800 pt-4 md:hidden">
          <a href="/">Beranda</a>
          <a href="#tentang">Tentang</a>
          <a href="#timeline">Timeline</a>
          <a href="/login">Login</a>
        </div>
      )}
    </nav>
  );
}