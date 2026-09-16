"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}
    >
      {eyebrow && (
        <p
          className={`text-sm uppercase tracking-[0.2em] mb-3 ${
            dark ? "text-grey-light" : "text-grey-dark"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading font-semibold uppercase tracking-tight text-[30px] md:text-[36px] lg:text-[40px] leading-tight ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            dark ? "text-grey-light" : "text-grey-dark"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
