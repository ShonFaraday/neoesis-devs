"use client";

import { useEffect, useRef } from "react";

// Video publicitario en bucle: sin controles, sin pausa y sin interacción.
// Solo se descarga cuando la sección se acerca a la pantalla.
export function VideoDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let visible = false;

    const reproducir = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    // Si el navegador lo detiene por su cuenta (ahorro de batería, cambio de pestaña), se reanuda.
    const alPausar = () => {
      if (visible) reproducir();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (video.preload === "none") {
            video.preload = "auto";
            video.load();
          }
          reproducir();
        } else {
          video.pause(); // fuera de pantalla no gasta recursos; al volver sigue donde iba
        }
      },
      { rootMargin: "200px 0px" }
    );

    const alVolverAPestana = () => {
      if (document.visibilityState === "visible" && visible) reproducir();
    };

    video.addEventListener("pause", alPausar);
    document.addEventListener("visibilitychange", alVolverAPestana);
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", alPausar);
      document.removeEventListener("visibilitychange", alVolverAPestana);
    };
  }, []);

  return (
    <section id="demo" className="nx-section nx-demo">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <h2>Así se ve tu web en cualquier pantalla</h2>
          <p>Diseños que lucen igual de bien en laptop y en celular.</p>
        </div>

        <div className="nx-demo-frame">
          <video
            ref={videoRef}
            className="nx-demo-video"
            poster="/video/neoesis-demo-poster.jpg"
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
            tabIndex={-1}
            aria-label="Video de presentación de Neoesis DEVS® en laptop y celular"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src="/video/neoesis-demo.webm" type="video/webm" />
            <source src="/video/neoesis-demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
