// app/page.tsx
import Image from "next/image";
import Stripe from "stripe";
import { redirect } from "next/navigation";

type Lang = "es";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

// -----------------------------------------------------------------------------
// PRODUCTOS
// -----------------------------------------------------------------------------

const productos = [
  {
    id: "colombia-2024-home",
    name: "Camiseta Colombia Local 2024",
    description:
      "Camiseta estilo oficial para sentir el rugido del estadio desde Vancouver.",
    price: 1.9,
    currency: "CAD",
    image: "/images/jersey-2024.png",
    badge: "Lista para el partido",
  },
  {
    id: "retro-1990-2010",
    name: "Clásicos Tricolor Retro (1990–2010)",
    description:
      "Diseños icónicos para revivir tus mejores recuerdos con la selección.",
    price: 129,
    currency: "CAD",
    image: "/images/retro-jersey.png",
    badge: "Edición limitada",
  },
  {
    id: "special-edition",
    name: "Nombre y número personalizados",
    description:
      "Personaliza tu camiseta con tu nombre o el de tu héroe futbolero.",
    price: 139,
    currency: "CAD",
    image: "/images/custom-jersey.png",
    badge: "Favorita de la familia",
  },
];

// -----------------------------------------------------------------------------
// TEXTO EN ESPAÑOL
// -----------------------------------------------------------------------------

const t = {
  metaStrip: "Colombia · Vancouver · Día de partido",
  heroTitle: "La Tricolor llega a tu puerta",
  heroTitleStrong: "a tiempo",
  heroSubtitle:
    "Para colombianos en Canadá que sienten el estadio en el pecho. Somos una tienda familiar que se asegura de que tu camiseta llegue antes del partido, para que disfrutes el momento sin preocupaciones.",
  heroCta: "Prepárate para el próximo partido",
  heroTrusted: "Aficionados colombianos en todo Metro Vancouver confían en nosotros.",
  heroPill1: "Inventario transparente y comunicación en tiempo real",
  heroPill2: "Negocio familiar que entiende la nostalgia de hogar",

  navProducts: "Productos",
  navWhyUs: "Por qué nosotros",
  navContact: "Contacto",
  navShopNow: "Comprar ahora",

  whyTitle: "Hecho para colombianos en Canadá que nunca se pierden un partido.",
  whySubtitle:
    "Combinamos puntualidad en las entregas, comunicación transparente y el calor de una empresa familiar para que te sientas más cerca de Colombia cada día de partido.",
  whyCard1Title: "Entrega a tiempo para cada partido",
  whyCard1Body:
    "Planeamos según el calendario de la selección para que tu camiseta llegue antes del pitazo inicial. El tiempo con los tuyos es sagrado.",
  whyCard2Title: "Empresa familiar, comunidad primero",
  whyCard2Body:
    "También somos inmigrantes. Sabemos lo que significa extrañar casa y llevar la Tricolor con orgullo.",
  whyCard3Title: "Transparencia radical, sin fantasmas de 'visto'",
  whyCard3Body:
    "Respuestas claras sobre stock, tiempos de entrega y tallas. Nunca te dejamos en visto cuando más lo necesitas.",

  productsTitle: "Elige tu camiseta para el próximo partido.",
  productsSubtitle:
    "Seleccionadas para hinchas colombianos en Canadá. Todos los precios en CAD. Pagos seguros con Stripe.",
  productsStockLabel: "Stock limitado para partidos clave",
  productsBuyButton: "Comprar con Stripe",

  emotionalTitle:
    "Un pedacito de Colombia cada vez que te pones la camiseta.",
  emotionalP1:
    "Nuestra misión es simple: cuando te pones la camiseta en Vancouver, Surrey, Burnaby o Coquitlam, deberías sentir la música, los cánticos y los sabores de casa. Cada pedido es un puente emocional de vuelta a Colombia.",
  emotionalP2:
    "Diseñamos nuestro servicio alrededor de la experiencia del inmigrante: poco tiempo, husos horarios distintos y la necesidad de planear con familia y amigos cada partido.",

  testimonialsTitle: "Lo que dicen los hinchas colombianos en Vancouver",
  testimonial1:
    "“La camiseta llegó justo antes del partido contra Brasil. Fue como tener a mi familia conmigo otra vez.”",
  testimonial1Name: "Juan · Surrey, BC",
  testimonial2:
    "“Me respondieron de una vez por WhatsApp, sin dejarme en visto. Todo claro desde el principio.”",
  testimonial2Name: "Laura · Burnaby, BC",
  testimonial3:
    "“Se nota que es una empresa familiar. Hablan como amigos, pero cumplen como empresa seria.”",
  testimonial3Name: "Andrés · Vancouver, BC",

  finalCtaTitle: "¿Listo para el próximo partido de Colombia?",
  finalCtaBody:
    "No esperes hasta el último minuto. Asegura tu camiseta ahora y disfruta el juego como se debe: con la Tricolor puesta y el corazón en casa.",
  finalCtaButton: "Ver camisetas ahora",

  footerContact: "Contacto",
  footerInstagram: "Instagram",
  footerLocation: "Vancouver · British Columbia",
};

