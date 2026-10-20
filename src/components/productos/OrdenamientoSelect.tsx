/**
 * Select de ordenamiento del catálogo
 */
'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { OrdenCatalogo } from '@/tipos/producto';

interface OrdenamientoSelectProps {
  valor: OrdenCatalogo;
  onChange: (valor: OrdenCatalogo) => void;
}

const OPCIONES_ORDEN: { valor: OrdenCatalogo; etiqueta: string }[] = [
  { valor: 'relevancia', etiqueta: 'Relevancia' },
  { valor: 'nombre_asc', etiqueta: 'Nombre A–Z' },
  { valor: 'nombre_desc', etiqueta: 'Nombre Z–A' },
  { valor: 'precio_asc', etiqueta: 'Precio: menor a mayor' },
  { valor: 'precio_desc', etiqueta: 'Precio: mayor a menor' },
];

export default function OrdenamientoSelect({ valor, onChange }: OrdenamientoSelectProps) {
  return (
    <div className="relative flex items-center gap-2">
      <ArrowUpDown size={14} className="text-muted-foreground shrink-0" />
      <select
        value={valor}
        onChange={(e) => onChange(e.target.value as OrdenCatalogo)}
        className="input-base py-2 pl-2 pr-8 appearance-none cursor-pointer min-w-[180px]"
        aria-label="Ordenar productos"
      >
        {OPCIONES_ORDEN.map((op) => (
          <option key={`orden-${op.valor}`} value={op.valor}>
            {op.etiqueta}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
        </svg>
      </div>
    </div>
  );
}