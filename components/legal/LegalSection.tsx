import type { ReactNode } from "react";

export default function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-8 border-b border-grey-light last:border-b-0">
      <h2 className="font-heading text-[22px] md:text-[24px] font-semibold uppercase tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink">{children}</div>
    </section>
  );
}
