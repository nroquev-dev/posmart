/**
 * Página principal — Catálogo de Productos
 * Ruta: / (entrada de la aplicación)
 * Server component que compone el layout
 */
import React from 'react';
import type { Metadata } from 'next';
import BarraNavegacion from '@/components/BarraNavegacion';
import CarritoLateral from '@/components/carrito/CarritoLateral';
import CatalogoContenido from '@/app/components/CatalogoContenido';

export const metadata: Metadata = {
  title: 'Catálogo de Productos — PosMart',
  description:
    'Explora nuestro catálogo completo de productos con precios en MXN e IVA incluido. Electrónica, ropa, alimentos, hogar y más.',
};

export default function PaginaCatalogo() {
  return (
    <div className="min-h-screen bg-background">
      <BarraNavegacion />
      <CarritoLateral />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8">
        <CatalogoContenido />
      </main>
    </div>
  );
}