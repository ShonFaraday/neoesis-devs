// Datos del cuestionario de cotización (/cotizar).
// Para agregar o quitar rubros, preguntas u opciones, edita solo este archivo.
import type { LucideIcon } from "lucide-react";
import {
  Activity, Apple, Baby, Beer, Bike, Book, BookOpen, Bot, Boxes, Briefcase, Bug, Building, Calculator,
  CalendarDays, Camera, Car, ChefHat, Church, Clapperboard, Coffee, CreditCard, Croissant, Dog,
  Dumbbell, Factory, FileText, Film, FlaskConical, Flower, Flower2, Footprints, Gem, Glasses, Globe,
  GraduationCap, Hammer, HandHeart, HardHat, Heart, HeartPulse, Hotel, House, IceCreamCone, Image, Key,
  Languages, Laptop, LayoutDashboard, LayoutTemplate, Leaf, Lightbulb, Mail, Map as MapIcon, MapPin, Megaphone,
  MessageCircle, Mic, Music, Newspaper, Package, PackageOpen, Palette, PartyPopper, PawPrint, PenTool,
  Pill, Pizza, Plane, Plug, QrCode, Receipt, Rocket, Ruler, Scale, School, Scissors, Shield, Shirt,
  ShoppingCart, Sofa, Soup, Sparkles, SprayCan, Stamp, Star, Stethoscope, Store, Swords, Tag, Target,
  Toothbrush, ToyBrick, Tractor, TreePine, Trophy, Truck, User, Users, UtensilsCrossed, Warehouse,
  Wine, Wrench, Zap, CircleUser, WandSparkles, Smartphone,
} from "lucide-react";

export type Opcion = { id: string; label: string; icon?: LucideIcon; desc?: string };

export type PreguntaRubro = {
  id: string;
  label: string;
  tipo: "single" | "multi";
  opciones: string[];
};

// ---------- Paso 1: paquete ----------
// Mantén estos precios iguales a los de components/site/paquetes.tsx
export const PAQUETES_COT: Opcion[] = [
  { id: "landing-sencilla", label: "Landing sencilla", desc: "US$ 190 – 230 · una página directa", icon: LayoutTemplate },
  { id: "landing-profesional", label: "Landing profesional", desc: "Desde US$ 310 · varias secciones y animaciones", icon: Sparkles },
  { id: "sistema", label: "Sistema a medida", desc: "A cotizar · tiendas, paneles, facturación", icon: LayoutDashboard },
  { id: "asesoria", label: "No estoy seguro", desc: "Asesórenme según mi negocio", icon: Lightbulb },
];

// ---------- Preguntas específicas por rubro ----------
const SI_NO = ["Sí", "No", "Aún no lo sé"];

