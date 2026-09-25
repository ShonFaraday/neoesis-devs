import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappLink } from "@/lib/site-config";

// Botón flotante de WhatsApp, visible en todas las páginas.
export function FloatingWhatsApp() {
  return (
    <a
      className="nx-wa-float"
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon />
      <span className="nx-wa-float-label">¿Hablamos?</span>
    </a>
  );
}
