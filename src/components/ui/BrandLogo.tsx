import Link from "next/link";

export default function BrandLogo() {
    return (
        <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0 select-none "
            aria-label="Trang chủ Historia"
        >
            <span
                className=" wh text-lg leading-none opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                aria-hidden="true"
            >
                {" "}
                ⌖{" "}
            </span>

            <span className="wh font-heading font-semibold text-xl tracking-[0.12em] uppercase group-hover:text-primary transition-colors duration-200">
                Historia
            </span>
        </Link>
    );
}