export const PREGUNTAS: Record<string, PreguntaRubro[]> = {
  comida: [
    { id: "carta-qr", label: "¿Quieres una carta digital con código QR?", tipo: "single", opciones: SI_NO },
    { id: "delivery", label: "¿Cómo haces delivery?", tipo: "multi", opciones: ["Delivery propio", "Rappi", "PedidosYa", "Solo recojo en local", "No hago delivery"] },
    { id: "reservas-mesa", label: "¿Necesitas reservas de mesa?", tipo: "single", opciones: SI_NO },
    { id: "menu-cambia", label: "¿Cada cuánto cambia tu menú?", tipo: "single", opciones: ["A diario (menú del día)", "Cada semana", "Cada mes", "Casi nunca"] },
  ],
  salud: [
    { id: "citas", label: "¿Quieres que agenden citas online?", tipo: "single", opciones: SI_NO },
    { id: "especialidades", label: "¿Cuántas especialidades o servicios ofreces?", tipo: "single", opciones: ["1", "2 a 5", "Más de 5"] },
    { id: "seguros", label: "¿Atiendes con seguros o convenios?", tipo: "single", opciones: SI_NO },
    { id: "equipo", label: "¿Quieres presentar a tu equipo de profesionales?", tipo: "single", opciones: SI_NO },
  ],
  belleza: [
    { id: "citas", label: "¿Quieres reservas o citas online?", tipo: "single", opciones: SI_NO },
    { id: "servicios", label: "¿Cuántos servicios ofreces?", tipo: "single", opciones: ["1 a 10", "10 a 30", "Más de 30"] },
    { id: "antes-despues", label: "¿Quieres una galería de antes y después?", tipo: "single", opciones: SI_NO },
    { id: "equipo", label: "¿Quieres mostrar a tu equipo?", tipo: "single", opciones: SI_NO },
  ],
  deporte: [
    { id: "horarios", label: "¿Necesitas mostrar horarios de clases?", tipo: "single", opciones: SI_NO },
    { id: "membresias", label: "¿Vendes planes o membresías?", tipo: "single", opciones: SI_NO },
    { id: "reservas", label: "¿Quieres reservas de clases o canchas?", tipo: "single", opciones: SI_NO },
    { id: "entrenadores", label: "¿Quieres presentar a tus entrenadores?", tipo: "single", opciones: SI_NO },
  ],
  educacion: [
    { id: "modalidad", label: "¿Cuál es la modalidad?", tipo: "single", opciones: ["Presencial", "Virtual", "Ambas"] },
    { id: "matricula", label: "¿Quieres matrícula o inscripción online?", tipo: "single", opciones: SI_NO },
    { id: "calendario", label: "¿Necesitas un calendario de clases?", tipo: "single", opciones: SI_NO },
    { id: "aula", label: "¿Necesitas un aula virtual?", tipo: "single", opciones: SI_NO },
  ],
  tiendas: [
    { id: "productos", label: "¿Cuántos productos tienes aproximadamente?", tipo: "single", opciones: ["1 a 20", "20 a 100", "100 a 500", "Más de 500"] },
    { id: "venta", label: "¿Cómo quieres vender?", tipo: "single", opciones: ["Tienda online con pagos", "Catálogo con pedido por WhatsApp", "Aún no lo sé"] },
    { id: "envios", label: "¿A dónde haces envíos?", tipo: "multi", opciones: ["Solo Lima", "Todo el Perú", "Internacional", "No hago envíos"] },
  ],
  profesionales: [
    { id: "consultas", label: "¿Quieres que agenden consultas online?", tipo: "single", opciones: SI_NO },
    { id: "cotizador", label: "¿Te sirve un cotizador en la web?", tipo: "single", opciones: SI_NO },
    { id: "casos", label: "¿Quieres mostrar casos o proyectos realizados?", tipo: "single", opciones: SI_NO },
  ],
  listados: [
    { id: "listado", label: "¿Necesitas un listado con filtros (precio, zona, tipo)?", tipo: "single", opciones: SI_NO },
    { id: "cantidad", label: "¿Cuántos ítems publicarías aproximadamente?", tipo: "single", opciones: ["1 a 20", "20 a 100", "Más de 100"] },
    { id: "contacto-item", label: "¿Botón de WhatsApp en cada publicación?", tipo: "single", opciones: SI_NO },
  ],
  hogar: [
    { id: "cotizador", label: "¿Te sirve un cotizador en la web?", tipo: "single", opciones: SI_NO },
    { id: "cobertura", label: "¿Cuál es tu zona de cobertura?", tipo: "single", opciones: ["Un distrito", "Varios distritos", "Toda Lima", "Varias ciudades"] },
    { id: "urgencias", label: "¿Atiendes urgencias 24/7?", tipo: "single", opciones: SI_NO },
  ],
  turismo: [
    { id: "reservas", label: "¿Quieres reservas online?", tipo: "single", opciones: SI_NO },
    { id: "idiomas", label: "¿En qué idiomas?", tipo: "single", opciones: ["Solo español", "Español e inglés", "Más idiomas"] },
    { id: "tarifas", label: "¿Mostrarás paquetes o tarifas?", tipo: "single", opciones: SI_NO },
  ],
  personal: [
    { id: "portafolio", label: "¿Qué quieres mostrar?", tipo: "multi", opciones: ["Fotos", "Videos", "Música", "Escritos", "Proyectos"] },
    { id: "venta", label: "¿Vendes servicios o productos?", tipo: "single", opciones: SI_NO },
    { id: "blog", label: "¿Quieres un blog?", tipo: "single", opciones: SI_NO },
  ],
  empresas: [
    { id: "catalogo", label: "¿Necesitas un catálogo de productos?", tipo: "single", opciones: SI_NO },
    { id: "clientes", label: "¿Quieres mostrar logos de tus clientes?", tipo: "single", opciones: SI_NO },
    { id: "b2b", label: "¿Recibes cotizaciones de empresas (B2B)?", tipo: "single", opciones: SI_NO },
  ],
};

