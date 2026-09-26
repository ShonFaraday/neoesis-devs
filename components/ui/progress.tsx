import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Porcentaje de 0 a 100. */
  value?: number;
  indicatorClassName?: string;
};

// Barra de progreso accesible (sin dependencias extra).
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, indicatorClassName, ...props }, ref) => {
    const v = Math.min(100, Math.max(0, value));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(v)}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
        {...props}
      >
        <div
          className={cn("h-full w-full flex-1 bg-primary transition-transform duration-500 ease-out", indicatorClassName)}
          style={{ transform: `translateX(-${100 - v}%)` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
