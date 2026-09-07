"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-800 px-6 py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          LOMBA APP
        </Link>

        {/* Menu desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/">Beranda</Link>

          <a href="#tentang">
            Tentang
          </a>

          <a href="#timeline">
            Timeline
          </a>

          <Link
            href="/login"
            className="transition hover:text-gray-300"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-white px-4 py-2 font-semibold text-black transition hover:bg-gray-200"
          >
            Sign Up
          </Link>
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
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            Beranda
          </Link>

          <a
            href="#tentang"
            onClick={() => setMenuOpen(false)}
          >
            Tentang
          </a>

          <a
            href="#timeline"
            onClick={() => setMenuOpen(false)}
          >
            Timeline
          </a>

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
          >
            Log In
          </Link>

          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="w-fit rounded-lg bg-white px-4 py-2 font-semibold text-black"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}