// ---------- Paso 2: rubros ----------
export type Categoria = { id: string; label: string; icon: LucideIcon; preguntas?: string; rubros: Opcion[] };

export const CATEGORIAS: Categoria[] = [
  {
    id: "comida", label: "Comida y bebidas", icon: UtensilsCrossed, preguntas: "comida",
    rubros: [
      { id: "restaurante", label: "Restaurante", icon: UtensilsCrossed },
      { id: "cevicheria", label: "Cevichería", icon: Soup },
      { id: "polleria", label: "Pollería", icon: ChefHat },
      { id: "chifa", label: "Chifa", icon: Soup },
      { id: "cafeteria", label: "Cafetería", icon: Coffee },
      { id: "pasteleria", label: "Pastelería o panadería", icon: Croissant },
      { id: "heladeria", label: "Heladería", icon: IceCreamCone },
      { id: "jugueria", label: "Juguería", icon: Apple },
      { id: "bar", label: "Bar o discoteca", icon: Beer },
      { id: "comida-rapida", label: "Comida rápida o food truck", icon: Pizza },
      { id: "dark-kitchen", label: "Delivery o dark kitchen", icon: Truck },
      { id: "catering", label: "Catering", icon: Wine },
    ],
  },
  {
    id: "salud", label: "Salud", icon: Stethoscope, preguntas: "salud",
    rubros: [
      { id: "consultorio", label: "Consultorio médico", icon: Stethoscope },
      { id: "dental", label: "Clínica dental", icon: Toothbrush },
      { id: "psicologia", label: "Psicología", icon: Heart },
      { id: "nutricion", label: "Nutrición", icon: Apple },
      { id: "fisioterapia", label: "Fisioterapia", icon: Activity },
      { id: "veterinaria", label: "Veterinaria", icon: PawPrint },
      { id: "botica", label: "Botica o farmacia", icon: Pill },
      { id: "optica", label: "Óptica", icon: Glasses },
      { id: "laboratorio", label: "Laboratorio clínico", icon: FlaskConical },
    ],
  },
  {
    id: "belleza", label: "Belleza", icon: Scissors, preguntas: "belleza",
    rubros: [
      { id: "peluqueria", label: "Peluquería", icon: Scissors },
      { id: "barberia", label: "Barbería", icon: Scissors },
      { id: "unas", label: "Salón de uñas", icon: Sparkles },
      { id: "spa", label: "Spa", icon: Flower2 },
      { id: "estetica", label: "Centro de estética", icon: Sparkles },
      { id: "maquillaje", label: "Maquillaje", icon: Palette },
      { id: "tatuajes", label: "Tatuajes", icon: PenTool },
    ],
  },
  {
    id: "deporte", label: "Deporte y bienestar", icon: Dumbbell, preguntas: "deporte",
    rubros: [
      { id: "gimnasio", label: "Gimnasio", icon: Dumbbell },
      { id: "crossfit", label: "Crossfit", icon: Zap },
      { id: "yoga", label: "Yoga o pilates", icon: Leaf },
      { id: "artes-marciales", label: "Artes marciales", icon: Swords },
      { id: "entrenador", label: "Entrenador personal", icon: Bike },
      { id: "canchas", label: "Canchas deportivas", icon: Trophy },
    ],
  },
  {
    id: "educacion", label: "Educación", icon: GraduationCap, preguntas: "educacion",
    rubros: [
      { id: "colegio", label: "Nido o colegio", icon: School },
      { id: "preuniversitaria", label: "Academia preuniversitaria", icon: GraduationCap },
      { id: "idiomas", label: "Idiomas", icon: Languages },
      { id: "clases-particulares", label: "Clases particulares", icon: BookOpen },
      { id: "cursos-online", label: "Cursos online", icon: Laptop },
      { id: "musica-danza", label: "Música o danza", icon: Music },
      { id: "manejo", label: "Escuela de manejo", icon: Car },
    ],
  },
  {
    id: "tiendas", label: "Tiendas y comercio", icon: Store, preguntas: "tiendas",
    rubros: [
      { id: "ropa", label: "Ropa y moda", icon: Shirt },
      { id: "calzado", label: "Calzado", icon: Footprints },
      { id: "joyeria", label: "Joyería y accesorios", icon: Gem },
      { id: "tecnologia", label: "Tecnología y celulares", icon: Smartphone },
      { id: "ferreteria", label: "Ferretería", icon: Hammer },
      { id: "minimarket", label: "Bodega o minimarket", icon: Store },
      { id: "libreria", label: "Librería", icon: Book },
      { id: "jugueteria", label: "Juguetería", icon: ToyBrick },
      { id: "muebleria", label: "Mueblería", icon: Sofa },
      { id: "floreria", label: "Florería", icon: Flower },
      { id: "mascotas", label: "Tienda de mascotas", icon: Dog },
      { id: "cosmeticos", label: "Cosméticos", icon: Sparkles },
    ],
  },
  {
    id: "profesionales", label: "Servicios profesionales", icon: Briefcase, preguntas: "profesionales",
    rubros: [
      { id: "abogados", label: "Abogados", icon: Scale },
      { id: "contadores", label: "Contadores", icon: Calculator },
      { id: "arquitectura", label: "Arquitectura", icon: Ruler },
      { id: "construccion", label: "Construcción e ingeniería", icon: HardHat },
      { id: "inmobiliaria", label: "Inmobiliaria", icon: Building },
      { id: "consultoria", label: "Consultoría", icon: Briefcase },
      { id: "marketing", label: "Agencia de marketing", icon: Megaphone },
      { id: "seguros", label: "Seguros", icon: Shield },
      { id: "notaria", label: "Notaría", icon: Stamp },
    ],
  },
  {
    id: "hogar", label: "Hogar y técnicos", icon: Wrench, preguntas: "hogar",
    rubros: [
      { id: "gasfiteria", label: "Gasfitería o electricidad", icon: Plug },
      { id: "limpieza", label: "Limpieza", icon: SprayCan },
      { id: "mudanzas", label: "Mudanzas", icon: PackageOpen },
      { id: "carpinteria", label: "Carpintería", icon: Hammer },
      { id: "jardineria", label: "Jardinería", icon: TreePine },
      { id: "fumigacion", label: "Fumigación", icon: Bug },
      { id: "electrodomesticos", label: "Reparación de electrodomésticos", icon: Wrench },
      { id: "cerrajeria", label: "Cerrajería", icon: Key },
    ],
  },
  {
    id: "automotriz", label: "Automotriz", icon: Car, preguntas: "listados",
    rubros: [
      { id: "taller", label: "Taller mecánico", icon: Wrench },
      { id: "lavado", label: "Lavado de autos", icon: SprayCan },
      { id: "venta-autos", label: "Venta de autos o repuestos", icon: Car },
      { id: "alquiler-autos", label: "Alquiler de vehículos", icon: Key },
    ],
  },
  {
    id: "turismo", label: "Turismo y eventos", icon: Plane, preguntas: "turismo",
    rubros: [
      { id: "hotel", label: "Hotel u hostal", icon: Hotel },
      { id: "agencia-viajes", label: "Agencia de viajes", icon: Plane },
      { id: "eventos", label: "Organización de eventos", icon: PartyPopper },
      { id: "fotografia", label: "Fotografía y video", icon: Camera },
      { id: "wedding", label: "Wedding planner", icon: Heart },
      { id: "local-eventos", label: "Local de eventos", icon: Building },
    ],
  },
  {
    id: "personal", label: "Personal y creativos", icon: CircleUser, preguntas: "personal",
    rubros: [
      { id: "marca-personal", label: "Marca personal", icon: User },
      { id: "portafolio", label: "Portafolio", icon: Image },
      { id: "artista", label: "Artista o músico", icon: Mic },
      { id: "creador", label: "Creador de contenido", icon: Clapperboard },
      { id: "blog", label: "Blog", icon: FileText },
    ],
  },
  {
    id: "empresas", label: "Empresas y otros", icon: Factory, preguntas: "empresas",
    rubros: [
      { id: "fabrica", label: "Fábrica", icon: Factory },
      { id: "distribuidora", label: "Distribuidora o mayorista", icon: Warehouse },
      { id: "logistica", label: "Transporte y logística", icon: Truck },
      { id: "agroindustria", label: "Agroindustria", icon: Tractor },
      { id: "ong", label: "ONG o fundación", icon: HandHeart },
      { id: "iglesia", label: "Iglesia o comunidad", icon: Church },
      { id: "startup", label: "Startup o app", icon: Rocket },
    ],
  },
];

