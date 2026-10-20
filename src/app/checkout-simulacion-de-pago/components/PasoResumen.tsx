/**
 * Paso 1 del checkout — Resumen del pedido
 * Lista todos los items del carrito con cantidades y subtotales
 */
'use client';

import React from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { useCarritoStore } from '@/store/carritoStore';
import { formatearMXN } from '@/utils/formato';

export default function PasoResumen() {
  const { items, actualizarCantidad, quitarProducto } = useCarritoStore();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-foreground">Resumen de tu pedido</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Revisa los productos antes de continuar
        </p>
      </div>
      {/* Lista de productos */}
      <div className="flex flex-col divide-y divide-border">
        {items?.map((item) => (
          <div
            key={`checkout-item-${item?.producto?.id}`}
            className="flex gap-4 py-4 first:pt-0 last:pb-0"
          >
            {/* Imagen */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
              <AppImage
                src={item?.producto?.imagen}
                alt={`Imagen de ${item?.producto?.nombre} en el resumen del pedido`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                {item?.producto?.nombre}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">
                  {item?.producto?.sku}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-primary font-medium">
                  {item?.producto?.categoria}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatearMXN(item?.producto?.precioConIva)} c/u (IVA incl.)
              </p>

              {/* Controles cantidad */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center bg-muted rounded-lg border border-border overflow-hidden">
                  <button
                    onClick={() => actualizarCantidad(item?.producto?.id, item?.cantidad - 1)}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold nums-tabular">
                    {item?.cantidad}
                  </span>
                  <button
                    onClick={() => actualizarCantidad(item?.producto?.id, item?.cantidad + 1)}
                    disabled={item?.cantidad >= item?.producto?.stock}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-foreground nums-tabular">
                    {formatearMXN(item?.subtotalConIva)}
                  </span>
                  <button
                    onClick={() => quitarProducto(item?.producto?.id)}
                    className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-danger transition-colors rounded-lg hover:bg-red-50"
                    aria-label={`Eliminar ${item?.producto?.nombre}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Link para seguir comprando */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-orange-600 transition-colors"
        >
          <ShoppingCart size={14} />
          Agregar más productos
        </Link>
        <span className="text-xs text-muted-foreground">
          {items?.reduce((acc, i) => acc + i?.cantidad, 0)} producto{items?.reduce((acc, i) => acc + i?.cantidad, 0) !== 1 ? 's' : ''} en total
        </span>
      </div>
    </div>
  );
}