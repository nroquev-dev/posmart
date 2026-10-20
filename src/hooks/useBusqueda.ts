/**
 * Hook personalizado para búsqueda con debounce
 * Evita llamadas excesivas mientras el usuario escribe
 */
'use client';

import { useState, useEffect } from 'react';

export function useBusqueda(valorInicial: string = '', delay: number = 300) {
  const [busqueda, setBusqueda] = useState(valorInicial);
  const [busquedaDebounced, setBusquedaDebounced] = useState(valorInicial);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBusquedaDebounced(busqueda);
    }, delay);

    return () => clearTimeout(timer);
  }, [busqueda, delay]);

  return { busqueda, setBusqueda, busquedaDebounced };
}