export const RUBRO_OTRO = "otro";

// Algunos rubros usan un set de preguntas distinto al de su categoría
const PREGUNTAS_POR_RUBRO: Record<string, string> = { inmobiliaria: "listados", taller: "hogar", lavado: "hogar" };

export function buscarRubro(id: string) {
  for (const c of CATEGORIAS) {
    const r = c.rubros.find((x) => x.id === id);
    if (r) return { rubro: r, categoria: c };
  }
  return null;
}

export function preguntasDe(rubroId: string): PreguntaRubro[] {
  if (!rubroId || rubroId === RUBRO_OTRO) return [];
  const clave = PREGUNTAS_POR_RUBRO[rubroId] ?? buscarRubro(rubroId)?.categoria.preguntas;
  return clave ? PREGUNTAS[clave] ?? [] : [];
}

// ---------- Paso 4: negocio ----------
export const ESTADO_NEGOCIO: Opcion[] = [
  { id: "nuevo", label: "Es nuevo", icon: Rocket },
  { id: "funciona", label: "Ya funciona", icon: Store },
];
export const ANTIGUEDAD = ["Menos de 1 año", "1 a 3 años", "3 a 10 años", "Más de 10 años"];
export const ATENCION: Opcion[] = [
  { id: "local", label: "Local físico", icon: Store },
  { id: "online", label: "Online", icon: Globe },
  { id: "domicilio", label: "A domicilio", icon: Truck },
];
export const PUBLICO: Opcion[] = [
  { id: "jovenes", label: "Jóvenes", icon: Zap },
  { id: "familias", label: "Familias", icon: Users },
  { id: "empresas", label: "Empresas", icon: Building },
  { id: "profesionales", label: "Profesionales", icon: Briefcase },
  { id: "turistas", label: "Turistas", icon: Plane },
  { id: "adultos-mayores", label: "Adultos mayores", icon: HeartPulse },
  { id: "padres", label: "Padres de familia", icon: Baby },
];

