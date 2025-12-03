// app/checkout/page.tsx
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      addressLine1: formData.get("addressLine1"),
      city: formData.get("city"),
      deliveryNotes: formData.get("deliveryNotes"),
    };

    try {
      const res = await fetch("/api/checkout-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Error al guardar el pedido");
      }

      setMessage("Pedido guardado correctamente.");
      form.reset();
    } catch (err) {
      console.error(err);
      setMessage("Hubo un problema al guardar el pedido.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-md border border-neutral-200">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Datos para el envío
          </h1>
          <p className="text-sm text-slate-600">
            Cuéntanos a dónde enviamos tu camiseta y cómo podemos contactarte.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Datos personales */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Datos personales
            </h2>

            <div className="space-y-1">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-800"
              >
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                placeholder="Ej. Luis Gabriel Niño"
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-800"
              >
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Ej. tu@correo.com"
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />
              <p className="text-xs text-slate-400">
                Usaremos este correo para enviarte la confirmación y el número
                de seguimiento.
              </p>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-800"
              >
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Ej. +1 604 123 4567"
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />
              <p className="text-xs text-slate-400">
                Solo lo usaremos si la empresa de envíos necesita contactarte.
              </p>
            </div>
          </section>

          {/* Dirección de envío */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Dirección de envío
            </h2>

            <div className="space-y-1">
              <label
                htmlFor="addressLine1"
                className="block text-sm font-medium text-slate-800"
              >
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                id="addressLine1"
                name="addressLine1"
                type="text"
                required
                autoComplete="address-line1"
                placeholder="Ej. 1234 Main St"
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-slate-800"
                >
                  Ciudad <span className="text-red-500">*</span>
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona una ciudad
                  </option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="Surrey">Surrey</option>
                  <option value="Burnaby">Burnaby</option>
                  <option value="Richmond">Richmond</option>
                  <option value="Coquitlam">Coquitlam</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="region"
                className="block text-sm font-medium text-slate-800"
              >
                Provincia / Estado
              </label>
              <span className="block text-sm text-slate-600">
                Solo disponible en British Columbia
              </span>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="deliveryNotes"
                className="block text-sm font-medium text-slate-800"
              >
                Notas para la entrega (opcional)
              </label>
              <textarea
                id="deliveryNotes"
                name="deliveryNotes"
                rows={3}
                placeholder="Ej. Dejar en portería, timbrar 201, horario preferido, etc."
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />
              <p className="text-xs text-slate-400">
                Estos detalles ayudan a que tu camiseta llegue sin problemas.
              </p>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-4"
            >
              Volver a la tienda
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Realizar el pedido"}
            </button>
          </div>

          {message && (
            <p className="mt-3 text-xs text-center text-slate-700">{message}</p>
          )}

          <p className="text-[11px] text-slate-400 text-right mt-2">
            Tus datos se usarán solo para procesar tu pedido.
          </p>
        </form>
      </div>
    </main>
  );
}
