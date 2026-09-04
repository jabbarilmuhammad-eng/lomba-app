export default function Footer() {
  return (
    <footer className="border-t border-gray-800 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-bold">LOMBA APP</h2>
          <p className="mt-1 text-sm text-gray-400">
            Sistem pendaftaran kompetisi.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          © 2027 Lomba App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}