// ---------- Paso 5: objetivos ----------
export const OBJETIVOS: Opcion[] = [
  { id: "whatsapp", label: "Recibir mensajes por WhatsApp", icon: MessageCircle },
  { id: "catalogo", label: "Mostrar mis productos o menú", icon: Package },
  { id: "vender", label: "Vender online", icon: ShoppingCart },
  { id: "reservas", label: "Recibir reservas o citas", icon: CalendarDays },
  { id: "google", label: "Aparecer en Google", icon: Target },
  { id: "imagen", label: "Dar una imagen profesional", icon: Star },
  { id: "ubicacion", label: "Mostrar ubicación y horarios", icon: MapPin },
  { id: "cotizaciones", label: "Recibir cotizaciones", icon: Receipt },
  { id: "portafolio", label: "Mostrar mi portafolio", icon: Image },
  { id: "reclutar", label: "Reclutar personal", icon: Users },
];

// ---------- Paso 6: secciones ----------
export const SECCIONES: Opcion[] = [
  { id: "inicio", label: "Inicio", icon: House },
  { id: "nosotros", label: "Quiénes somos", icon: Users },
  { id: "servicios", label: "Servicios", icon: Briefcase },
  { id: "productos", label: "Productos o catálogo", icon: Package },
  { id: "menu", label: "Menú o carta", icon: UtensilsCrossed },
  { id: "precios", label: "Precios", icon: Tag },
  { id: "galeria", label: "Galería", icon: Image },
  { id: "portafolio", label: "Portafolio", icon: LayoutTemplate },
  { id: "testimonios", label: "Testimonios o reseñas", icon: Star },
  { id: "equipo", label: "Equipo", icon: CircleUser },
  { id: "faq", label: "Preguntas frecuentes", icon: Lightbulb },
  { id: "blog", label: "Blog o noticias", icon: Newspaper },
  { id: "promociones", label: "Promociones", icon: PartyPopper },
  { id: "trabaja", label: "Trabaja con nosotros", icon: Briefcase },
  { id: "mapa", label: "Mapa y horarios", icon: MapIcon },
  { id: "contacto", label: "Contacto", icon: Mail },
  { id: "reclamaciones", label: "Libro de Reclamaciones", icon: Book, desc: "Obligatorio en Perú si vendes al público" },
  { id: "legales", label: "Términos y privacidad", icon: FileText },
];

