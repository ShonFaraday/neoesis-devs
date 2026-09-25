import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/site/legal-page";
import { BRAND_NAME, CITY, CONTACT_EMAIL, FOUNDERS, WHATSAPP_DISPLAY } from "@/lib/site-config";

const descripcion =
  "Condiciones de los servicios de diseño web y de los planes de mantenimiento de Neoesis DEVS®.";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: descripcion,
  alternates: { canonical: "/terminos" },
  openGraph: {
    title: "Términos y condiciones | Neoesis DEVS®",
    description: descripcion,
    url: "/terminos",
  },
};

const canales = CONTACT_EMAIL
  ? `por WhatsApp al ${WHATSAPP_DISPLAY} o al correo ${CONTACT_EMAIL}`
  : `por WhatsApp al ${WHATSAPP_DISPLAY}`;

export default function TerminosPage() {
  return (
    <LegalPage
      titulo="Términos y condiciones"
      intro={`Estos términos explican cómo trabajamos en ${BRAND_NAME} y las condiciones de nuestros servicios de diseño web y de nuestros planes de mantenimiento. Al contratar cualquiera de ellos, aceptas estas condiciones.`}
    >
      <h2>1. Quiénes somos</h2>
      <p>
        {BRAND_NAME} es una marca de diseño y publicación de páginas web a cargo de {FOUNDERS},
        con base en {CITY}. Puedes contactarnos {canales}.
      </p>

      <h2>2. Servicios de diseño web</h2>
      <p>Ofrecemos tres tipos de proyecto. Los precios publicados son referenciales:</p>
      <ul>
        <li>
          <strong>Landing sencilla:</strong> desde US$ 190 hasta US$ 230, pago único por el diseño.
        </li>
        <li>
          <strong>Landing profesional:</strong> desde US$ 310, según lo que requiera cada negocio.
        </li>
        <li>
          <strong>Sistemas a medida</strong> (facturación, tiendas online y desarrollos similares):
          precio a cotizar según el alcance.
        </li>
      </ul>
      <p>
        El precio final, el alcance, los plazos de entrega y el número de revisiones de cada proyecto
        se detallan en la cotización que te enviamos por escrito. El trabajo comienza cuando
        confirmas la cotización y se realiza el pago acordado en ella.
      </p>

      <h2>3. Dominio</h2>
      <p>
        Nuestros paquetes incluyen la gestión del dominio de tu página, sujeta al costo del dominio
        que elijas. El precio de cada dominio depende de su extensión (por ejemplo, .com o .pe) y te
        lo informamos antes de registrarlo. Las condiciones de su renovación anual se detallan en la
        cotización.
      </p>

      <h2>4. Contenido que nos entregas</h2>
      <p>
        Para construir tu página necesitamos tus textos, imágenes, logotipo y demás materiales. Al
        enviarlos, confirmas que tienes derecho a usarlos. No nos hacemos responsables por reclamos de
        terceros relacionados con el contenido que nos entregues.
      </p>

      <h2>5. Planes de mantenimiento</h2>
      <p>
        Después de publicar tu página puedes contratar un plan de mantenimiento, con pago mensual o
        anual:
      </p>
      <ul>
        <li>
          <strong>Plan ECO (US$ 27 al mes):</strong> hasta 4 horas de trabajo por semana, durante las 4
          semanas del mes. Incluye actualización de datos, cambios de tono y color, y atención a tus
          peticiones dentro del diseño actual. No incluye rediseño, cambios totales ni nuevas secciones
          o funciones que no sigan el formato de la página ya entregada.
        </li>
        <li>
          <strong>Plan PREMIUM (US$ 54 al mes):</strong> hasta 6 horas de trabajo por semana, durante
          las 4 semanas del mes. Incluye todo lo del plan ECO, además del rediseño de la página y la
          incorporación de nuevas secciones y funciones. Los cambios de mayor complejidad pueden
          tener un costo adicional, que te informaremos antes de realizarlos.
        </li>
        <li>
          <strong>Plan CUSTOMIZADO:</strong> para sistemas y desarrollos a medida. Su precio y sus
          condiciones se definen en una cotización específica.
        </li>
      </ul>
      <p>
        El límite de horas de cada plan es semanal. El pago anual de los planes ECO y PREMIUM tiene
        un 40% de descuento sobre el precio de 12 meses. Para cambiar de plan o cancelarlo, escríbenos{" "}
        {canales}.
      </p>

      <h2>6. Pagos</h2>
      <p>
        Todos los precios están expresados en dólares estadounidenses (US$). Puedes pagar en soles por
        Yape, Plin o transferencia bancaria, al tipo de cambio del día. Los servicios de terceros que requiera tu proyecto, como el registro
        del dominio, se cobran según su costo, que te informamos por adelantado.
      </p>

      <h2>7. Uso de la página entregada</h2>
      <p>
        Una vez cancelado el pago total del proyecto, puedes usar libremente la página que
        diseñamos para tu negocio. {BRAND_NAME} podrá mostrarla en su portafolio como ejemplo de su
        trabajo, salvo que nos pidas lo contrario.
      </p>

      <h2>8. Responsabilidad</h2>
      <p>
        Nos comprometemos a entregar un trabajo de calidad y a cumplir lo acordado en la cotización.
        Sin embargo, no podemos garantizar resultados comerciales específicos, como un número de
        ventas o de visitas. Tampoco somos responsables por fallas o cambios en servicios de terceros
        que no controlamos, como proveedores de dominio o de alojamiento, WhatsApp o entidades de pago.
      </p>

      <h2>9. Datos personales</h2>
      <p>
        El tratamiento de tus datos personales se rige por nuestra{" "}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>

      <h2>10. Consultas y reclamos</h2>
      <p>
        Si tienes alguna consulta o no estás conforme con nuestro servicio, escríbenos {canales}.
        Buscaremos una solución contigo lo antes posible.
      </p>

      <h2>11. Cambios en estos términos</h2>
      <p>
        Podemos actualizar estos términos. Los cambios no afectan los proyectos ni los planes ya
        contratados, que se rigen por las condiciones vigentes al momento de su contratación.
      </p>

      <h2>12. Ley aplicable</h2>
      <p>Estos términos se rigen por las leyes de la República del Perú.</p>
    </LegalPage>
  );
}
