// Datos generales de la marca. Cambia aquí el número y se actualiza en todo el sitio.
export const BRAND_NAME = "Neoesis DEVS®";
export const WHATSAPP_NUMBER = "51940009717"; // +51 940 009 717 (sin "+" ni espacios)

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