// ---------- Paso 7: funciones ----------
export const FUNCIONES: Opcion[] = [
  { id: "whatsapp", label: "Botón de WhatsApp", icon: MessageCircle },
  { id: "formulario", label: "Formulario de contacto", icon: Mail },
  { id: "chat", label: "Chat en vivo", icon: Bot },
  { id: "tienda", label: "Carrito de compras", icon: ShoppingCart },
  { id: "pagos", label: "Pagos online (tarjeta o Yape)", icon: CreditCard },
  { id: "pedidos", label: "Delivery o pedidos", icon: Truck },
  { id: "reservas", label: "Reservas y citas", icon: CalendarDays },
  { id: "carta-qr", label: "Carta digital con QR", icon: QrCode },
  { id: "redes", label: "Integración con Instagram y TikTok", icon: Camera },
  { id: "maps", label: "Google Maps", icon: MapPin },
  { id: "resenas", label: "Reseñas de Google", icon: Star },
  { id: "idiomas", label: "Varios idiomas", icon: Languages },
  { id: "newsletter", label: "Newsletter", icon: Newspaper },
  { id: "login", label: "Área de clientes con inicio de sesión", icon: User },
  { id: "panel", label: "Panel para editar el contenido", icon: LayoutDashboard },
  { id: "facturacion", label: "Facturación electrónica", icon: Receipt },
  { id: "inventario", label: "Inventario", icon: Boxes },
  { id: "cotizador", label: "Cotizador automático", icon: Calculator },
  { id: "animaciones", label: "Animaciones", icon: WandSparkles },
  { id: "video", label: "Video de fondo", icon: Film },
];

// ---------- Paso 8: estilo ----------
export type Estilo = Opcion & {
  tema: { bg: string; surface: string; text: string; muted: string; accent: string; accent2: string; radius: number; serif?: boolean };
};

export const ESTILOS: Estilo[] = [
  { id: "minimalista", label: "Minimalista", desc: "Limpio, mucho espacio", tema: { bg: "#ffffff", surface: "#f4f4f5", text: "#18181b", muted: "#71717a", accent: "#18181b", accent2: "#52525b", radius: 6 } },
  { id: "moderno", label: "Moderno o tecnológico", desc: "Brillos y degradados", tema: { bg: "#0b1020", surface: "#151c33", text: "#e8ecff", muted: "#8b93b8", accent: "#4f7cff", accent2: "#22d3ee", radius: 14 } },
  { id: "elegante", label: "Elegante o de lujo", desc: "Dorado y serif", tema: { bg: "#0f0d0a", surface: "#1c1914", text: "#f5efe3", muted: "#a89f8c", accent: "#c9a45c", accent2: "#e8d3a3", radius: 2, serif: true } },
  { id: "divertido", label: "Divertido y colorido", desc: "Alegre y vibrante", tema: { bg: "#fff7ed", surface: "#ffe4e6", text: "#3b0764", muted: "#86198f", accent: "#f43f5e", accent2: "#f59e0b", radius: 22 } },
  { id: "corporativo", label: "Corporativo", desc: "Serio y confiable", tema: { bg: "#f8fafc", surface: "#e2e8f0", text: "#0f172a", muted: "#475569", accent: "#1d4ed8", accent2: "#0ea5e9", radius: 8 } },
  { id: "natural", label: "Natural u orgánico", desc: "Verdes y tierra", tema: { bg: "#f6f3ea", surface: "#e7efe0", text: "#1f2d1c", muted: "#5b6b55", accent: "#4d7c0f", accent2: "#a3a35a", radius: 16 } },
  { id: "rustico", label: "Rústico o artesanal", desc: "Cálido y hecho a mano", tema: { bg: "#f3e9dc", surface: "#e6d3bb", text: "#3b2a1a", muted: "#7c5f45", accent: "#9a3412", accent2: "#c2410c", radius: 4, serif: true } },
  { id: "juvenil", label: "Juvenil o urbano", desc: "Contraste y energía", tema: { bg: "#111111", surface: "#1f1f1f", text: "#fafafa", muted: "#a3a3a3", accent: "#a3e635", accent2: "#f0abfc", radius: 12 } },
  { id: "retro", label: "Retro", desc: "Tonos vintage", tema: { bg: "#fdf0d5", surface: "#f4d6a0", text: "#3d2c1e", muted: "#7a5c3e", accent: "#e76f51", accent2: "#2a9d8f", radius: 10 } },
  { id: "oscuro", label: "Oscuro premium", desc: "Como esta página", tema: { bg: "#0c0915", surface: "#1b1530", text: "#f3f0fb", muted: "#a8a1c4", accent: "#9d74ff", accent2: "#e07bff", radius: 14 } },
];

