
import Image from "next/image";
import Link from "next/link";
import {
    footerBrand,
    footerContacts,
    footerLocation,
    footerSocials,
} from "@/components/home/data/footer";

const panelClass =
    "min-w-0 rounded-[2.5rem] border-[5px] border-[#a98432] bg-[#160800] p-5 sm:p-7";

const headingClass =
    "text-center text-xl font-extrabold text-[#f4a62a] sm:text-2xl";

export default function HomeFooter() {
    return (
        <footer
            id="kontak"
            className="home-fade-up bg-black px-4 py-8 text-white sm:px-6 lg:px-10"
        >
            <div className="mx-auto max-w-[1600px]">
                {/* CONTACT, SOCIAL MEDIA, LOCATION */}
                <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
                    {/* CONTACT PERSON */}
                    <section className={`${panelClass} home-reveal home-reveal-stagger-1`}>
                        <div className="mb-8 flex items-center justify-center gap-4">
                            <Image
                                src="/images/home/avatar-4.png"
                                alt=""
                                width={68}
                                height={52}
                                className="h-12 w-16 object-contain"
                            />
                            <h2 className={headingClass}>CONTACT PERSON</h2>
                        </div>

                        <div className="space-y-5">
                            {footerContacts.map((contact) => (
                                <a
                                    key={contact.whatsapp}
                                    href={contact.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Hubungi ${contact.name} melalui WhatsApp`}
                                    className="group flex min-h-24 items-center gap-4 rounded-xl border border-[#b58b00] bg-black p-4 transition hover:border-[#ffb206] hover:bg-[#211306] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb206]"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="w-12 shrink-0 text-center text-3xl"
                                    >
                                        {contact.avatar}
                                    </span>

                                    <span className="min-w-0">
                                        <span className="block break-words text-sm font-extrabold text-[#f4a62a]">
                                            {contact.name}
                                        </span>
                                        <span className="mt-1 block text-sm font-semibold text-white">
                                            {contact.role}
                                        </span>
                                        <span className="mt-1 block break-words text-sm font-bold text-white">
                                            {contact.phone}
                                        </span>

                                    </span>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* FOLLOW US */}
                    <section className={`${panelClass} home-reveal home-reveal-stagger-2`}>
                        <h2 className={`${headingClass} mb-8`}>FOLLOW US!</h2>

                        <div className="grid grid-cols-2 gap-4">
                            {footerSocials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Buka ${social.name} ${social.username}`}
                                    className="flex min-h-36 flex-col items-center justify-center gap-5 rounded-xl border border-[#b58b00] bg-black p-4 text-center transition hover:border-[#ffb206] hover:bg-[#211306] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb206]"
                                >
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center">
                                        <Image
                                            src={social.icon}
                                            alt=""
                                            width={48}
                                            height={48}
                                            className={`h-full w-full object-contain ${social.name === "Instagram"
                                                ? "scale-[1.7]"
                                                : social.name === "YouTube"
                                                    ? "scale-100"
                                                    : social.name === "TikTok"
                                                        ? "scale-[2.8]"
                                                        : ""
                                                }`}
                                        />
                                    </span>

                                    <span className="min-h-10 flex items-center justify-center break-words text-sm font-extrabold text-[#f4a62a]">
                                        {social.username}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </section>


                    {/* LOCATION */}
                    <section className={`${panelClass} home-reveal home-reveal-stagger-3`}>
                        <div className="mb-8 flex items-center justify-center gap-3">
                            <Image
                                src={footerLocation.icon}
                                alt=""
                                width={42}
                                height={48}
                                className="h-11 w-auto object-contain"
                            />
                            <h2 className={headingClass}>LOCATION</h2>
                        </div>

                        <div className="rounded-xl border border-[#b58b00] bg-black p-4 sm:p-5">
                            <h3 className="text-lg font-extrabold leading-snug text-[#f4a62a] sm:text-xl">
                                {footerLocation.name}
                            </h3>

                            <p className="mt-4 text-base font-bold leading-relaxed text-white/60 sm:text-lg">
                                {footerLocation.address}
                            </p>

                            <a
                                href={footerLocation.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-[#b58b00] px-3 py-3 transition hover:bg-[#211306] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb206]"
                            >
                                <Image
                                    src={footerLocation.logo}
                                    alt=""
                                    width={38}
                                    height={38}
                                    className="h-9 w-9 object-contain"
                                />
                                <span className="text-sm font-bold text-[#f4a62a] sm:text-base">
                                    PPM Ar-Rahmat
                                </span>
                            </a>
                        </div>

                        <a
                            href={footerLocation.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 flex min-h-20 items-center justify-center gap-4 rounded-xl border border-[#b58b00] bg-black p-4 transition hover:border-[#ffb206] hover:bg-[#211306] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb206]"
                        >
                            <Image
                                src={footerLocation.routeIcon}
                                alt=""
                                width={48}
                                height={48}
                                className="h-10 w-10 object-contain"
                            />
                            <span className="text-lg font-extrabold text-[#f4a62a]">
                                GET THE ROUTE!
                            </span>
                        </a>
                    </section>
                </div>

                {/* BRAND FOOTER */}
                <div className="mt-10 grid grid-cols-1 items-center gap-6 rounded-[2.5rem] border-[5px] border-[#a98432] bg-[#160800] p-6 sm:p-8 lg:grid-cols-2 lg:px-10 lg:py-10 home-reveal home-reveal-stagger-1">
                    <Link
                        href="/"
                        aria-label="ARMASO 2027 - Kembali ke halaman utama"
                        className="flex min-w-0 items-center gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb206]"
                    >
                        <Image
                            src={footerBrand.logo}
                            alt="Logo ARMASO"
                            width={220}
                            height={110}
                            className="h-auto max-h-24 w-32 shrink-0 object-contain sm:w-44"
                        />

                        <span className="min-w-0">
                            <span className="block text-2xl font-extrabold text-[#f4a62a] sm:text-3xl">
                                {footerBrand.name}
                            </span>
                            <span className="mt-1 block text-xs font-bold italic leading-relaxed text-white/70 sm:text-sm">
                                {footerBrand.subtitle}
                            </span>
                        </span>
                    </Link>

                    <p className="text-center text-sm font-semibold leading-relaxed text-white lg:text-right">
                        {footerBrand.copyright}{" "}
                        <span className="text-[#f4a62a]">ARMASO</span>
                        {" | All Rights Reserved. | "}
                        <span className="italic">
                            {footerBrand.slogan}
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
