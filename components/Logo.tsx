import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  // TODO: once the brand logo asset is added to /public (e.g. logo.svg),
  // swap this wordmark for a next/image render of that file.
  return (
    <Link
      href="/"
      className="flex flex-col leading-none shrink-0 group"
      aria-label="Askew Cuts home"
    >
      <span
        className={`font-heading text-xl md:text-2xl font-semibold tracking-[0.08em] uppercase ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        Askew Cuts
      </span>
      <span
        className={`text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5 ${
          dark ? "text-grey-light" : "text-grey-dark"
        }`}
      >
        Afro · European · American
      </span>
    </Link>
  );
}
