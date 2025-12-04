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

// -----------------------------------------------------------------------------
// LOGO SVG
// -----------------------------------------------------------------------------

const LogoSVG = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="100"
    height="100"
    viewBox="0 0 2799.2642704075897 3182.0684004955865"
    className={className}
    aria-label="TFC logo"
  >
    <g transform="scale(9.103420024779329) translate(10, 10)">
      <defs id="SvgjsDefs18464">
        <linearGradient id="SvgjsLinearGradient18471">
          <stop id="SvgjsStop18472" stopColor="#000000ff" offset="0"></stop>
          <stop id="SvgjsStop18473" stopColor="#000000ff" offset="0.5"></stop>
          <stop id="SvgjsStop18474" stopColor="#000000ff" offset="1"></stop>
        </linearGradient>
        <linearGradient
          id="SvgjsLinearGradient18475"
          x1="0"
          y1="1"
          x2="1"
          y2="0.9999999999999999"
        >
          <stop id="SvgjsStop18476" stopColor="#000000ff" offset="0"></stop>
          <stop id="SvgjsStop18477" stopColor="#000000ff" offset="0.43"></stop>
          <stop id="SvgjsStop18478" stopColor="#000000ff" offset="0.44"></stop>
          <stop id="SvgjsStop18479" stopColor="#000000ff" offset="1"></stop>
        </linearGradient>
        <linearGradient
          id="SvgjsLinearGradient18480"
          x1="0"
          y1="1"
          x2="1"
          y2="0.9999999999999999"
        >
          <stop id="SvgjsStop18481" stopColor="#000000ff" offset="0"></stop>
          <stop id="SvgjsStop18482" stopColor="#000000ff" offset="0.43"></stop>
          <stop id="SvgjsStop18483" stopColor="#000000ff" offset="0.44"></stop>
          <stop id="SvgjsStop18484" stopColor="#000000ff" offset="1"></stop>
        </linearGradient>
      </defs>

      <g
        id="SvgjsG18465"
        featureKey="4yrtKO-0"
        transform="matrix(2.6862474064972255,0,0,2.6862474064972255,12.00449901054732,-33.593824626697284)"
        fill="url(#SvgjsLinearGradient18471)"
      >
        <path d="M80.438,42.862c-0.014-0.064-1.459-6.446-2.966-12.724c-1.777-7.404-7.191-10.405-11.421-11.619  c-4.918-1.412-8.694-5.793-8.731-5.837c-0.136-0.159-0.356-0.217-0.554-0.145c-0.016,0.006-0.023,0.022-0.038,0.029l-0.005-0.011  c-5.142,2.464-10.358,2.464-15.502,0l-0.005,0.011c-0.015-0.007-0.022-0.024-0.038-0.029c-0.195-0.073-0.417-0.015-0.553,0.146  c-0.038,0.044-3.805,4.423-8.732,5.837c-4.229,1.214-9.643,4.215-11.42,11.619c-1.507,6.277-2.951,12.66-2.966,12.724  c-0.03,0.134-0.004,0.275,0.073,0.389c0.077,0.114,0.197,0.191,0.333,0.214l11.993,2.013c0.259,0.041,0.505-0.12,0.568-0.373  l1.55-6.269c0.464,1.131,1.043,3.155,1.043,6.206c0,5.265-0.636,33.612-0.643,33.897c-0.004,0.2,0.11,0.383,0.292,0.466  c2.169,0.997,5.857,1.528,9.174,1.812l0.018,0.003c0.024,0.004,0.049,0.006,0.074,0.006c0.001,0,0.002,0,0.003,0  c1.777,0.15,3.441,0.229,4.701,0.271c0,0,0.001,0,0.001,0l0.014,0c1.224,0.04,2.065,0.045,2.25,0.046c0.003,0,0.006,0,0.009,0h0.004  h0.01h0.01h0.005c0.164,0,1.003-0.005,2.234-0.045l0.038-0.001c0.001,0,0.002-0.001,0.003-0.001c3.63-0.12,10.614-0.549,13.968-2.09  c0.181-0.083,0.295-0.266,0.291-0.466c-0.007-0.285-0.643-28.633-0.643-33.897c0-3.052,0.579-5.076,1.043-6.207l1.55,6.27  c0.062,0.253,0.304,0.413,0.568,0.373l11.994-2.013c0.136-0.023,0.256-0.101,0.332-0.214C80.443,43.137,80.469,42.996,80.438,42.862  z M76.5,30.372c0.914,3.805,1.802,7.642,2.365,10.091l-0.673,0.116l-2.257-9.221c-1.292-5.674-4.607-9.47-9.589-10.977  c-3.978-1.204-6.41-3.227-7.929-4.718c0.036-0.127,0.087-0.249,0.114-0.38c1.65,1.454,4.209,3.327,7.246,4.198  C69.75,20.621,74.836,23.437,76.5,30.372z M56.37,13.81c-0.688,4.027-6.376,6.265-7.397,6.635c-1.02-0.371-6.709-2.608-7.397-6.635  c2.456,1.061,4.927,1.598,7.397,1.598C51.443,15.408,53.913,14.871,56.37,13.81z M48.817,21.45c0.102,0.033,0.21,0.033,0.312,0  c0.315-0.104,7.229-2.425,8.199-7.296c0.084,0.085,0.195,0.189,0.291,0.284c-0.227,4.442-7.481,7.215-8.646,7.631  c-1.165-0.415-8.419-3.188-8.646-7.63c0.097-0.095,0.208-0.199,0.292-0.284C41.588,19.025,48.501,21.347,48.817,21.45z   M21.445,30.372c1.665-6.935,6.75-9.75,10.724-10.891c3.036-0.871,5.596-2.744,7.246-4.198c0.022,0.109,0.066,0.211,0.095,0.318  c-1.514,1.496-3.962,3.56-7.993,4.779c-4.981,1.507-8.296,5.303-9.587,10.969l-2.259,9.229l-0.594-0.103  C19.64,38.027,20.53,34.184,21.445,30.372z M18.6,42.567c0.062-0.273,0.149-0.656,0.254-1.115l11.021,1.906l-0.262,1.057  L18.6,42.567z M66.555,37.273c-0.079-1.345-0.593-11.422,1.606-14.345l-2.471-0.993c0,0-1.844,4.031-1.844,19.339  c0,12.105,0,34.01,0,37.599c-0.844,0.285-1.832,0.522-2.895,0.718V20.067c0-0.164-0.081-0.318-0.216-0.411l-1.864-1.289  c-0.111-0.078-0.247-0.105-0.38-0.08c-0.132,0.025-0.248,0.104-0.322,0.216c-0.582,0.884-1.374,1.621-2.494,2.317  c-0.146,0.091-0.235,0.251-0.235,0.424v59.023c-1.357,0.106-2.634,0.171-3.69,0.211V23.665c0-0.167-0.083-0.322-0.222-0.415  c-0.138-0.093-0.315-0.111-0.468-0.048l-2.088,0.855l-2.087-0.855c-0.155-0.064-0.33-0.046-0.468,0.048  c-0.138,0.093-0.221,0.248-0.221,0.415v56.814c-1.063-0.04-2.349-0.106-3.715-0.212V21.245c0-0.173-0.089-0.333-0.236-0.424  c-1.121-0.698-1.913-1.434-2.494-2.317c-0.074-0.112-0.19-0.19-0.322-0.216c-0.132-0.026-0.269,0.002-0.38,0.08l-1.865,1.289  c-0.135,0.093-0.216,0.247-0.216,0.411v59.519c-1.064-0.197-2.052-0.435-2.895-0.721c0-3.615,0-25.495,0-37.591  c0-15.308-1.844-19.339-1.844-19.339l-2.471,0.993c2.248,2.987,1.662,13.445,1.602,14.417l-1.246,5.039l-9.456-1.635l2.244-9.17  c1.208-5.303,4.287-8.845,8.904-10.242c3.971-1.202,6.477-3.178,8.086-4.716c2.003,4.119,8.593,6.344,8.922,6.452  c0.05,0.017,0.103,0.025,0.156,0.025s0.105-0.008,0.156-0.025c0.328-0.108,6.862-2.314,8.896-6.399  c1.612,1.53,4.107,3.476,8.032,4.663c4.617,1.397,7.695,4.938,8.905,10.25l2.243,9.162l-9.379,1.622l-1.252-5.066  C66.57,37.293,66.559,37.285,66.555,37.273z M68.331,44.415l-0.265-1.071l11.023-1.906c0.107,0.465,0.195,0.853,0.258,1.129  L68.331,44.415z"></path>
      </g>

      <g
        id="SvgjsG18466"
        featureKey="nameFeature-0"
        transform="matrix(2.094230008851188,0,0,2.094230008851188,-0.8376922032618124,192.51838607153832)"
        fill="url(#SvgjsLinearGradient18475)"
      >
        <path d="M4.84 8.6 l4.78 0 l0 -1.9 l-8.5 0 l0 0.62 l7.82 0 l0 0.72 l-8.54 0 l0 -2.06 l9.94 0 l0 3.34 l-4.78 0 l0 9.36 l-0.72 0 l0 -10.08 z M3.5 9.32 l-3.1 0 l0 -0.72 l3.82 0 l0 10.66 l2 0 l0 -9.32 l0.72 0 l0 10.06 l-3.44 0 l0 -10.68 z M22.06 19.28 l-2.3 0 l-2.76 -5.14 l-1.86 0.02 l0 5.12 l-2.02 0 l0 -13.28 l-0.72 0 l0 14 l3.48 0 l0 -5.14 l0.7 0 l2.74 5.14 l3.94 0 l-2.76 -5.16 l-0.66 0.26 z M17.3 6.72 c2.9 0 4.54 1.3 4.54 3.68 c0 2.16 -1.3 3.48 -3.56 3.72 l-0.54 0.06 l2.5 4.62 l0.82 0 l-2.18 -4.06 c2.4 -0.42 3.68 -1.88 3.68 -4.34 c0 -0.82 -0.18 -1.56 -0.52 -2.22 c-0.8 -1.42 -2.44 -2.18 -4.74 -2.18 l-3.54 0 l0 12.78 l0.72 0 l0 -12.06 l2.82 0 z M17.14 13.52 c2.74 0 4.04 -0.94 4.04 -3.02 c0 -1.98 -1.36 -3.1 -3.54 -3.1 l-2.52 0 l0 2.1 l2.3 0 c1.06 0 1.6 0.3 1.6 0.9 c0 0.7 -0.66 1.04 -2 1.04 l-1.16 0 l0 -1.24 l-0.74 0 l0 1.96 l1.9 0 c1.78 0 2.72 -0.62 2.72 -1.76 c0 -0.36 -0.08 -0.64 -0.26 -0.86 c-0.34 -0.5 -1.02 -0.74 -2.06 -0.74 l-1.56 0 l0 -0.68 l1.78 0 c1.78 0 2.82 0.86 2.82 2.38 c0 1.58 -1.06 2.32 -3.32 2.32 l-2 0 l0 0.7 l2 0 z M24.98 6 l2.1 0 l0 12.66 l-0.72 0 l0 -11.94 l-0.66 0 l0 12.56 l2.02 0 l0 -13.28 l0.72 0 l0 14 l-3.46 0 l0 -14 z M39.68 15.44 c-1.26 0.82 -1.88 1.06 -2.74 1.06 c-0.6 0 -1.16 -0.16 -1.7 -0.48 c-1.06 -0.64 -1.78 -1.8 -1.78 -3 c0 -0.64 0.16 -1.24 0.48 -1.78 c0.62 -1.08 1.8 -1.72 3 -1.72 c0.76 0 1.44 0.22 2.02 0.64 c0.1 0.06 0.22 0.14 0.36 0.28 l0.3 0.22 l1.34 -1.58 l-0.22 -0.22 c-0.14 -0.14 -0.32 -0.26 -0.54 -0.4 c-0.94 -0.72 -2.04 -1.08 -3.26 -1.08 c-1.5 0 -2.88 0.58 -3.98 1.64 c-1.06 1.12 -1.66 2.5 -1.66 4 s0.6 2.92 1.66 3.98 s2.48 1.66 3.98 1.66 c1.08 0 2.08 -0.3 3.02 -0.9 l-0.4 -0.6 c-0.82 0.54 -1.68 0.8 -2.62 0.8 c-1.3 0 -2.54 -0.52 -3.48 -1.46 s-1.44 -2.18 -1.44 -3.48 s0.5 -2.52 1.44 -3.46 c0.94 -0.96 2.18 -1.46 3.48 -1.46 c0.98 0 1.92 0.3 2.86 0.92 l0.16 0.14 l-0.44 0.5 c-0.06 -0.02 -0.1 -0.04 -0.14 -0.08 c-0.74 -0.5 -1.56 -0.76 -2.44 -0.76 c-0.78 0 -1.48 0.18 -2.1 0.54 c-1.26 0.74 -2.1 2.2 -2.1 3.66 c0 0.7 0.2 1.4 0.58 2.06 c0.78 1.34 2.2 2.16 3.62 2.16 c0.94 0 1.7 -0.28 2.84 -1 l1.12 1.66 c-1.46 0.96 -2.6 1.36 -3.96 1.36 c-1.12 0 -2.16 -0.28 -3.12 -0.84 c-1.94 -1.12 -3.14 -3.16 -3.14 -5.4 c0 -1.12 0.28 -2.16 0.84 -3.14 c1.12 -1.92 3.18 -3.12 5.42 -3.12 c1.58 0 3.08 0.58 4.22 1.64 l0.12 0.1 l0.16 0.16 l0.5 -0.52 l-0.28 -0.28 c-1.28 -1.14 -2.96 -1.8 -4.72 -1.8 c-1.26 0 -2.42 0.3 -3.48 0.92 c-2.12 1.22 -3.5 3.56 -3.5 6.04 c0 1.22 0.32 2.38 0.96 3.46 c1.26 2.16 3.52 3.52 6.02 3.52 c1.58 0 2.9 -0.5 4.68 -1.72 l0.28 -0.18 l-1.9 -2.86 z M49.06 20 c-1.22 0 -2.38 -0.32 -3.48 -0.96 c-2.2 -1.26 -3.56 -3.58 -3.56 -6.06 c0 -1.24 0.32 -2.4 0.96 -3.5 c1.26 -2.16 3.62 -3.52 6.08 -3.52 c1.22 0 2.4 0.32 3.5 0.94 c2.2 1.28 3.52 3.66 3.52 6.08 c0 1.22 -0.32 2.36 -0.94 3.46 c-1.28 2.2 -3.6 3.56 -6.08 3.56 z M49.06 6.66 c-1.14 0 -2.2 0.28 -3.16 0.84 c-1.94 1.12 -3.14 3.18 -3.14 5.48 c0 1.14 0.28 2.2 0.84 3.16 c1.12 1.94 3.16 3.14 5.46 3.14 c1.14 0 2.2 -0.28 3.18 -0.84 c1.94 -1.12 3.14 -3.16 3.14 -5.46 c0 -1.14 -0.28 -2.2 -0.84 -3.18 c-1.12 -1.94 -3.24 -3.14 -5.48 -3.14 z M49.06 18.64 c-1 0 -1.94 -0.26 -2.84 -0.76 c-1.78 -1.02 -2.88 -2.88 -2.88 -4.9 c0 -1.02 0.26 -1.96 0.76 -2.84 c1.02 -1.76 2.82 -2.8 4.96 -2.8 c1.08 0 2.06 0.24 2.92 0.72 c1.72 0.96 2.72 2.76 2.72 4.92 c0 1.02 -0.24 1.96 -0.72 2.82 c-0.98 1.74 -2.9 2.84 -4.92 2.84 z M49.06 8.04 c-0.9 0 -1.72 0.22 -2.48 0.66 c-1.54 0.88 -2.48 2.46 -2.48 4.28 c0 0.88 0.22 1.7 0.68 2.46 c0.88 1.54 2.44 2.5 4.28 2.5 c0.9 0 1.72 -0.22 2.48 -0.68 c1.5 -0.88 2.46 -2.52 2.46 -4.28 c0 -0.9 -0.22 -1.74 -0.66 -2.5 c-0.88 -1.52 -2.54 -2.44 -4.28 -2.44 z M49.06 17.34 c-0.78 0 -1.52 -0.2 -2.18 -0.58 c-1.34 -0.78 -2.2 -2.26 -2.2 -3.78 c0 -0.78 0.2 -1.52 0.6 -2.2 c0.78 -1.36 2.16 -2.14 3.78 -2.14 c0.78 0 1.5 0.2 2.16 0.58 c1.34 0.78 2.12 2.14 2.12 3.76 c0 0.8 -0.18 1.52 -0.54 2.18 c-0.74 1.32 -2.16 2.18 -3.74 2.18 z M49.06 9.36 c-0.64 0 -1.24 0.16 -1.8 0.48 c-1.12 0.66 -1.84 1.84 -1.84 3.14 c0 0.64 0.16 1.24 0.48 1.78 c0.64 1.12 1.8 1.8 3.16 1.8 c0.66 0 1.28 -0.16 1.82 -0.48 c1.1 -0.64 1.76 -1.82 1.76 -3.1 c0 -0.66 -0.16 -1.26 -0.48 -1.82 c-0.64 -1.12 -1.82 -1.8 -3.1 -1.8 z M57.14 5.98 l2.06 0 l0 12.7 l-0.74 0 l0 -11.98 l-0.6 0 l0 12.58 l6.58 0 l0 -1.92 l-3.26 0 l0 -0.72 l3.98 0 l0 3.36 l-8.02 0 l0 -14.02 z M59.86 5.98 l0.72 0 l0 11.96 l3.22 0 l0 0.74 l-3.94 0 l0 -12.7 z M73.4 20 c-1.22 0 -2.38 -0.32 -3.48 -0.96 c-2.2 -1.26 -3.56 -3.58 -3.56 -6.06 c0 -1.24 0.32 -2.4 0.96 -3.5 c1.26 -2.16 3.62 -3.52 6.08 -3.52 c1.22 0 2.4 0.32 3.5 0.94 c2.2 1.28 3.52 3.66 3.52 6.08 c0 1.22 -0.32 2.36 -0.94 3.46 c-1.28 2.2 -3.6 3.56 -6.08 3.56 z M73.4 6.66 c-1.14 0 -2.2 0.28 -3.16 0.84 c-1.94 1.12 -3.14 3.18 -3.14 5.48 c0 1.14 0.28 2.2 0.84 3.16 c1.12 1.94 3.16 3.14 5.46 3.14 c1.14 0 2.2 -0.28 3.18 -0.84 c1.94 -1.12 3.14 -3.16 3.14 -5.46 c0 -1.14 -0.28 -2.2 -0.84 -3.18 c-1.12 -1.94 -3.24 -3.14 -5.48 -3.14 z M73.4 18.64 c-1 0 -1.94 -0.26 -2.84 -0.76 c-1.78 -1.02 -2.88 -2.88 -2.88 -4.9 c0 -1.02 0.26 -1.96 0.76 -2.84 c1.02 -1.76 2.82 -2.8 4.96 -2.8 c1.08 0 2.06 0.24 2.92 0.72 c1.72 0.96 2.72 2.76 2.72 4.92 c0 1.02 -0.24 1.96 -0.72 2.82 c-0.98 1.74 -2.9 2.84 -4.92 2.84 z M73.4 8.04 c-0.9 0 -1.72 0.22 -2.48 0.66 c-1.54 0.88 -2.48 2.46 -2.48 4.28 c0 0.88 0.22 1.7 0.68 2.46 c0.88 1.54 2.44 2.5 4.28 2.5 c0.9 0 1.72 -0.22 2.48 -0.68 c1.5 -0.88 2.46 -2.52 2.46 -4.28 c0 -0.9 -0.22 -1.74 -0.66 -2.5 c-0.88 -1.52 -2.54 -2.44 -4.28 -2.44 z M73.4 17.34 c-0.78 0 -1.52 -0.2 -2.18 -0.58 c-1.34 -0.78 -2.2 -2.26 -2.2 -3.78 c0 -0.78 0.2 -1.52 0.6 -2.2 c0.78 -1.36 2.16 -2.14 3.78 -2.14 c0.78 0 1.5 0.2 2.16 0.58 c1.34 0.78 2.12 2.14 2.12 3.76 c0 0.8 -0.18 1.52 -0.54 2.18 c-0.74 1.32 -2.16 2.18 -3.74 2.18 z M73.4 9.36 c-0.64 0 -1.24 0.16 -1.8 0.48 c-1.12 0.66 -1.84 1.84 -1.84 3.14 c0 0.64 0.16 1.24 0.48 1.78 c0.64 1.12 1.8 1.8 3.16 1.8 c0.66 0 1.28 -0.16 1.82 -0.48 c1.1 -0.64 1.76 -1.82 1.76 -3.1 c0 -0.66 -0.16 -1.26 -0.48 -1.82 c-0.64 -1.12 -1.82 -1.8 -3.1 -1.8 z M91.08 19.28 l-2.3 0 l-2.76 -5.14 l-1.86 0.02 l0 5.12 l-2.02 0 l0 -13.28 l-0.72 0 l0 14 l3.48 0 l0 -5.14 l0.7 0 l2.74 5.14 l3.94 0 l-2.76 -5.16 l-0.66 0.26 z M86.32 6.72 c2.9 0 4.54 1.3 4.54 3.68 c0 2.16 -1.3 3.48 -3.56 3.72 l-0.54 0.06 l2.5 4.62 l0.82 0 l-2.18 -4.06 c2.4 -0.42 3.68 -1.88 3.68 -4.34 c0 -0.82 -0.18 -1.56 -0.52 -2.22 c-0.8 -1.42 -2.44 -2.18 -4.74 -2.18 l-3.54 0 l0 12.78 l0.72 0 l0 -12.06 l2.82 0 z M86.16 13.52 c2.74 0 4.04 -0.94 4.04 -3.02 c0 -1.98 -1.36 -3.1 -3.54 -3.1 l-2.52 0 l0 2.1 l2.3 0 c1.06 0 1.6 0.3 1.6 0.9 c0 0.7 -0.66 1.04 -2 1.04 l-1.16 0 l0 -1.24 l-0.74 0 l0 1.96 l1.9 0 c1.78 0 2.72 -0.62 2.72 -1.76 c0 -0.36 -0.08 -0.64 -0.26 -0.86 c-0.34 -0.5 -1.02 -0.74 -2.06 -0.74 l-1.56 0 l0 -0.68 l1.78 0 c1.78 0 2.82 0.86 2.82 2.38 c0 1.58 -1.06 2.32 -3.32 2.32 l-2 0 l0 0.7 l2 0 z M101.08 6 l0.72 0 l0 13.28 l1.96 0 l0 -5 l4.68 0 l0 -0.66 l-4.66 0 l0 -0.72 l5.38 0 l0 2.1 l-4.68 0 l0 5 l-3.4 0 l0 -14 z M102.42 6 l7.72 0 l0 3.4 l-5 0 l0 -0.72 l4.28 0 l0 -1.96 l-6.3 0 l0 12 l-0.7 0 l0 -12.72 z M103.76 7.3 l5.04 0 l0 0.72 l-4.32 0 l0 3.54 l4.68 0 l0 0.74 l-5.4 0 l0 -5 z M113.22 18.76 l0.88 0 l0.7 -1.68 l5.22 0.02 l1.28 2.9 l3.68 -0.02 l-6.3 -13.98 l-1.28 0 l-6.26 13.98 l3.9 0 l0.68 -1.6 l3.98 0 l-0.3 -0.68 l-4.12 0 l-0.64 1.58 l-2.38 0 l5.54 -12.6 l0.48 0 l5.56 12.6 l-2.12 0 l-1.28 -2.86 l-6.2 0 z M115.6 15.24 l2.44 -5.82 l4.1 9.32 l0.82 0 l-4.92 -10.96 l-3.6 8.08 l5.8 0 l-2.2 -4.86 l-1.52 3.66 l0.78 0 l0.74 -1.82 l1.1 2.4 l-3.54 0 z M135.58 14.3 l-8.18 -8.3 l-1 0 l9.9 10.06 l0 -8.66 l-0.72 0 l0 6.9 z M134.92 12.7 l0 -6 l2.04 0 l0 12.58 l-0.34 0 l-0.08 -0.08 l-9.16 -9.28 l0 10.08 l2.1 0 l0 -5.9 l-0.74 -0.76 l0 5.94 l-0.64 0 l0 -7.6 l8.3 8.32 l1.28 0 l0 -14 l-3.48 0 l0 5.92 z M126.72 20 l0 -11.7 l9.58 9.72 l0 -1.06 l-10.28 -10.38 l0 13.42 l0.7 0 z"></path>
      </g>

      <g
        id="SvgjsG18467"
        featureKey="nameFeature-1"
        transform="matrix(6.073000544965662,0,0,6.073000544965662,0.3643825810303828,207.68345662527204)"
        fill="url(#SvgjsLinearGradient18480)"
      >
        <path d="M9.66 15.44 c-1.26 0.82 -1.88 1.06 -2.74 1.06 c-0.6 0 -1.16 -0.16 -1.7 -0.48 c-1.06 -0.64 -1.78 -1.8 -1.78 -3 c0 -0.64 0.16 -1.24 0.48 -1.78 c0.62 -1.08 1.8 -1.72 3 -1.72 c0.76 0 1.44 0.22 2.02 0.64 c0.1 0.06 0.22 0.14 0.36 0.28 l0.3 0.22 l1.34 -1.58 l-0.22 -0.22 c-0.14 -0.14 -0.32 -0.26 -0.54 -0.4 c-0.94 -0.72 -2.04 -1.08 -3.26 -1.08 c-1.5 0 -2.88 0.58 -3.98 1.64 c-1.06 1.12 -1.66 2.5 -1.66 4 s0.6 2.92 1.66 3.98 s2.48 1.66 3.98 1.66 c1.08 0 2.08 -0.3 3.02 -0.9 l-0.4 -0.6 c-0.82 0.54 -1.68 0.8 -2.62 0.8 c-1.3 0 -2.54 -0.52 -3.48 -1.46 s-1.44 -2.18 -1.44 -3.48 s0.5 -2.52 1.44 -3.46 c0.94 -0.96 2.18 -1.46 3.48 -1.46 c0.98 0 1.92 0.3 2.86 0.92 l0.16 0.14 l-0.44 0.5 c-0.06 -0.02 -0.1 -0.04 -0.14 -0.08 c-0.74 -0.5 -1.56 -0.76 -2.44 -0.76 c-0.78 0 -1.48 0.18 -2.1 0.54 c-1.26 0.74 -2.1 2.2 -2.1 3.66 c0 0.7 0.2 1.4 0.58 2.06 c0.78 1.34 2.2 2.16 3.62 2.16 c0.94 0 1.7 -0.28 2.84 -1 l1.12 1.66 c-1.46 0.96 -2.6 1.36 -3.96 1.36 c-1.12 0 -2.16 -0.28 -3.12 -0.84 c-1.94 -1.12 -3.14 -3.16 -3.14 -5.4 c0 -1.12 0.28 -2.16 0.84 -3.14 c1.12 -1.92 3.18 -3.12 5.42 -3.12 c1.58 0 3.08 0.58 4.22 1.64 l0.12 0.1 l0.16 0.16 l0.5 -0.52 l-0.28 -0.28 c-1.28 -1.14 -2.96 -1.8 -4.72 -1.8 c-1.26 0 -2.42 0.3 -3.48 0.92 c-2.12 1.22 -3.5 3.56 -3.5 6.04 c0 1.22 0.32 2.38 0.96 3.46 c1.26 2.16 3.52 3.52 6.02 3.52 c1.58 0 2.9 -0.5 4.68 -1.72 l0.28 -0.18 l-1.9 -2.86 z M12.82 5.98 l2.06 0 l0 12.7 l-0.74 0 l0 -11.98 l-0.6 0 l0 12.58 l6.58 0 l0 -1.92 l-3.26 0 l0 -0.72 l3.98 0 l0 3.36 l-8.02 0 l0 -14.02 z M15.54 5.98 l0.72 0 l0 11.96 l3.22 0 l0 0.74 l-3.94 0 l0 -12.7 z M29.3 20 c-1.94 0 -3.42 -0.5 -4.4 -1.5 c-0.96 -0.96 -1.46 -2.38 -1.46 -4.06 l0 -8.42 l3.4 0 l0 8.42 c0 1.52 0.74 2.16 2.36 2.16 c1.58 0 2.44 -0.78 2.44 -2.16 l0 -8.42 l2.06 0 l0 8.42 c0 1.06 -0.28 2.06 -0.82 2.78 c-0.72 0.98 -1.86 1.44 -3.62 1.44 c-1.02 0 -1.84 -0.14 -2.46 -0.44 c-1.26 -0.58 -2.02 -1.88 -2.02 -3.78 l0 -7.14 l0.72 0 l0 7.14 c0 2.26 1.3 3.5 3.76 3.5 s3.72 -1.24 3.72 -3.5 l0 -7.7 l-0.62 0 l0 7.7 c0 1.76 -1.18 2.88 -3.16 2.88 c-2 0 -3.06 -1.02 -3.06 -2.88 l0 -7.7 l-1.98 0 l0 7.7 c0 3.18 1.76 4.84 5.14 4.84 c1.76 0 2.96 -0.42 3.78 -1.28 s1.26 -2.1 1.26 -3.56 l0 -8.42 l0.72 0 l0 8.42 c0 1.68 -0.52 3.08 -1.48 4.06 c-0.96 1 -2.38 1.5 -4.28 1.5 z M46.48 13.06 c0.46 -0.7 0.7 -1.58 0.7 -2.6 c0 -2.78 -1.64 -4.36 -4.46 -4.36 l-4.62 0 l0 6.02 l4.7 0 c1.06 0 1.7 -0.6 1.7 -1.66 c0 -0.56 -0.2 -1.02 -0.6 -1.4 c-0.26 -0.24 -0.7 -0.38 -1.1 -0.38 l-3.34 0 l0 2.1 l0.72 0 l0 -1.4 l2.62 0 c0.58 0 0.98 0.38 0.98 1.08 c0 0.62 -0.32 0.94 -0.98 0.94 l-4 0 l0 -4.58 l3.82 0 c2.48 0 3.86 1.26 3.86 3.64 c0 0.78 -0.16 1.46 -0.5 2.08 l-0.2 0.32 l-0.22 0.22 l0.26 0.26 l0.38 0.44 c0.24 0.3 0.36 0.92 0.36 1.88 c0 2.34 -1.4 3.6 -3.94 3.6 l-5.16 0 l0 -13.18 l-0.72 0 l0 13.9 l5.88 0 c2.9 0 4.66 -1.6 4.66 -4.32 c0 -1.04 -0.26 -1.9 -0.8 -2.6 z M43.1 18.68 c0.7 0 1.36 -0.26 1.98 -0.8 c0.58 -0.58 0.88 -1.28 0.88 -2.08 c0 -1 -0.32 -1.78 -0.98 -2.36 l-0.52 -0.38 c0.9 -0.5 1.44 -1.46 1.44 -2.72 c0 -0.54 -0.12 -1.06 -0.36 -1.52 c-0.48 -0.92 -1.34 -1.42 -2.44 -1.42 l-3.62 0 l0 0.72 l3.62 0 c0.34 0 0.66 0.1 1 0.3 c0.64 0.4 1.06 1.12 1.06 1.92 c0 1.38 -0.84 2.36 -2.12 2.36 l-4.92 0 l0 0.72 l4.92 0 c1.34 0 2.2 0.92 2.2 2.38 c0 0.8 -0.34 1.42 -1.04 1.84 c-0.34 0.2 -0.7 0.3 -1.1 0.3 l-4.3 0 l0 -3.16 l4 0 c0.7 0 1.04 0.32 1.04 0.94 c0 0.64 -0.34 0.96 -1.04 0.96 l-2.62 0 l0 -1.32 l-0.72 0 l0 2.04 l3.34 0 c0.78 0 1.3 -0.28 1.58 -0.86 c0.12 -0.22 0.18 -0.5 0.18 -0.82 c0 -1.04 -0.7 -1.68 -1.76 -1.68 l-4.7 0 l0 4.64 l5 0 z"></path>
      </g>
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
