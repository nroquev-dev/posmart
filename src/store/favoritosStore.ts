/**
 * Store de favoritos usando Zustand con persistencia localStorage
 * Backend: reemplazar con API /api/favoritos cuando haya autenticación
 */
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface EstadoFavoritos {
  favoritos: string[]; /* IDs de productos favoritos */
}

interface AccionesFavoritos {
  toggleFavorito: (productoId: string) => void;
  esFavorito: (productoId: string) => boolean;
  limpiarFavoritos: () => void;
}

export const useFavoritosStore = create<EstadoFavoritos & AccionesFavoritos>()(
  persist(
    (set, get) => ({
      favoritos: [],

      toggleFavorito: (productoId: string) => {
        const { favoritos } = get();
        const estaEnFavoritos = favoritos.includes(productoId);
        set({
          favoritos: estaEnFavoritos
            ? favoritos.filter((id) => id !== productoId)
            : [...favoritos, productoId],
        });
      },

      esFavorito: (productoId: string) => get().favoritos.includes(productoId),

      limpiarFavoritos: () => set({ favoritos: [] }),
    }),
    {
      name: 'posmart-favoritos',
      storage: createJSONStorage(() => localStorage),
    }
  )
);