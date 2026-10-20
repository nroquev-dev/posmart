/**
 * Chips de filtro por categoría
 * Actualiza el filtro activo al hacer clic
 */
'use client';

import React from 'react';
import { Tag } from 'lucide-react';

interface FiltroCategoriaProps {
  categorias: string[];
  categoriaActiva: string;
  onCambiarCategoria: (categoria: string) => void;
}

export default function FiltroCategorias({
  categorias,
  categoriaActiva,
  onCambiarCategoria,
}: FiltroCategoriaProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-muted-foreground mr-1 shrink-0">
        <Tag size={14} />
        <span className="text-xs font-medium uppercase tracking-wide">Categorías</span>
      </div>
      {categorias.map((cat) => (
        <button
          key={`cat-chip-${cat}`}
          onClick={() => onCambiarCategoria(cat)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 whitespace-nowrap ${
            categoriaActiva === cat
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}