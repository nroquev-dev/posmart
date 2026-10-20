/**
 * Paso 2 del checkout — Datos del cliente
 * Campos de nombre, email, teléfono y opción de factura CFDI
 * Campos de RFC y uso CFDI se muestran solo si requiere factura
 */
'use client';

import React from 'react';
import { User, Mail, Phone, FileText, Info } from 'lucide-react';
import { DatosCliente, UsoCFDI } from '@/tipos/producto';

interface PasoDatosClienteProps {
  datos: DatosCliente;
  onCambiar: (datos: DatosCliente) => void;
}

const OPCIONES_CFDI: { valor: UsoCFDI; etiqueta: string }[] = [
  { valor: 'G01', etiqueta: 'G01 — Adquisición de mercancias' },
  { valor: 'G03', etiqueta: 'G03 — Gastos en general' },
  { valor: 'I01', etiqueta: 'I01 — Construcciones' },
  { valor: 'P01', etiqueta: 'P01 — Por definir' },
  { valor: 'S01', etiqueta: 'S01 — Sin efectos fiscales' },
];

export default function PasoDatosCliente({ datos, onCambiar }: PasoDatosClienteProps) {
  const actualizar = (campo: keyof DatosCliente, valor: string | boolean) => {
    onCambiar({ ...datos, [campo]: valor });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Tus datos</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Ingresa tu información de contacto para continuar
        </p>
      </div>

      {/* Sección datos personales */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <User size={13} />
          Información de contacto
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nombre */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="nombre" className="label-base">
              Nombre completo <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User size={15} className="text-muted-foreground" />
              </div>
              <input
                id="nombre"
                type="text"
                value={datos.nombre}
                onChange={(e) => actualizar('nombre', e.target.value)}
                placeholder="Ej. María González Ramírez"
                className="input-base pl-10"
                required
                aria-required="true"
              />
            </div>
            {datos.nombre.length > 0 && datos.nombre.trim().length < 2 && (
              <p className="text-xs text-danger">El nombre debe tener al menos 2 caracteres</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="label-base">
              Correo electrónico <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={15} className="text-muted-foreground" />
              </div>
              <input
                id="email"
                type="email"
                value={datos.email}
                onChange={(e) => actualizar('email', e.target.value)}
                placeholder="correo@ejemplo.com"
                className="input-base pl-10"
                required
                aria-required="true"
              />
            </div>
            {datos.email.length > 0 && !datos.email.includes('@') && (
              <p className="text-xs text-danger">Ingresa un correo electrónico válido</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefono" className="label-base">
              Teléfono <span className="text-muted-foreground text-xs font-normal">(opcional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone size={15} className="text-muted-foreground" />
              </div>
              <input
                id="telefono"
                type="tel"
                value={datos.telefono ?? ''}
                onChange={(e) => actualizar('telefono', e.target.value)}
                placeholder="55 1234 5678"
                className="input-base pl-10"
                maxLength={15}
              />
            </div>
            <p className="text-xs text-muted-foreground">Formato: 55 1234 5678 (10 dígitos)</p>
          </div>
        </div>
      </div>

      {/* Sección factura */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <FileText size={13} />
          Facturación (CFDI)
        </h3>

        {/* Toggle factura */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              Solicitar factura electrónica
            </span>
            <span className="text-xs text-muted-foreground">
              Factura CFDI 4.0 · Envío automático por correo
            </span>
          </div>
          <button
            role="switch"
            aria-checked={datos.requiereFactura}
            onClick={() => actualizar('requiereFactura', !datos.requiereFactura)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              datos.requiereFactura ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                datos.requiereFactura ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Campos de factura — visibles solo si requiere */}
        {datos.requiereFactura && (
          <div className="flex flex-col gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20 fade-in">
            <div className="flex items-start gap-2 text-xs text-primary">
              <Info size={13} className="shrink-0 mt-0.5" />
              <span>
                El RFC debe coincidir exactamente con el registrado ante el SAT. La factura se enviará al correo indicado.
              </span>
            </div>

            {/* RFC */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rfc" className="label-base">
                RFC <span className="text-danger">*</span>
              </label>
              <input
                id="rfc"
                type="text"
                value={datos.rfc ?? ''}
                onChange={(e) => actualizar('rfc', e.target.value.toUpperCase())}
                placeholder="GOML850101ABC"
                className="input-base font-mono uppercase"
                maxLength={13}
                aria-required="true"
              />
              <p className="text-xs text-muted-foreground">
                Persona física: 13 caracteres · Persona moral: 12 caracteres
              </p>
            </div>

            {/* Razón social */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="razonSocial" className="label-base">
                Razón social / Nombre fiscal <span className="text-danger">*</span>
              </label>
              <input
                id="razonSocial"
                type="text"
                value={datos.razonSocial ?? ''}
                onChange={(e) => actualizar('razonSocial', e.target.value.toUpperCase())}
                placeholder="GONZALEZ RAMIREZ MARIA"
                className="input-base uppercase"
                aria-required="true"
              />
              <p className="text-xs text-muted-foreground">
                Escribe tu nombre o razón social exactamente como aparece en el SAT
              </p>
            </div>

            {/* Uso CFDI */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="usoCfdi" className="label-base">
                Uso del CFDI <span className="text-danger">*</span>
              </label>
              <select
                id="usoCfdi"
                value={datos.usoCfdi}
                onChange={(e) => actualizar('usoCfdi', e.target.value as UsoCFDI)}
                className="input-base appearance-none cursor-pointer"
                aria-required="true"
              >
                {OPCIONES_CFDI.map((op) => (
                  <option key={`cfdi-${op.valor}`} value={op.valor}>
                    {op.etiqueta}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}