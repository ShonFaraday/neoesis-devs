"use client";

import { useEffect } from "react";

// Al abrir una página interna, la lleva al inicio (salvo que el enlace apunte a una sección).
export function ScrollToTop() {
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}