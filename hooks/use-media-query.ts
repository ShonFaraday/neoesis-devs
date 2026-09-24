"use client";

import { useSyncExternalStore } from "react";

// Devuelve true cuando la pantalla cumple la media query (ej. "(min-width: 768px)").
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
