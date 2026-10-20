/**
 * Página de Detalle de Producto
 * Ruta: /detalle-de-producto?id=[productoId]
 * Muestra información completa con desglose de IVA
 */
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import BarraNavegacion from '@/components/BarraNavegacion';
import CarritoLateral from '@/components/carrito/CarritoLateral';
import DetalleProductoContenido from '@/app/detalle-de-producto/components/DetalleProductoContenido';

export const metadata: Metadata = {
  title: 'Detalle del Producto — PosMart',
  description: 'Información completa del producto con precios en MXN, IVA desglosado y opciones de compra.',
};

// Skeleton de carga para el detalle del producto
function SkeletonDetalle() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 animate-pulse">
      <div className="aspect-square rounded-2xl bg-muted" />
      <div className="flex flex-col gap-4">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-8 w-3/4 bg-muted rounded" />
        <div className="h-20 bg-muted rounded" />
        <div className="h-32 bg-muted rounded-xl" />
        <div className="h-12 bg-muted rounded-xl" />
      </div>
    </div>
  );
}

export default function PaginaDetalleProducto() {
  return (
    <div className="min-h-screen bg-background">
      <BarraNavegacion />
      <CarritoLateral />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8">
        <Suspense fallback={<SkeletonDetalle />}>
          <DetalleProductoContenido />
        </Suspense>
      </main>
    </div>
  );
}