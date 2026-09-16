import { PenLine } from "lucide-react";
import type { ReactNode } from "react";

/** Flags policy text that still needs a decision from the business owner before launch. */
export default function EditableNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2.5 border border-dashed border-grey-mid bg-grey-light/30 px-4 py-3 text-sm text-grey-dark">
      <PenLine size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <span className="block text-xs uppercase tracking-[0.12em] font-medium text-grey-dark mb-1">
          To be confirmed by Askew Cuts
        </span>
        {children}
      </div>
    </div>
  );
}
