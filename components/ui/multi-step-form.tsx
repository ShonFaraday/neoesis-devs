"use client";

// Formulario por pasos (basado en el componente de 21st.dev), adaptado a
// Base UI, al tema Neoesis y con animación según la dirección del paso.
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const multiStepFormVariants = cva("flex flex-col", {
  variants: {
    size: {
      default: "md:w-[700px]",
      sm: "md:w-[550px]",
      lg: "md:w-[850px]",
      fluid: "w-full",
    },
  },
  defaultVariants: { size: "default" },
});

interface MultiStepFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof multiStepFormVariants> {
  currentStep: number;
  totalSteps: number;
  /** Clave única del paso (para la animación). Por defecto, currentStep. */
  stepKey?: string | number;
  /** 1 = avanzar, -1 = retroceder. */
  direction?: number;
  title: React.ReactNode;
  description: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  onClose?: () => void;
  backButtonText?: string;
  nextButtonText?: React.ReactNode;
  nextButtonClassName?: string;
  footerContent?: React.ReactNode;
  headerExtra?: React.ReactNode;
  progressLabel?: React.ReactNode;
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  (
    {
      className,
      size,
      currentStep,
      totalSteps,
      stepKey,
      direction = 1,
      title,
      description,
      onBack,
      onNext,
      onClose,
      backButtonText = "Atrás",
      nextButtonText = "Siguiente",
      nextButtonClassName,
      footerContent,
      headerExtra,
      progressLabel,
      children,
      ...props
    },
    ref
  ) => {
    const progress = Math.round((currentStep / totalSteps) * 100);

    const variants = {
      hidden: (d: number) => ({ opacity: 0, x: d * 60, filter: "blur(6px)" }),
      enter: { opacity: 1, x: 0, filter: "blur(0px)" },
      exit: (d: number) => ({ opacity: 0, x: d * -60, filter: "blur(6px)" }),
    };

    return (
      <Card ref={ref} className={cn(multiStepFormVariants({ size }), className)} {...props}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={stepKey ?? currentStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-1.5"
              >
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </motion.div>
            </AnimatePresence>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4 pt-3">
            <Progress value={progress} className="nx-cot-progress" indicatorClassName="nx-cot-progress-bar" />
            <p className="whitespace-nowrap text-sm text-muted-foreground tabular-nums">
              {progressLabel ?? `${currentStep}/${totalSteps}`}
            </p>
          </div>
          {headerExtra}
        </CardHeader>

        <CardContent className="min-h-[300px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={stepKey ?? currentStep}
              custom={direction}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="nx-cot-footer flex flex-wrap justify-between gap-3">
          <div className="flex items-center gap-2">{footerContent}</div>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" size="lg" onClick={onBack} className="nx-cot-btn">
                {backButtonText}
              </Button>
            )}
            <Button size="lg" onClick={onNext} className={cn("nx-cot-btn nx-cot-btn-next", nextButtonClassName)}>
              {nextButtonText}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

MultiStepForm.displayName = "MultiStepForm";

export { MultiStepForm };
