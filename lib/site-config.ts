// Datos generales de la marca. Cambia aquí y se actualiza en todo el sitio.
export const BRAND_NAME = "Neoesis DEVS®";
export const WHATSAPP_NUMBER = "51940009717"; // Sin "+" ni espacios
export const WHATSAPP_DISPLAY = "+51 940 009 717"; // Cómo se muestra en pantalla
export const DEFAULT_WHATSAPP_MESSAGE = `Hola ${BRAND_NAME}, quiero una página web para mi negocio`;

export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
