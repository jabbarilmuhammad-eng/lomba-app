export default function About() {
  return (
    <section id="tentang" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          Tentang
        </p>

        <h2 className="mt-3 text-3xl font-bold md:text-5xl">
          Kompetisi untuk Mengasah Potensi
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          Website ini menjadi pusat informasi dan pendaftaran kompetisi.
          Peserta dapat melihat informasi lomba, timeline, persyaratan,
          melakukan pendaftaran, dan nantinya memantau status pendaftaran
          melalui portal peserta.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-semibold">Terbuka</h3>
            <p className="mt-3 text-gray-400">
              Kesempatan berkompetisi untuk peserta yang memenuhi persyaratan.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-semibold">Terstruktur</h3>
            <p className="mt-3 text-gray-400">
              Seluruh proses pendaftaran dan informasi disusun secara rapi.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-semibold">Terintegrasi</h3>
            <p className="mt-3 text-gray-400">
              Peserta nantinya dapat mengelola pendaftaran melalui satu portal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}