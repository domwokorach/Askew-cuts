"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { LinkButton } from "./Button";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-20 md:py-28 lg:py-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="text-sm uppercase tracking-[0.25em] text-grey-light mb-6"
          >
            256 Goldhawk Rd, London W12 9PE
          </motion.p>

          <motion.h1
            variants={item}
            className="font-heading font-semibold uppercase leading-[0.95] tracking-tight text-[40px] sm:text-[44px] md:text-[52px] lg:text-[64px]"
          >
            Askew Cuts
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-sm md:text-base uppercase tracking-[0.3em] text-grey-light"
          >
            Afro &nbsp;–&nbsp; European &nbsp;–&nbsp; American
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 text-base md:text-lg text-grey-light max-w-xl leading-relaxed"
          >
            Professional cuts, precision fades and grooming for Afro, European
            and American hair.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <LinkButton href="/book" variant="inverse" size="lg" icon={<ArrowRight size={18} aria-hidden="true" />}>
              Book Now
            </LinkButton>
            <LinkButton
              href="#services"
              variant="ghost-inverse"
              size="lg"
              icon={<ChevronRight size={18} aria-hidden="true" />}
            >
              View Services
            </LinkButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
