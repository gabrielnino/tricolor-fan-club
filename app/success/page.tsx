"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/checkout");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-md border border-neutral-200 text-center">
        <h1 className="text-2xl font-bold mb-3 text-slate-900">
          ¡Pago recibido! 🎉
        </h1>

        <p className="text-sm text-slate-600 mb-4">
          Serás redirigido automáticamente…
        </p>

        <Link
          href="/checkout"
          className="text-xs text-slate-500 underline"
        >
          Ir ahora
        </Link>
      </div>
    </main>
  );
}
