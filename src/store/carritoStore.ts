/**
 * Store global del carrito usando Zustand
 * Persiste en localStorage automáticamente
 * Backend: reemplazar persistencia con llamadas a API /api/carrito
 */
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CarritoItem, Producto } from '@/tipos/producto';
import { IVA_MEXICO } from '@/datos/productos';

interface AccionesCarrito {
  agregarProducto: (producto: Producto) => void;
  quitarProducto: (productoId: string) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  vaciarCarrito: () => void;
  abrirCarrito: () => void;
  cerrarCarrito: () => void;
  toggleCarrito: () => void;
}

interface EstadoCarritoStore {
  items: CarritoItem[];
  abierto: boolean;
  totalItems: number;
  subtotalSinIva: number;
  ivaTotal: number;
  totalConIva: number;
}

/* Función para recalcular totales del carrito */
const calcularTotales = (items: CarritoItem[]) => {
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotalSinIva = items.reduce((acc, item) => acc + item.subtotal, 0);
  const ivaTotal = Math.round(subtotalSinIva * IVA_MEXICO * 100) / 100;
  const totalConIva = Math.round((subtotalSinIva + ivaTotal) * 100) / 100;
  return { totalItems, subtotalSinIva, ivaTotal, totalConIva };
};

/* Store de Zustand con persistencia en localStorage */
export const useCarritoStore = create<EstadoCarritoStore & AccionesCarrito>()(
  persist(
    (set, get) => ({
      /* Estado inicial */
      items: [],
      abierto: false,
      totalItems: 0,
      subtotalSinIva: 0,
      ivaTotal: 0,
      totalConIva: 0,

      /* Agregar producto al carrito */
      agregarProducto: (producto: Producto) => {
        const { items } = get();
        const itemExistente = items.find((i) => i.producto.id === producto.id);

        let nuevosItems: CarritoItem[];

        if (itemExistente) {
          /* Si ya existe, incrementar cantidad */
          nuevosItems = items.map((item) =>
            item.producto.id === producto.id
              ? {
                  ...item,
                  cantidad: item.cantidad + 1,
                  subtotal: Math.round((item.producto.precio * (item.cantidad + 1)) * 100) / 100,
                  subtotalConIva: Math.round((item.producto.precioConIva * (item.cantidad + 1)) * 100) / 100,
                }
              : item
          );
        } else {
          /* Si no existe, agregar nuevo item */
          const nuevoItem: CarritoItem = {
            producto,
            cantidad: 1,
            subtotal: Math.round(producto.precio * 100) / 100,
            subtotalConIva: Math.round(producto.precioConIva * 100) / 100,
          };
          nuevosItems = [...items, nuevoItem];
        }

        const totales = calcularTotales(nuevosItems);
        set({ items: nuevosItems, ...totales });
      },

      /* Quitar producto del carrito */
      quitarProducto: (productoId: string) => {
        let nuevosItems = get().items.filter((i) => i.producto.id !== productoId);
        const totales = calcularTotales(nuevosItems);
        set({ items: nuevosItems, ...totales });
      },

      /* Actualizar cantidad de un producto */
      actualizarCantidad: (productoId: string, cantidad: number) => {
        if (cantidad <= 0) {
          get().quitarProducto(productoId);
          return;
        }

        let nuevosItems = get().items.map((item) =>
          item.producto.id === productoId
            ? {
                ...item,
                cantidad,
                subtotal: Math.round((item.producto.precio * cantidad) * 100) / 100,
                subtotalConIva: Math.round((item.producto.precioConIva * cantidad) * 100) / 100,
              }
            : item
        );

        const totales = calcularTotales(nuevosItems);
        set({ items: nuevosItems, ...totales });
      },

      /* Vaciar carrito completo */
      vaciarCarrito: () => {
        set({
          items: [],
          totalItems: 0,
          subtotalSinIva: 0,
          ivaTotal: 0,
          totalConIva: 0,
        });
      },

      /* Control del drawer del carrito */
      abrirCarrito: () => set({ abierto: true }),
      cerrarCarrito: () => set({ abierto: false }),
      toggleCarrito: () => set((state) => ({ abierto: !state.abierto })),
    }),
    {
      name: 'posmart-carrito', /* Clave en localStorage */
      storage: createJSONStorage(() => localStorage),
      /* Solo persistir items, no el estado del drawer */
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        subtotalSinIva: state.subtotalSinIva,
        ivaTotal: state.ivaTotal,
        totalConIva: state.totalConIva,
      }),
    }
  )
);