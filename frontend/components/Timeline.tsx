const timelineData = [
  {
    title: "Pendaftaran",
    date: "1 Januari - 31 Januari 2027",
    description: "Peserta melakukan registrasi dan melengkapi data pendaftaran.",
  },
  {
    title: "Seleksi",
    date: "1 Februari - 7 Februari 2027",
    description: "Panitia melakukan verifikasi dan seleksi peserta.",
  },
  {
    title: "Pelaksanaan",
    date: "14 Februari 2027",
    description: "Kompetisi dilaksanakan sesuai kategori yang dipilih.",
  },
  {
    title: "Pengumuman",
    date: "21 Februari 2027",
    description: "Pengumuman pemenang dan hasil akhir kompetisi.",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          Timeline
        </p>

        <h2 className="mt-3 text-3xl font-bold md:text-5xl">
          Jadwal Kompetisi
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-800 p-6"
            >
              <p className="text-sm text-gray-400">
                {item.date}
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}