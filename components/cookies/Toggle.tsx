"use client";

export default function Toggle({
  checked,
  onChange,
  disabled = false,
  label,
}: {
  checked: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
        disabled
          ? "bg-grey-light border-grey-light cursor-not-allowed"
          : checked
            ? "bg-ink border-ink cursor-pointer"
            : "bg-transparent border-grey-mid cursor-pointer"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0"
        } ${disabled ? "bg-cream" : checked ? "bg-cream" : "bg-grey-dark"}`}
      />
    </button>
  );
}
