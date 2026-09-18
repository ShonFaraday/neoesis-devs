// Carrusel simple: cada botón mueve su carril (track) un ancho de tarjeta.
document.querySelectorAll(".car-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const track = document.getElementById(btn.dataset.target);
    if (!track) return;
    const card = track.querySelector(".card");
    const gap = 18;
    const step = card ? card.getBoundingClientRect().width + gap : 280;
    const dir = btn.classList.contains("car-next") ? 1 : -1;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  });
});

// Brillo del hero que sigue al mouse (efecto sutil, solo dentro del hero).
const heroSection = document.getElementById("hero-section");
if (heroSection && window.matchMedia("(hover: hover)").matches) {
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroSection.style.setProperty("--mx", x + "%");
    heroSection.style.setProperty("--my", y + "%");
  });
}

// Resalta en el menú la sección que se está viendo (scrollspy).
const navLinks = Array.from(document.querySelectorAll("#main-nav a[data-nav]"));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.nav))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navLinks.find((l) => l.dataset.nav === entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
}
