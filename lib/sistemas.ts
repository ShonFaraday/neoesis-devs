import {
  BookOpen,
  Boxes,
  CalendarCheck,
  Car,
  Cloud,
  DatabaseBackup,
  GraduationCap,
  Hammer,
  KeyRound,
  LayoutDashboard,
  Lock,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Store,
  UserRoundSearch,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { BRAND_NAME } from "./site-config";

// Sistemas a medida que ofrecemos.
// Para agregar uno nuevo, copia un bloque y cambia sus textos: la página lo muestra solo.
export type Sistema = {
  id: string;
  problema: string; // La pregunta con la que el cliente se reconoce
  nombre: string;
  descripcion: string;
  incluye: string[];
  icono: LucideIcon;
  ideal: string; // Para quién es (página /sistemas)
  detalle: string[]; // Funciones en detalle (página /sistemas)
};

export const SISTEMAS: Sistema[] = [
  {
    id: "crm",
    problema: "¿Llevas tus ventas en Excel o en un cuaderno?",
    nombre: "CRM de clientes y ventas",
    descripcion: "Todos tus clientes, ventas y seguimientos en un solo lugar, sin perder ningún dato.",
    incluye: ["Ficha de cada cliente", "Historial de ventas", "Recordatorios de seguimiento"],
    icono: Users,
    ideal: "Ideal para negocios que venden a clientes recurrentes y no quieren perder ninguna oportunidad.",
    detalle: [
      "Registro de clientes con sus datos y notas",
      "Etapas de venta: interesado, cotizado, cerrado",
      "Recordatorios para volver a contactar",
      "Reportes de ventas por mes y por vendedor",
    ],
  },
  {
    id: "intranet",
    problema: "¿Tu equipo comparte archivos y reportes por WhatsApp?",
    nombre: "Intranet y panel de administración",
    descripcion: "Un espacio privado para tu equipo, donde cada persona ve solo lo que le corresponde.",
    incluye: ["Usuarios con permisos", "Documentos ordenados", "Reportes del negocio"],
    icono: LayoutDashboard,
    ideal: "Ideal para empresas con varias personas o sedes que necesitan trabajar ordenadas.",
    detalle: [
      "Usuarios y roles: cada uno ve lo suyo",
      "Documentos y archivos en un solo lugar",
      "Comunicados y avisos para el equipo",
      "Reportes e indicadores del negocio",
    ],
  },
  {
    id: "inventario",
    problema: "¿No sabes cuánto stock te queda?",
    nombre: "Control de inventario y pedidos",
    descripcion: "Entradas, salidas y pedidos al día, con avisos cuando un producto se está acabando.",
    incluye: ["Stock en tiempo real", "Registro de pedidos", "Alertas de stock bajo"],
    icono: Boxes,
    ideal: "Ideal para tiendas, ferreterías, distribuidoras y talleres con repuestos.",
    detalle: [
      "Ingresos y salidas de productos",
      "Stock por almacén o local",
      "Pedidos de clientes y a proveedores",
      "Alertas cuando un producto se está acabando",
    ],
  },
  {
    id: "citas",
    problema: "¿Agendas citas a mano y se te cruzan los horarios?",
    nombre: "Sistema de citas y reservas",
    descripcion: "Tus clientes reservan en los horarios libres y tú ves tu agenda ordenada.",
    incluye: ["Agenda por día y semana", "Reservas sin cruces", "Confirmación por WhatsApp"],
    icono: CalendarCheck,
    ideal: "Ideal para clínicas, consultorios, salones, talleres y academias.",
    detalle: [
      "Agenda por profesional o por servicio",
      "Reservas solo en horarios disponibles",
      "Recordatorios y confirmación por WhatsApp",
      "Historial de atenciones de cada cliente",
    ],
  },
  {
    id: "portal",
    problema: "¿Tus clientes te escriben a cada rato para preguntar cómo va su pedido?",
    nombre: "Portal para tus clientes",
    descripcion: "Cada cliente entra con su usuario y consulta el estado de su pedido o servicio.",
    incluye: ["Acceso con usuario propio", "Estado de pedidos o servicios", "Historial y documentos"],
    icono: UserRoundSearch,
    ideal: "Ideal para talleres, laboratorios, estudios y empresas de servicios.",
    detalle: [
      "Acceso con usuario y contraseña para cada cliente",
      "Estado del pedido o servicio en tiempo real",
      "Descarga de documentos y comprobantes",
      "Menos mensajes preguntando \"¿cómo va lo mío?\"",
    ],
  },
  {
    id: "ecommerce",
    problema: "¿Vendes por redes pero todo lo coordinas por chat?",
    nombre: "Tienda online (e-commerce)",
    descripcion: "Un catálogo con carrito donde tus clientes eligen, piden y tú gestionas las ventas.",
    incluye: ["Catálogo con carrito", "Gestión de pedidos", "Panel para tus productos"],
    icono: ShoppingCart,
    ideal: "Ideal para tiendas que venden por redes y quieren ordenar sus pedidos.",
    detalle: [
      "Catálogo con fotos, precios y stock",
      "Carrito y pedido en línea",
      "Panel para gestionar productos y pedidos",
      "Integración con pagos o pedido por WhatsApp",
    ],
  },
];

// Mensaje de WhatsApp prellenado para cada sistema.
export function mensajeSistema(sistema: Sistema) {
  return `Hola ${BRAND_NAME}, me interesa el sistema "${sistema.nombre}" para mi negocio`;
}

// Precios referenciales de sistemas (pago único). Mantén iguales los de lib/cotizador.ts.
export const PRECIO_DESDE_SISTEMA = "US$ 1,000";

export const PRECIOS_SISTEMAS = [
  {
    nombre: "Sistema básico",
    precio: "Desde US$ 1,000",
    nota: "Pago único por el desarrollo",
    descripcion: "Para ordenar una sola área de tu negocio.",
    incluye: [
      "Un módulo principal (por ejemplo, CRM o inventario)",
      "Usuarios con acceso y contraseña",
      "Funciona en celular y computadora",
      "Capacitación para tu equipo",
      "30 días de garantía tras la entrega",
    ],
    destacado: false,
  },
  {
    nombre: "Sistema completo",
    precio: "US$ 1,500 – 2,000",
    nota: "Según complejidad y volumen de datos",
    descripcion: "Para negocios que necesitan varias áreas conectadas.",
    incluye: [
      "Todo lo del sistema básico",
      "Varios módulos conectados entre sí",
      "Roles y permisos por usuario",
      "Reportes e indicadores",
      "Integraciones (por ejemplo, facturación electrónica)",
    ],
    destacado: true,
  },
  {
    nombre: "Proyecto a medida",
    precio: "A cotizar",
    nota: "Según el alcance del proyecto",
    descripcion: "Para empresas con procesos propios o integraciones especiales.",
    incluye: [
      "Análisis de tus procesos",
      "Desarrollo por etapas con avances visibles",
      "Integraciones con otros sistemas",
      "Migración de tus datos actuales",
      "Plan de soporte a la medida",
    ],
    destacado: false,
  },
];

// Condiciones de pago y costos que se muestran junto a los precios.
export const CONDICIONES_SISTEMAS = [
  "Pagas por etapas: 50% al iniciar y 50% al entregar.",
  "El precio final depende de la complejidad del sistema y del volumen de datos de tu empresa.",
  "Si el sistema necesita un plan pagado de alojamiento por su cantidad de usuarios o datos, te lo informamos antes y su costo lo asume tu negocio.",
  "Después de la entrega, puedes contratar un plan de mantenimiento a la medida de tu sistema.",
];

// Cómo trabajamos un sistema (página /sistemas).
export const PASOS_SISTEMA = [
  { titulo: "Diagnóstico gratuito", texto: "Conversamos sobre cómo trabajas hoy y qué quieres resolver." },
  { titulo: "Propuesta y prototipo", texto: "Te mostramos cómo se verá el sistema antes de construirlo." },
  { titulo: "Desarrollo por etapas", texto: "Avanzamos por módulos y ves el progreso en cada entrega." },
  { titulo: "Capacitación", texto: "Le enseñamos a tu equipo a usarlo desde el primer día." },
  { titulo: "Soporte", texto: "Te acompañamos después de la entrega, con 30 días de garantía." },
];

export const TIEMPO_SISTEMA = "De 3 a 8 semanas según el alcance";

// Rubros para que el visitante se reconozca rápido.
export const RUBROS: { nombre: string; icono: LucideIcon }[] = [
  { nombre: "Talleres", icono: Car },
  { nombre: "Clínicas y consultorios", icono: Stethoscope },
  { nombre: "Restaurantes", icono: UtensilsCrossed },
  { nombre: "Ferreterías", icono: Hammer },
  { nombre: "Academias", icono: GraduationCap },
  { nombre: "Tiendas y distribuidoras", icono: Store },
];

// Confianza y seguridad de los sistemas.
export const SEGURIDAD: { titulo: string; texto: string; icono: LucideIcon }[] = [
  {
    titulo: "Acceso por roles",
    texto: "Cada persona entra con su usuario y contraseña, y ve solo lo que le corresponde.",
    icono: KeyRound,
  },
  {
    titulo: "Conexión segura",
    texto: "La información viaja cifrada (HTTPS) entre el sistema y quien lo usa.",
    icono: Lock,
  },
  {
    titulo: "Copias de seguridad",
    texto: "Tu información se respalda para que no se pierda ante un error o imprevisto.",
    icono: DatabaseBackup,
  },
  {
    titulo: "Garantía de 30 días",
    texto: "Corregimos sin costo los errores que aparezcan durante los 30 días posteriores a la entrega.",
    icono: ShieldCheck,
  },
  {
    titulo: "En la nube",
    texto: "Funciona desde el celular o la computadora, sin instalar nada.",
    icono: Cloud,
  },
  {
    titulo: "Capacitación incluida",
    texto: "Le enseñamos a tu equipo a usar el sistema desde el primer día.",
    icono: BookOpen,
  },
];

// Preguntas frecuentes sobre sistemas (se usan en el inicio y en /preguntas-frecuentes).
export const FAQ_SISTEMAS: { p: string; r: string }[] = [
  {
    p: "¿Cuánto cuesta un sistema a medida?",
    r: "Un sistema básico parte desde US$ 1,000, y uno más completo, con varios módulos y más datos, suele estar entre US$ 1,500 y US$ 2,000. El precio final depende de la complejidad y lo verás en la cotización por escrito. Puedes pagar en soles al tipo de cambio del día.",
  },
  {
    p: "¿Cuánto demora en estar listo?",
    r: "Entre 3 y 8 semanas según el alcance. Trabajamos por etapas, así que vas viendo avances desde las primeras semanas.",
  },
  {
    p: "¿Los datos de mi negocio son míos?",
    r: "Sí, siempre. La información que registras en tu sistema es de tu negocio y puedes pedirnos una copia completa cuando lo necesites.",
  },
  {
    p: "¿Funciona en el celular?",
    r: "Sí. Los sistemas se usan desde el navegador, así que funcionan en celular, tablet o computadora sin instalar nada.",
  },
  {
    p: "¿Puedo agregar funciones después?",
    r: "Sí. Construimos por etapas, así que tu sistema puede crecer con tu negocio. Cada función nueva se cotiza aparte o se incluye en tu plan de mantenimiento, según lo que necesites.",
  },
  {
    p: "¿Incluye capacitación?",
    r: "Sí. Al entregar el sistema le enseñamos a tu equipo a usarlo y resolvemos sus dudas durante los primeros días.",
  },
  {
    p: "¿El sistema emite facturas electrónicas?",
    r: "En Perú, las facturas electrónicas se emiten a través de un proveedor autorizado por SUNAT. Lo que hacemos es integrar tu sistema con tu proveedor de facturación, para que emitas tus comprobantes sin salir de él.",
  },
  {
    p: "¿Dónde se aloja el sistema?",
    r: "En servicios en la nube reconocidos, con planes gratuitos que cubren a la mayoría de negocios pequeños. Si tu sistema llega a necesitar un plan pagado por la cantidad de usuarios o datos, te lo informamos antes y su costo lo asume tu negocio.",
  },
  {
    p: "¿Hay copias de seguridad?",
    r: "Sí. Tu información se respalda de forma periódica para que puedas recuperarla ante cualquier imprevisto.",
  },
  {
    p: "¿Quién es dueño del código?",
    r: "Una vez cancelado el pago total del proyecto, puedes usar libremente el sistema que desarrollamos para tu negocio. Las condiciones exactas sobre el código fuente se indican en la cotización.",
  },
];
