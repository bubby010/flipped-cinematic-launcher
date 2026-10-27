import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const lbutton = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm font-display uppercase tracking-[0.12em] transition-all duration-300 ease-[var(--ease-out)] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-silver hover:-translate-y-px active:translate-y-0 [&>.sheen]:absolute [&>.sheen]:inset-y-0 [&>.sheen]:w-1/3 [&>.sheen]:bg-gradient-to-r [&>.sheen]:from-transparent [&>.sheen]:via-background/15 [&>.sheen]:to-transparent [&>.sheen]:-translate-x-[150%] hover:[&>.sheen]:translate-x-[350%] [&>.sheen]:transition-transform [&>.sheen]:duration-700",
        outline: "border border-foreground/20 bg-background/30 text-foreground backdrop-blur-sm hover:border-foreground/50 hover:bg-foreground/5",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-14 px-10 text-lg",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
);

export function LButton({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof lbutton>) {
  return (
    <button className={cn(lbutton({ variant, size }), className)} {...props}>
      {variant === "primary" && <span className="sheen" />}
      {children}
    </button>
  );
}

export function PageHeader({ title, subtitle, right }: { title: string; subtitle: string; right?: ReactNode }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-b border-hairline pb-6">
      <div>
        <h1 className="font-display-tight text-6xl font-semibold text-silver-gradient 2xl:text-7xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {right}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-md border border-hairline bg-surface-1/80 transition-colors duration-300 hover:border-foreground/15", className)}>
      {children}
    </div>
  );
}

export function StatusDot({ className }: { className?: string }) {
  return <span className={cn("inline-block size-1.5 rounded-full bg-online animate-pulse-dot", className)} />;
}

export function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="label-caps text-muted-foreground">{children}</h2>
      {right}
    </div>
  );
}

/** Updater progress bar — feed `value` (0–100) from the real updater later. */
export function ProgressBar({ value, indeterminate }: { value: number; indeterminate?: boolean }) {
  return (
    <div className="relative h-1 w-full overflow-hidden rounded-full bg-surface-3">
      {indeterminate ? (
        <div className="absolute inset-y-0 w-1/3 bg-silver animate-shimmer" />
      ) : (
        <div
          className="relative h-full rounded-full bg-silver transition-[width] duration-500 ease-[var(--ease-out)]"
          style={{ width: `${value}%` }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-foreground/60 to-transparent animate-shimmer" />
          </div>
        </div>
      )}
    </div>
  );
}

export function ArtPlaceholder({ label, className, seed = 0 }: { label?: string; className?: string; seed?: number }) {
  return (
    <div className={cn("relative overflow-hidden bg-placeholder", className)}>
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
        style={{
          backgroundImage: `repeating-linear-gradient(${115 + seed * 25}deg, transparent 0 22px, color-mix(in oklab, var(--foreground) 5%, transparent) 22px 23px)`,
        }}
      />
      {label && (
        <span className="absolute inset-0 grid place-items-center font-display text-5xl uppercase text-foreground/5">{label}</span>
      )}
    </div>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 rounded-full border transition-colors duration-300",
        checked ? "border-foreground/40 bg-foreground/90" : "border-hairline bg-surface-3",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-3.5 rounded-full transition-all duration-300 ease-[var(--ease-out)]",
          checked ? "left-[18px] bg-background" : "left-0.5 bg-muted-foreground",
        )}
      />
    </button>
  );
}