// Distribuciones de la vista previa (botón "Reorganizar")
export type Distribucion = { id: string; label: string; hero: "centrado" | "dividido" | "editorial" | "bento"; orden: string[] | null };

export const DISTRIBUCIONES: Distribucion[] = [
  { id: "clasica", label: "Clásica", hero: "centrado", orden: null },
  { id: "ventas", label: "Enfocada en ventas", hero: "dividido", orden: ["promociones", "productos", "menu", "precios", "testimonios", "galeria", "servicios", "portafolio", "nosotros", "equipo", "faq", "blog", "trabaja", "mapa", "contacto"] },
  { id: "historia", label: "Historia primero", hero: "editorial", orden: ["nosotros", "equipo", "servicios", "portafolio", "galeria", "menu", "productos", "testimonios", "precios", "blog", "promociones", "faq", "trabaja", "mapa", "contacto"] },
  { id: "confianza", label: "Confianza", hero: "bento", orden: ["testimonios", "servicios", "productos", "menu", "precios", "portafolio", "galeria", "nosotros", "equipo", "faq", "promociones", "blog", "trabaja", "mapa", "contacto"] },
];

export const COLORES: Opcion[] = [
  { id: "tengo", label: "Tengo colores de marca", icon: Palette },
  { id: "sugieran", label: "Sugiéranme ustedes", icon: WandSparkles },
];
export const TONOS = ["Cercano", "Formal", "Divertido", "Inspirador", "Técnico"];

// ---------- Paso 9: materiales ----------
export const MATERIALES: { id: "logo" | "fotos" | "textos" | "dominio"; label: string; icon: LucideIcon; opciones: string[] }[] = [
  { id: "logo", label: "Logo", icon: Sparkles, opciones: ["Sí tengo", "No tengo", "Necesito uno"] },
  { id: "fotos", label: "Fotos", icon: Camera, opciones: ["Tengo fotos propias", "No tengo", "Necesito una sesión"] },
  { id: "textos", label: "Textos", icon: FileText, opciones: ["Los tengo listos", "Necesito que los redacten"] },
  { id: "dominio", label: "Dominio (.com, .pe)", icon: Globe, opciones: ["Ya tengo", "Necesito uno", "No sé qué es"] },
];

// ---------- Paso 10: plazo, presupuesto y contacto ----------
export const PLAZOS = ["Urgente (menos de 1 semana)", "2 a 3 semanas", "1 mes", "Sin apuro"];
export const PRESUPUESTOS = ["US$ 190 – 230", "US$ 230 – 310", "US$ 310 – 500", "Más de US$ 500", "No lo sé"];
export const MANTENIMIENTO = ["Plan ECO", "Plan PREMIUM", "Todavía no"];
export const HORARIOS = ["Mañana", "Tarde", "Noche", "Cualquier hora"];

// ---------- Estado del cuestionario ----------
export type Respuestas = {
  paquete: string;
  rubro: string;
  rubroOtro: string;
  especificas: Record<string, string | string[]>;
  negocioNombre: string;
  estadoNegocio: string;
  antiguedad: string;
  ubicacion: string;
  atencion: string[];
  publico: string[];
  descripcion: string;
  objetivos: string[];
  secciones: string[];
  funciones: string[];
  estilo: string;
  distribucion: string;
  colores: string;
  coloresMarca: string;
  coloresEvitar: string;
  tono: string;
  referencias: string;
  materiales: Record<"logo" | "fotos" | "textos" | "dominio", string>;
  webActual: string;
  redes: string;
  plazo: string;
  presupuesto: string;
  mantenimiento: string;
  nombre: string;
  whatsapp: string;
  correo: string;
  horario: string;
  comentarios: string;
  acepta: boolean;
};

export const RESPUESTAS_INICIALES: Respuestas = {
  paquete: "",
  rubro: "",
  rubroOtro: "",
  especificas: {},
  negocioNombre: "",
  estadoNegocio: "",
  antiguedad: "",
  ubicacion: "",
  atencion: [],
  publico: [],
  descripcion: "",
  objetivos: [],
  secciones: ["inicio", "contacto"],
  funciones: ["whatsapp"],
  estilo: "",
  distribucion: "clasica",
  colores: "",
  coloresMarca: "",
  coloresEvitar: "",
  tono: "",
  referencias: "",
  materiales: { logo: "", fotos: "", textos: "", dominio: "" },
  webActual: "",
  redes: "",
  plazo: "",
  presupuesto: "",
  mantenimiento: "",
  nombre: "",
  whatsapp: "",
  correo: "",
  horario: "",
  comentarios: "",
  acepta: false,
};

