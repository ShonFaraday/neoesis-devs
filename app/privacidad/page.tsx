import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import {
  BRAND_NAME,
  CITY,
  CONTACT_EMAIL,
  FOUNDERS,
  WHATSAPP_DISPLAY,
} from "@/lib/site-config";

const descripcion =
  "Cómo Neoesis DEVS® recopila, usa y protege los datos personales de quienes visitan su sitio web o contratan sus servicios.";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: descripcion,
  alternates: { canonical: "/privacidad" },
  openGraph: {
    title: "Política de privacidad | Neoesis DEVS®",
    description: descripcion,
    url: "/privacidad",
  },
};

const canales = CONTACT_EMAIL
  ? `por WhatsApp al ${WHATSAPP_DISPLAY} o al correo ${CONTACT_EMAIL}`
  : `por WhatsApp al ${WHATSAPP_DISPLAY}`;

export default function PrivacidadPage() {
  return (
    <LegalPage
      titulo="Política de privacidad"
      intro={`En ${BRAND_NAME} respetamos tu privacidad. Esta política explica qué datos personales tratamos, para qué los usamos y cómo puedes ejercer tus derechos, de acuerdo con la Ley N.° 29733, Ley de Protección de Datos Personales, y su Reglamento aprobado por el Decreto Supremo N.° 016-2024-JUS.`}
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        {BRAND_NAME} es una marca dedicada al diseño y publicación de páginas web, a cargo de{" "}
        {FOUNDERS}, con domicilio en {CITY}. Para cualquier consulta sobre tus datos personales,
        puedes escribirnos {canales}.
      </p>

      <h2>2. Qué datos recopilamos</h2>
      <p>Este sitio web no tiene formularios ni requiere que te registres. Tratamos datos en estos casos:</p>
      <ul>
        <li>
          <strong>Cuando nos escribes por WhatsApp:</strong> tu nombre, número de teléfono y la
          información que decidas compartir sobre tu negocio o proyecto.
        </li>
        <li>
          <strong>Cuando contratas un servicio:</strong> los datos necesarios para prestarlo, coordinar
          los pagos y, cuando corresponda, emitir comprobantes (por ejemplo, nombre o razón social, DNI
          o RUC).
        </li>
        <li>
          <strong>Datos técnicos de navegación:</strong> al visitar el sitio, nuestro proveedor de
          alojamiento puede registrar datos técnicos como la dirección IP, el tipo de navegador y la
          fecha y hora de la visita, necesarios para que el sitio funcione y se mantenga seguro.
        </li>
      </ul>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tus consultas y enviarte cotizaciones.</li>
        <li>Diseñar, publicar y dar mantenimiento a tu página web.</li>
        <li>Coordinar pagos y cumplir nuestras obligaciones tributarias y legales.</li>
        <li>Mantener el funcionamiento y la seguridad de este sitio web.</li>
      </ul>
      <p>
        No vendemos ni alquilamos tus datos personales, y no te enviaremos publicidad sin tu
        consentimiento previo.
      </p>

      <h2>4. Base para el tratamiento</h2>
      <p>
        Tratamos tus datos porque tú nos contactas y nos das tu consentimiento, porque son necesarios
        para cumplir el servicio que contratas, o porque la ley nos lo exige (por ejemplo, en materia
        tributaria).
      </p>

      <h2>5. Con quién compartimos tus datos</h2>
      <p>Para operar usamos servicios de terceros, que tratan la información según sus propias políticas:</p>
      <ul>
        <li>
          <strong>WhatsApp (Meta):</strong> canal por el que nos comunicamos contigo.
        </li>
        <li>
          <strong>Proveedor de alojamiento del sitio web:</strong> almacena y sirve esta página. Sus
          servidores pueden encontrarse fuera del Perú, por lo que los datos técnicos de navegación
          pueden ser objeto de transferencia internacional.
        </li>
        <li>
          <strong>Entidades de pago (Yape, Plin y bancos):</strong> procesan los pagos que realices.
        </li>
      </ul>
      <p>Fuera de estos casos, solo compartiremos tus datos si una autoridad competente lo exige.</p>

      <h2>6. Cookies</h2>
      <p>
        Actualmente este sitio no utiliza cookies de publicidad ni de analítica. Si en el futuro
        incorporamos herramientas de este tipo, actualizaremos esta política y, cuando corresponda,
        te pediremos tu consentimiento.
      </p>

      <h2>7. Cuánto tiempo conservamos tus datos</h2>
      <p>
        Conservamos tus datos mientras sean necesarios para atender tu consulta o prestarte el
        servicio, y luego durante los plazos que exija la normativa aplicable, como la tributaria.
        Después los eliminamos de forma segura.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Aplicamos medidas razonables para proteger tus datos contra pérdida, uso indebido o acceso no
        autorizado, y solo acceden a ellos las personas que los necesitan para atenderte.
      </p>

      <h2>9. Tus derechos</h2>
      <p>
        Como titular de tus datos puedes ejercer tus derechos de acceso, rectificación, cancelación y
        oposición, así como los demás que reconoce la normativa vigente. Para hacerlo, escríbenos{" "}
        {canales}, indicando tu nombre y tu solicitud. Te responderemos dentro de los plazos
        establecidos por ley.
      </p>
      <p>
        Si consideras que no atendimos correctamente tu solicitud, puedes acudir a la Autoridad
        Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.
      </p>

      <h2>10. Menores de edad</h2>
      <p>
        Nuestros servicios están dirigidos a personas mayores de edad. No recopilamos a sabiendas
        datos de menores de edad.
      </p>

      <h2>11. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política para reflejar cambios en nuestros servicios o en la
        normativa. La fecha de la última actualización aparece al inicio de esta página.
      </p>
    </LegalPage>
  );
}
