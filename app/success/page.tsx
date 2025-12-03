// app/success/page.tsx
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-md border border-neutral-200 text-center">
        <h1 className="text-2xl font-bold mb-3 text-slate-900">
          ¡Pago recibido! 🎉
        </h1>

        <p className="text-sm text-slate-600 mb-4">
          Gracias por tu compra. Stripe ha confirmado tu pago y te enviará un
          correo con el recibo. Nosotros coordinaremos el envío de tu camiseta
          para que la tengas lista antes del próximo partido.
        </p>

        <p className="text-xs text-slate-400 mb-6">
          Si tienes alguna duda, escríbenos a{" "}
          <span className="font-medium">info@tricolorfanclub.com</span>.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          Volver a la tienda
        </Link>
      </div>
    </main>
  );
}