// ---------- Resumen y mensaje de WhatsApp ----------
const etiqueta = (lista: Opcion[], id: string) => lista.find((o) => o.id === id)?.label ?? id;
const etiquetas = (lista: Opcion[], ids: string[]) => ids.map((id) => etiqueta(lista, id)).join(", ");

export function nombreRubro(r: Respuestas) {
  if (r.rubro === RUBRO_OTRO) return r.rubroOtro.trim() || "Otro";
  return buscarRubro(r.rubro)?.rubro.label ?? "";
}

export type GrupoResumen = { paso: string; titulo: string; items: [string, string][] };

export function resumen(r: Respuestas): GrupoResumen[] {
  const g: GrupoResumen[] = [];
  const add = (paso: string, titulo: string, items: [string, string | undefined | false][]) => {
    const limpios = items.filter((i): i is [string, string] => typeof i[1] === "string" && i[1].trim() !== "");
    if (limpios.length) g.push({ paso, titulo, items: limpios });
  };

  add("paquete", "Paquete", [["Paquete", r.paquete && etiqueta(PAQUETES_COT, r.paquete)]]);
  add("negocio", "Negocio", [
    ["Nombre", r.negocioNombre],
    ["Rubro", nombreRubro(r)],
    ["Estado", r.estadoNegocio && etiqueta(ESTADO_NEGOCIO, r.estadoNegocio) + (r.antiguedad ? ` (${r.antiguedad})` : "")],
    ["Ubicación", r.ubicacion],
    ["Atención", etiquetas(ATENCION, r.atencion)],
    ["Público", etiquetas(PUBLICO, r.publico)],
    ["Descripción", r.descripcion],
  ]);
  const preg = preguntasDe(r.rubro);
  add(
    "especificas",
    "Detalles del rubro",
    preg.map((p) => {
      const v = r.especificas[p.id];
      return [p.label.replace(/^¿|\?$/g, ""), Array.isArray(v) ? v.join(", ") : v];
    })
  );
  add("objetivos", "Objetivos", [["Quiero", etiquetas(OBJETIVOS, r.objetivos)]]);
  add("secciones", "Secciones", [["Secciones", etiquetas(SECCIONES, r.secciones)]]);
  add("funciones", "Funciones", [["Funciones", etiquetas(FUNCIONES, r.funciones)]]);
  add("estilo", "Estilo", [
    ["Estilo", r.estilo && etiqueta(ESTILOS, r.estilo)],
    ["Distribución", r.distribucion && r.distribucion !== "clasica" ? etiqueta(DISTRIBUCIONES, r.distribucion) : ""],
    ["Colores", r.colores === "tengo" ? r.coloresMarca || "Tengo colores de marca" : r.colores && "Que ustedes sugieran"],
    ["Evitar", r.coloresEvitar],
    ["Tono", r.tono],
    ["Referencias", r.referencias],
  ]);
  add("materiales", "Materiales", [
    ...MATERIALES.map((m) => [m.label, r.materiales[m.id]] as [string, string]),
    ["Web actual", r.webActual],
    ["Redes", r.redes],
  ]);
  add("contacto", "Plazo y presupuesto", [
    ["Plazo", r.plazo],
    ["Presupuesto", r.presupuesto],
    ["Mantenimiento", r.mantenimiento],
  ]);
  add("contacto", "Contacto", [
    ["Nombre", r.nombre],
    ["WhatsApp", r.whatsapp],
    ["Correo", r.correo],
    ["Horario", r.horario],
    ["Comentarios", r.comentarios],
  ]);
  return g;
}

export function mensajeWhatsapp(r: Respuestas, marca: string) {
  const partes = [`Hola ${marca}, quiero cotizar mi página web. Estas son mis respuestas:`];
  for (const grupo of resumen(r)) {
    partes.push(`\n*${grupo.titulo}*`);
    for (const [k, v] of grupo.items) partes.push(`• ${k}: ${v}`);
  }
  return partes.join("\n");
}
