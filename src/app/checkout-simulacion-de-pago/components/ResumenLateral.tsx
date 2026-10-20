/**
 * Resumen lateral sticky del checkout
 * Muestra items, subtotal, IVA y total en MXN
 */
'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { CarritoItem } from '@/tipos/producto';
import { formatearMXN } from '@/utils/formato';
import { Receipt } from 'lucide-react';

interface ResumenLateralProps {
  items: CarritoItem[];
  subtotalSinIva: number;
  ivaTotal: number;
  totalConIva: number;
}

export default function ResumenLateral({
  items,
  subtotalSinIva,
  ivaTotal,
  totalConIva,
}: ResumenLateralProps) {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border bg-muted/30">
          <Receipt size={16} className="text-primary" />
          <h3 className="text-sm font-bold text-foreground">Resumen del pedido</h3>
        </div>

        {/* Items */}
        <div className="px-5 py-4 flex flex-col gap-3 max-h-64 overflow-y-auto scrollbar-thin">
          {items.map((item) => (
            <div
              key={`resumen-lateral-${item.producto.id}`}
              className="flex items-center gap-3"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
                <AppImage
                  src={item.producto.imagen}
                  alt={`Miniatura de ${item.producto.nombre}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
                {/* Badge cantidad */}
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {item.cantidad}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
                  {item.producto.nombre}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatearMXN(item.producto.precioConIva)} c/u
                </p>
              </div>
              <span className="text-xs font-bold text-foreground nums-tabular shrink-0">
                {formatearMXN(item.subtotalConIva)}
              </span>
            </div>
          ))}
        </div>

        {/* Totales */}
        <div className="px-5 py-4 border-t border-border flex flex-col gap-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal (sin IVA)</span>
            <span className="font-medium nums-tabular">{formatearMXN(subtotalSinIva)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">IVA (16%)</span>
            <span className="font-medium nums-tabular">{formatearMXN(ivaTotal)}</span>
          </div>
          <div className="flex justify-between items-center pt-2.5 border-t border-border">
            <span className="text-base font-bold text-foreground">Total MXN</span>
            <span className="text-xl font-bold text-primary nums-tabular">
              {formatearMXN(totalConIva)}
            </span>
          </div>
        </div>

        {/* Nota IVA */}
        <div className="px-5 pb-4">
          <p className="text-xs text-muted-foreground text-center">
            Precios incluyen IVA 16% · LIVA México
          </p>
        </div>
      </div>
    </div>
  );
}