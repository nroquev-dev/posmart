/**
 * Paso 4 del checkout — Pantalla de confirmación de pago
 * Muestra folio de orden, resumen completo y opciones para continuar
 */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Receipt,
  Download,
  ShoppingBag,
  Calendar,
  CreditCard,
  User,
  Mail,
  Package,
} from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { Orden } from '@/tipos/producto';
import { formatearMXN } from '@/utils/formato';

interface PasoConfirmacionProps {
  orden: Orden;
}

const NOMBRES_METODO: Record<string, string> = {
  efectivo: 'Efectivo',
  tarjeta_credito: 'Tarjeta de crédito',
  tarjeta_debito: 'Tarjeta de débito',
  transferencia_spei: 'Transferencia SPEI',
};

export default function PasoConfirmacion({ orden }: PasoConfirmacionProps) {
  const [fechaFormateada, setFechaFormateada] = useState('');

  /* Formatear fecha solo en cliente para evitar hidratación */
  useEffect(() => {
    const fecha = new Date(orden.fecha);
    setFechaFormateada(
      new Intl.DateTimeFormat('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(fecha)
    );
  }, [orden.fecha]);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Header de éxito */}
      <div className="flex flex-col items-center text-center gap-4 py-6">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
          <CheckCircle size={40} className="text-success" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            ¡Pago confirmado!
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tu pedido ha sido procesado exitosamente
          </p>
        </div>

        {/* Folio */}
        <div className="flex items-center gap-3 px-5 py-3 bg-muted rounded-xl border border-border">
          <Receipt size={18} className="text-primary" />
          <div className="text-left">
            <p className="text-xs text-muted-foreground font-medium">Folio de orden</p>
            <p className="text-base font-bold text-foreground font-mono tracking-wider">
              {orden.folio}
            </p>
          </div>
        </div>
      </div>

      {/* Detalle de la orden */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-muted/30 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">Detalle del pedido</h3>
        </div>

        {/* Items */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {orden.items.map((item) => (
            <div
              key={`confirm-item-${item.producto.id}`}
              className="flex items-center gap-3 py-2"
            >
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
                <AppImage
                  src={item.producto.imagen}
                  alt={`${item.producto.nombre} en orden confirmada`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground line-clamp-1">
                  {item.producto.nombre}
                </p>
                <p className="text-xs text-muted-foreground font-mono">{item.producto.sku}</p>
                <p className="text-xs text-muted-foreground">
                  {item.cantidad} × {formatearMXN(item.producto.precioConIva)}
                </p>
              </div>
              <span className="text-sm font-bold text-foreground nums-tabular shrink-0">
                {formatearMXN(item.subtotalConIva)}
              </span>
            </div>
          ))}
        </div>

        {/* Totales */}
        <div className="px-5 py-4 border-t border-border bg-muted/20 flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal (sin IVA)</span>
            <span className="font-medium nums-tabular">{formatearMXN(orden.subtotalSinIva)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">IVA 16%</span>
            <span className="font-medium nums-tabular">{formatearMXN(orden.ivaTotal)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-base font-bold text-foreground">Total pagado</span>
            <span className="text-xl font-bold text-primary nums-tabular">
              {formatearMXN(orden.totalConIva)}
            </span>
          </div>
        </div>
      </div>

      {/* Info adicional */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Datos del cliente */}
        <div className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Datos del cliente
          </h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-sm">
              <User size={14} className="text-primary shrink-0" />
              <span className="text-foreground font-medium">{orden.datosCliente.nombre}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Mail size={14} className="text-primary shrink-0" />
              <span className="text-muted-foreground break-all">{orden.datosCliente.email}</span>
            </div>
            {orden.datosCliente.requiereFactura && orden.datosCliente.rfc && (
              <div className="flex items-center gap-2.5 text-sm">
                <Receipt size={14} className="text-primary shrink-0" />
                <span className="text-muted-foreground font-mono">{orden.datosCliente.rfc}</span>
              </div>
            )}
          </div>
        </div>

        {/* Detalles de pago */}
        <div className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Detalles del pago
          </h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-sm">
              <CreditCard size={14} className="text-primary shrink-0" />
              <span className="text-foreground font-medium">
                {NOMBRES_METODO[orden.metodoPago] ?? orden.metodoPago}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Calendar size={14} className="text-primary shrink-0" />
              <span className="text-muted-foreground text-xs">{fechaFormateada}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Package size={14} className="text-primary shrink-0" />
              <span className="text-muted-foreground">
                {orden.items.reduce((a, i) => a + i.cantidad, 0)} artículo{orden.items.reduce((a, i) => a + i.cantidad, 0) !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Factura info */}
      {orden.datosCliente.requiereFactura && (
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 fade-in">
          <Receipt size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-800">Factura CFDI en proceso</p>
            <p className="text-xs text-blue-600 mt-0.5">
              Tu factura electrónica CFDI 4.0 será enviada a{' '}
              <span className="font-semibold">{orden.datosCliente.email}</span> en los próximos minutos.
              RFC: <span className="font-mono font-semibold">{orden.datosCliente.rfc}</span>
            </p>
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-orange-600 active:scale-[0.98] transition-all duration-150"
        >
          <ShoppingBag size={16} />
          Seguir comprando
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 flex-1 py-3 border-2 border-border text-foreground rounded-xl text-sm font-semibold hover:bg-muted active:scale-[0.98] transition-all duration-150"
        >
          <Download size={16} />
          Guardar comprobante
        </button>
      </div>

      {/* Nota final */}
      <p className="text-xs text-muted-foreground text-center pb-4">
        Esta es una simulación de pago con fines demostrativos. Folio {orden.folio} guardado en tu historial local.
      </p>
    </div>
  );
}