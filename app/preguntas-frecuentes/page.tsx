import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/site/legal-page";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { whatsappLink } from "@/lib/site-config";

const descripcion =
  "Respuestas sobre precios, dominio, planes de mantenimiento, métodos de pago y cómo trabajamos en Neoesis DEVS®.";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: descripcion,
  alternates: { canonical: "/preguntas-frecuentes" },
  openGraph: {
    title: "Preguntas frecuentes | Neoesis DEVS®",
    description: descripcion,
    url: "/preguntas-frecuentes",
  },
};

type Pregunta = { p: string; r: React.ReactNode };

const GRUPOS: { titulo: string; preguntas: Pregunta[] }[] = [
  {
    titulo: "Precios y paquetes",
    preguntas: [
      {
        p: "¿Cuánto cuesta una página web?",
        r: (
          <>
            Tenemos tres tipos de proyecto: una <strong>landing sencilla</strong> desde US$ 190 hasta
            US$ 230, una <strong>landing profesional</strong> desde US$ 310, y{" "}
            <strong>sistemas a medida</strong> (facturación, tiendas online y similares) con precio
            a cotizar. El precio final lo verás en la cotización que te enviamos por escrito.
          </>
        ),
      },
      {
        p: "¿El precio incluye el dominio?",
        r: "Sí, nuestros paquetes incluyen el dominio, sujeto al costo del dominio que elijas. El precio varía según la extensión (por ejemplo, .com o .pe) y te lo informamos antes de registrarlo.",
      },
      {
        p: "¿Mi página se verá bien en el celular?",
        r: "Sí. Diseñamos cada página para que se vea bien en cualquier pantalla: celular, tablet o computadora.",
      },
      {
        p: "¿También hacen tiendas online o sistemas?",
        r: "Sí. Para tiendas online (e-commerce), sistemas de facturación, paneles de administración y otros desarrollos específicos, preparamos una cotización a medida según lo que necesite tu negocio.",
      },
    ],
  },
  {
    titulo: "Cómo trabajamos",
    preguntas: [
      {
        p: "¿Cómo es el proceso?",
        r: "Son cuatro pasos: nos cuentas tu negocio por WhatsApp, diseñamos tu página, la revisamos juntos hasta que quede como quieres y la publicamos para que empiece a recibir clientes.",
      },
      {
        p: "¿Qué necesito enviarles para empezar?",
        r: "Lo ideal es que tengas a mano tu logotipo, los textos que quieres mostrar, fotos de tus productos o servicios y tus datos de contacto. Si te falta algo, conversamos cómo resolverlo.",
      },
      {
        p: "¿Cuánto demora en estar lista mi página?",
        r: "Depende del tipo de proyecto y de qué tan rápido tengamos tus materiales. El plazo de entrega de tu proyecto se indica en la cotización.",
      },
    ],
  },
  {
    titulo: "Planes de mantenimiento",
    preguntas: [
      {
        p: "¿Es obligatorio contratar un plan de mantenimiento?",
        r: "No, es opcional. Puedes contratarlo cuando tu página ya esté publicada, si quieres que nos encarguemos de mantenerla al día.",
      },
      {
        p: "¿Qué diferencia hay entre el plan ECO y el PREMIUM?",
        r: (
          <>
            El <strong>plan ECO</strong> (US$ 27 al mes) incluye hasta 4 horas de trabajo por semana
            para actualizar datos, cambiar tonos y colores y atender tus peticiones dentro del diseño
            actual; no incluye rediseños ni secciones nuevas. El <strong>plan PREMIUM</strong> (US$ 54
            al mes) incluye hasta 6 horas por semana, además del rediseño de la página y la
            incorporación de nuevas secciones y funciones.
          </>
        ),
      },
      {
        p: "¿Puedo pagar el plan por año?",
        r: "Sí. El pago anual de los planes ECO y PREMIUM tiene un 40% de descuento sobre el precio de 12 meses.",
      },
    ],
  },
  {
    titulo: "Pagos y contacto",
    preguntas: [
      {
        p: "¿Qué métodos de pago aceptan?",
        r: "Nuestros precios están en dólares (USD). Puedes pagar en soles por Yape, Plin o transferencia bancaria, al tipo de cambio del día.",
      },
      {
        p: "¿Cómo los contacto?",
        r: "Escríbenos por WhatsApp: te respondemos directamente y te ayudamos a definir qué necesita tu página.",
      },
    ],
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <LegalPage
      titulo="Preguntas frecuentes"
      intro="Aquí respondemos las dudas más comunes sobre nuestros servicios. Si no encuentras lo que buscas, escríbenos por WhatsApp."
      mostrarFecha={false}
    >
      {GRUPOS.map((grupo) => (
        <section key={grupo.titulo} className="nx-faq-group">
          <h2>{grupo.titulo}</h2>
          <div className="nx-faq">
            {grupo.preguntas.map((item) => (
              <details key={item.p}>
                <summary>{item.p}</summary>
                <div className="nx-faq-answer">{item.r}</div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <div className="nx-faq-cta">
        <h2>¿Tienes otra pregunta?</h2>
        <p>
          Escríbenos y te respondemos directamente. También puedes revisar nuestros{" "}
          <Link href="/terminos">términos y condiciones</Link>.
        </p>
        <a
          className="nx-btn nx-btn-whatsapp"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          Escríbenos por WhatsApp
        </a>
      </div>
    </LegalPage>
  );
}
