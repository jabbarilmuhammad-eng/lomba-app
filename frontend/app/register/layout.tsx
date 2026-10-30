
import HomeNavbar from "@/components/home/HomeNavbar";
import HomeFooter from "@/components/home/HomeFooter";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeNavbar />
      {children}
      <HomeFooter />
    </>
  );
}
