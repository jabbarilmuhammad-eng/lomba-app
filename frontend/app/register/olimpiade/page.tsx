import type { Metadata } from "next";
import HomeNavbar from "@/components/home/HomeNavbar";
import HomeFooter from "@/components/home/HomeFooter";
import OlimpiadePortal from "@/components/register/OlimpiadePortal";

export const metadata: Metadata = {
  title: "Pendaftaran Olimpiade Sains | ARMASO 2027",
  description:
    "Pilih skema pendaftaran Olimpiade Sains ARMASO 2027: Individu (mandiri) atau Kolektif (rombongan sekolah).",
};

export default function OlimpiadeRegisterPage() {
  return (
    <>
      <HomeNavbar />
      <main className="relative z-0 -mt-[clamp(64px,5vw,80px)]">
        <OlimpiadePortal />
      </main>

    </>
  );
}