// -----------------------------------------------------------------------------
// STRIPE CHECKOUT
// -----------------------------------------------------------------------------

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

if (!stripeSecretKey) {
  throw new Error("Falta STRIPE_SECRET_KEY en .env.local");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20",
});

async function handleCheckout(productId: string) {
  "use server";

  const product = productos.find((p) => p.id === productId);
  if (!product) {
    throw new Error("Producto no encontrado");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "cad",
          unit_amount: product.price * 100, // centavos
          product_data: {
            name: product.name,
            description: product.description,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/?canceled=1`,
  });

  if (!session.url) {
    throw new Error("No se pudo generar la URL de Checkout");
  }

  redirect(session.url);
}

// -----------------------------------------------------------------------------
// LOGO SVG
// -----------------------------------------------------------------------------

const LogoSVG = ({ className }: { className?: string }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="TFC logo"
  >
    <defs>
      {/* Smooth tri-colour gradient */}
      <linearGradient id="logo-gradient" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#facc15" />
        <stop offset="33%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>

      {/* soft shadow so white strokes read on any background */}
      <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity=".25" />
      </filter>
    </defs>

    {/* Gradient disc */}
    <circle cx="20" cy="20" r="18" fill="url(#logo-gradient)" />

    {/* Monogram: T F C */}
    <g
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      filter="url(#logo-shadow)"
      style={{ color: "white" }}
    >
      {/* T */}
      <path d="M11 12h6M14 12v8" />
      {/* F */}
      <path d="M20 12v8M20 12h5.5M20 16h4.5" />
      {/* C */}
      <path d="M30 16a6 6 0 1 0 0 8" />
    </g>
  </svg>
);

// -----------------------------------------------------------------------------
// PÁGINA
// -----------------------------------------------------------------------------

export default function Home({ searchParams }: PageProps) {
  const copy = t;
  const products = productos;

  return (
    <main className="min-h-screen bg-neutral-50 text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-neutral-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <LogoSVG />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900">
                Tricolor Fan Club
              </span>
              <span className="text-xs font-medium text-slate-500">
                Vancouver · British Columbia
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-4 text-sm font-medium text-slate-700 md:gap-6">
            <a href="#products" className="hover:text-red-600 transition-colors">
              {copy.navProducts}
            </a>
            <a href="#why-us" className="hover:text-red-600 transition-colors">
              {copy.navWhyUs}
            </a>
            <a href="#contact" className="hover:text-red-600 transition-colors">
              {copy.navContact}
            </a>

            <a
              href="#products"
              className="hidden rounded-full bg-gradient-to-r from-red-600 to-red-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm hover:from-red-700 hover:to-red-600 transition-all md:inline-block"
            >
              {copy.navShopNow}
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center md:py-20">
          {/* Copy */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-100 via-red-100 to-blue-100 px-4 py-1.5">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-700">
                {copy.metaStrip}
              </p>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              {copy.heroTitle}{" "}
              <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                {copy.heroTitleStrong}
              </span>
            </h1>

            <p className="max-w-xl text-base text-slate-600 md:text-lg">
              {copy.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:from-red-700 hover:to-red-600 hover:shadow-red-500/40"
              >
                {copy.heroCta}
              </a>

              <div className="flex items-center gap-3 text-xs text-slate-600">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-neutral-50 bg-gradient-to-br from-yellow-300 to-yellow-400" />
                  <div className="h-7 w-7 rounded-full border-2 border-neutral-50 bg-gradient-to-br from-red-400 to-red-500" />
                  <div className="h-7 w-7 rounded-full border-2 border-neutral-50 bg-gradient-to-br from-blue-400 to-blue-500" />
                </div>
                <span>{copy.heroTrusted}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span>{copy.heroPill1}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>{copy.heroPill2}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 to-yellow-50 p-1 shadow-xl md:max-w-md">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/images/hero-colombia-fan.png"
                  alt="Hincha colombiano feliz con la camiseta de la selección"
                  width={768}
                  height={1152}
                  className="h-auto w-full object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-gradient-to-r from-white/95 to-white/90 px-4 py-3 text-xs text-slate-800 shadow-lg backdrop-blur-sm">
                <p className="font-semibold">
                  "Se siente como estar otra vez en casa."
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Luis, Colombiano en Vancouver
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section
        id="why-us"
        className="border-b border-neutral-200 bg-white py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {copy.whyTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 md:text-base">
            {copy.whySubtitle}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                ✓
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                {copy.whyCard1Title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{copy.whyCard1Body}</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white">
                ♥
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                {copy.whyCard2Title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{copy.whyCard2Body}</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                💬
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                {copy.whyCard3Title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{copy.whyCard3Body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="border-b border-neutral-200 bg-neutral-50 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {copy.productsTitle}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
                {copy.productsSubtitle}
              </p>
            </div>
            <div className="rounded-full bg-gradient-to-r from-red-50 to-yellow-50 px-4 py-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                {copy.productsStockLabel}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <form
                key={product.id}
                action={async () => {
                  "use server";
                  await handleCheckout(product.id);
                }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-white to-white/95 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm backdrop-blur-sm">
                    {product.badge}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-bold text-slate-900">
                      {product.currency} {product.price}
                    </div>
                    <button
                      type="submit"
                      className="rounded-full bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:from-slate-800 hover:to-slate-700"
                    >
                      {copy.productsBuyButton}
                    </button>
                  </div>
                </div>
              </form>
            ))}
          </div>
        </div>
      </section>

      {/* EMOTIONAL SECTION */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-slate-900">
              <Image
                src="/images/watch-party.png"
                alt="Hinchas colombianos viendo un partido en Vancouver"
                width={800}
                height={600}
                className="h-auto w-full object-cover opacity-80"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-neutral-100">
                <p className="font-semibold">
                  "Cada gol se siente diferente cuando llevas puesta la Tricolor."
                </p>
                <p className="mt-1 text-[11px] text-neutral-300">
                  Reunión para ver partidos • Centro de Vancouver
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {copy.emotionalTitle}
            </h2>
            <p className="text-sm text-slate-600 md:text-base">
              {copy.emotionalP1}
            </p>
            <p className="text-sm text-slate-600 md:text-base">
              {copy.emotionalP2}
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {copy.testimonialsTitle}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-5 text-sm text-slate-700 shadow-sm">
              <p>{copy.testimonial1}</p>
              <p className="mt-3 text-xs font-semibold text-slate-500">
                {copy.testimonial1Name}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-5 text-sm text-slate-700 shadow-sm">
              <p>{copy.testimonial2}</p>
              <p className="mt-3 text-xs font-semibold text-slate-500">
                {copy.testimonial2Name}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-5 text-sm text-slate-700 shadow-sm">
              <p>{copy.testimonial3}</p>
              <p className="mt-3 text-xs font-semibold text-slate-500">
                {copy.testimonial3Name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center text-neutral-50">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {copy.finalCtaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-300 md:text-base">
            {copy.finalCtaBody}
          </p>
          <a
            href="#products"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:from-red-700 hover:to-red-600 hover:shadow-red-500/40"
          >
            {copy.finalCtaButton}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-neutral-200 bg-white py-6 text-xs text-slate-500"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-blue-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-700">
                Tricolor Fan Club
              </span>
              <span className="text-[11px] text-slate-400">
                {copy.footerLocation}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-neutral-100 px-3 py-1">
              {copy.footerContact}: info@tricolorfanclub.com
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1">
              {copy.footerInstagram}: @tricolorfanclub
            </span>
          </div>
          <span className="text-slate-400">
            © {new Date().getFullYear()} Tricolor Fan Club. Todos los derechos reservados.
          </span>
        </div>
      </footer>
    </main>
  );
}
