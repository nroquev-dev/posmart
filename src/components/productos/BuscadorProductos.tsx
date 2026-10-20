/**
 * Buscador de productos con icono y limpieza
 * Usa debounce desde el hook useBusqueda
 */
'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface BuscadorProductosProps {
  valor: string;
  onChange: (valor: string) => void;
  placeholder?: string;
}

export default function BuscadorProductos({
  valor,
  onChange,
  placeholder = 'Buscar productos, SKU o categoría...',
}: BuscadorProductosProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <Search size={16} className="text-muted-foreground" />
      </div>
      <input
        type="search"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-base pl-10 pr-10"
        aria-label="Buscar productos"
      />
      {valor && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}