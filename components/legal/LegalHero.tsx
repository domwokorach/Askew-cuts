export default function LegalHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  const lastUpdated = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.2em] text-grey-dark mb-3">{eyebrow}</p>
      <h1 className="font-heading font-semibold uppercase tracking-tight text-[32px] md:text-[40px] leading-tight">
        {title}
      </h1>
      <p className="mt-3 text-sm text-grey-dark">Last updated: {lastUpdated}</p>
      <p className="mt-6 text-base md:text-lg text-grey-dark leading-relaxed">{intro}</p>
    </div>
  );
}
