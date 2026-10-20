/**
 * Página de Checkout / Simulación de Pago
 * Ruta: /checkout-simulacion-de-pago
 * Wizard de 3 pasos: Resumen → Datos → Pago → Confirmación
 */
import React from 'react';
import type { Metadata } from 'next';
import BarraNavegacion from '@/components/BarraNavegacion';
import CarritoLateral from '@/components/carrito/CarritoLateral';
import CheckoutContenido from '@/app/checkout-simulacion-de-pago/components/CheckoutContenido';

export const metadata: Metadata = {
  title: 'Checkout — PosMart',
  description: 'Completa tu compra de forma segura. Múltiples métodos de pago, factura CFDI opcional.',
};

export default function PaginaCheckout() {
  return (
    <div className="min-h-screen bg-background">
      <BarraNavegacion />
      <CarritoLateral />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8">
        <CheckoutContenido />
      </main>
    </div>
  );
}