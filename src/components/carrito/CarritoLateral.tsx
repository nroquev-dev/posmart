/**
 * Drawer lateral del carrito de compras
 * Se desliza desde la derecha con animación suave
 * Muestra items, cantidades, subtotales, IVA y total en MXN
 */
'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { useCarritoStore } from '@/store/carritoStore';
import { formatearMXN } from '@/utils/formato';

export default function CarritoLateral() {
  const {
    items,
    abierto,
    cerrarCarrito,
    quitarProducto,
    actualizarCantidad,
    vaciarCarrito,
    subtotalSinIva,
    ivaTotal,
    totalConIva,
    totalItems,
  } = useCarritoStore();

  return (
    <>
      {/* Overlay oscuro */}
      {abierto && (
        <div
          className="fixed inset-0 z-50 overlay-dark backdrop-modal transition-opacity duration-300"
          onClick={cerrarCarrito}
          aria-hidden="true"
        />
      )}
      {/* Drawer lateral */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-card flex flex-col shadow-drawer transition-transform duration-300 ease-in-out ${
          abierto ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Carrito de compras"
        role="dialog"
        aria-modal="true"
      >
        {/* Header del carrito */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingCart size={20} className="text-primary" />
            <h2 className="text-base font-bold text-foreground">
              Carrito de compras
            </h2>
            {totalItems > 0 && (
              <span className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={cerrarCarrito}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
            aria-label="Cerrar carrito"
          >
            <X size={18} />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4">
          {items?.length === 0 ? (
            /* Estado vacío */
            (<div className="flex flex-col items-center justify-center h-full gap-4 py-12">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag size={36} className="text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-foreground mb-1">
                  Tu carrito está vacío
                </p>
                <p className="text-sm text-muted-foreground">
                  Agrega productos del catálogo para comenzar tu compra
                </p>
              </div>
              <button
                onClick={cerrarCarrito}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-orange-600 active:scale-95 transition-all duration-150"
              >
                Ver catálogo
              </button>
            </div>)
          ) : (
            <div className="flex flex-col gap-4">
              {items?.map((item) => (
                <div
                  key={`carrito-item-${item?.producto?.id}`}
                  className="flex gap-3 p-3 bg-muted/40 rounded-xl border border-border/50 fade-in"
                >
                  {/* Imagen del producto */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                    <AppImage
                      src={item?.producto?.imagen}
                      alt={`Imagen de ${item?.producto?.nombre}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info del producto */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground line-clamp-2 leading-tight mb-1">
                      {item?.producto?.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mb-2">
                      {item?.producto?.sku}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      {/* Selector cantidad */}
                      <div className="flex items-center gap-1 bg-card rounded-lg border border-border">
                        <button
                          onClick={() => actualizarCantidad(item?.producto?.id, item?.cantidad - 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-l-lg transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-foreground nums-tabular">
                          {item?.cantidad}
                        </span>
                        <button
                          onClick={() => actualizarCantidad(item?.producto?.id, item?.cantidad + 1)}
                          disabled={item?.cantidad >= item?.producto?.stock}
                          className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-r-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Precio */}
                      <span className="text-sm font-bold text-foreground nums-tabular">
                        {formatearMXN(item?.subtotalConIva)}
                      </span>

                      {/* Eliminar */}
                      <button
                        onClick={() => quitarProducto(item?.producto?.id)}
                        className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-danger transition-colors rounded-lg hover:bg-red-50"
                        aria-label={`Eliminar ${item?.producto?.nombre} del carrito`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con totales y acciones */}
        {items?.length > 0 && (
          <div className="border-t border-border px-5 py-4 shrink-0 bg-card">
            {/* Desglose de precios */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal (sin IVA)</span>
                <span className="font-medium text-foreground nums-tabular">
                  {formatearMXN(subtotalSinIva)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">IVA (16%)</span>
                <span className="font-medium text-foreground nums-tabular">
                  {formatearMXN(ivaTotal)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-base font-bold text-foreground">Total MXN</span>
                <span className="text-base font-bold text-primary nums-tabular">
                  {formatearMXN(totalConIva)}
                </span>
              </div>
            </div>

            {/* Botones acción */}
            <div className="flex flex-col gap-2">
              <Link
                href="/checkout-simulaci-n-de-pago"
                onClick={cerrarCarrito}
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-orange-600 active:scale-[0.98] transition-all duration-150"
              >
                Proceder al pago
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={vaciarCarrito}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-muted-foreground hover:text-danger text-sm font-medium transition-colors rounded-xl hover:bg-red-50"
              >
                <Trash2 size={14} />
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}