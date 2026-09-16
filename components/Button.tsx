"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "ghost-inverse";

interface BaseProps {
  variant?: Variant;
  size?: "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-cream border border-ink hover:bg-ink/90",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-cream",
  ghost:
    "bg-transparent text-ink border border-grey-light hover:border-ink",
  inverse:
    "bg-cream text-ink border border-cream hover:bg-cream/90",
  "ghost-inverse":
    "bg-transparent text-cream border border-cream/40 hover:bg-cream hover:text-ink",
};

const sizeClasses = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

function classes(variant: Variant, size: "md" | "lg", extra?: string) {
  return [
    "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.08em] transition-colors duration-200 min-h-[44px]",
    variantClasses[variant],
    sizeClasses[size],
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

interface LinkButtonProps extends BaseProps {
  href: string;
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
}: LinkButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link href={href} className={classes(variant, size, className)}>
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </Link>
    </motion.div>
  );
}

interface ActionButtonProps extends BaseProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
  "aria-label"?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  disabled,
  ...rest
}: ActionButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      disabled={disabled}
      className={classes(
        variant,
        size,
        `${className ?? ""} ${disabled ? "opacity-40 cursor-not-allowed" : ""}`
      )}
      {...rest}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </motion.button>
  );
}
