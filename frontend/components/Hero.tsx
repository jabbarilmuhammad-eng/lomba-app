export default function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
          SELAMAT DATANG DI
          <br />
          ARMASO 2027
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
          kompetisi sains dan olahraga se-jawa bali
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/register"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Daftar Sekarang
          </a>

          <a
            href="#tentang"
            className="rounded-lg border border-gray-600 px-6 py-3 font-semibold transition hover:bg-gray-900"
          >
            Pelajari Lomba
          </a>
        </div>
      </div>
    </section>
  );
}