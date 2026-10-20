/**
 * Paso 3 del checkout — Selección de método de pago
 * Opciones: efectivo, tarjeta de crédito, tarjeta de débito, transferencia SPEI
 * Métodos de pago típicos del mercado mexicano
 */
'use client';

import React from 'react';
import { Banknote, CreditCard, Smartphone, ShieldCheck, Lock } from 'lucide-react';
import { MetodoPago } from '@/tipos/producto';
import { useCarritoStore } from '@/store/carritoStore';
import { formatearMXN } from '@/utils/formato';

interface PasoMetodoPagoProps {
  metodoPago: MetodoPago;
  onCambiar: (metodo: MetodoPago) => void;
}

const METODOS_PAGO: {
  id: MetodoPago;
  nombre: string;
  descripcion: string;
  icono: React.ElementType;
  badge?: string;
}[] = [
  {
    id: 'efectivo',
    nombre: 'Efectivo',
    descripcion: 'Pago en efectivo al momento de la entrega o en caja',
    icono: Banknote,
    badge: 'Sin comisión',
  },
  {
    id: 'tarjeta_debito',
    nombre: 'Tarjeta de débito',
    descripcion: 'Visa Débito, Mastercard Débito — pago inmediato',
    icono: CreditCard,
    badge: 'Sin comisión',
  },
  {
    id: 'tarjeta_credito',
    nombre: 'Tarjeta de crédito',
    descripcion: 'Visa, Mastercard, American Express — hasta 12 MSI',
    icono: CreditCard,
    badge: 'MSI disponible',
  },
  {
    id: 'transferencia_spei',
    nombre: 'Transferencia SPEI',
    descripcion: 'Pago por transferencia bancaria SPEI — acreditación inmediata',
    icono: Smartphone,
    badge: 'Sin comisión',
  },
];

export default function PasoMetodoPago({ metodoPago, onCambiar }: PasoMetodoPagoProps) {
  const { totalConIva } = useCarritoStore();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Método de pago</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Elige cómo deseas pagar tu pedido
        </p>
      </div>

      {/* Métodos de pago */}
      <div className="flex flex-col gap-3">
        {METODOS_PAGO.map((metodo) => {
          const seleccionado = metodoPago === metodo.id;
          return (
            <button
              key={`metodo-${metodo.id}`}
              onClick={() => onCambiar(metodo.id)}
              className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                seleccionado
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
              }`}
              role="radio"
              aria-checked={seleccionado}
            >
              {/* Radio indicator */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  seleccionado ? 'border-primary' : 'border-border'
                }`}
              >
                {seleccionado && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>

              {/* Icono del método */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  seleccionado ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                <metodo.icono size={20} />
              </div>

              {/* Info del método */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">
                    {metodo.nombre}
                  </span>
                  {metodo.badge && (
                    <span className="badge-base bg-green-50 text-green-700 border border-green-200 text-xs">
                      {metodo.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {metodo.descripcion}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detalle según método seleccionado */}
      {metodoPago === 'transferencia_spei' && (
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 fade-in">
          <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Smartphone size={15} />
            Datos para transferencia SPEI
          </h4>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Banco', valor: 'BBVA México' },
              { label: 'CLABE', valor: '012 180 0012345678 90' },
              { label: 'Beneficiario', valor: 'PosMart S.A. de C.V.' },
              { label: 'Referencia', valor: 'Se generará al confirmar' },
              { label: 'Monto', valor: formatearMXN(totalConIva) },
            ].map((dato) => (
              <div key={`spei-${dato.label}`} className="flex justify-between text-xs">
                <span className="text-blue-600 font-medium">{dato.label}</span>
                <span className="text-blue-800 font-mono font-semibold">{dato.valor}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-600 mt-3">
            * La acreditación es inmediata una vez confirmada la transferencia por tu banco.
          </p>
        </div>
      )}

      {(metodoPago === 'tarjeta_credito' || metodoPago === 'tarjeta_debito') && (
        <div className="p-4 bg-muted/50 rounded-xl border border-border fade-in">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Datos de tarjeta
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="numTarjeta" className="label-base">Número de tarjeta</label>
              <input
                id="numTarjeta"
                type="text"
                placeholder="1234 5678 9012 3456"
                className="input-base font-mono"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="vencimiento" className="label-base">Vencimiento</label>
                <input
                  id="vencimiento"
                  type="text"
                  placeholder="MM/AA"
                  className="input-base font-mono"
                  maxLength={5}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cvv" className="label-base">CVV</label>
                <input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  className="input-base font-mono"
                  maxLength={4}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nombreTarjeta" className="label-base">Nombre en la tarjeta</label>
              <input
                id="nombreTarjeta"
                type="text"
                placeholder="MARIA GONZALEZ RAMIREZ"
                className="input-base uppercase"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
            <Lock size={11} />
            Esta es una simulación — no ingreses datos reales de tarjeta
          </p>
        </div>
      )}

      {/* Seguridad */}
      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
        <ShieldCheck size={18} className="text-success shrink-0" />
        <div>
          <p className="text-xs font-semibold text-green-800">Compra segura y protegida</p>
          <p className="text-xs text-green-700">
            Esta es una simulación de pago. Ningún dato real es procesado.
          </p>
        </div>
      </div>
    </div>
  );
}