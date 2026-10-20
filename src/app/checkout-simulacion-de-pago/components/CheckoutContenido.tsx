/**
 * Contenido principal del checkout
 * Wizard de 4 pasos con barra de progreso
 * Resumen siempre visible en sidebar derecho
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, ArrowRight, CheckCircle,  } from 'lucide-react';
import { useCarritoStore } from '@/store/carritoStore';

import PasoResumen from './PasoResumen';
import PasoDatosCliente from './PasoDatosCliente';
import PasoMetodoPago from './PasoMetodoPago';
import PasoConfirmacion from './PasoConfirmacion';
import ResumenLateral from './ResumenLateral';
import { DatosCliente, MetodoPago, Orden } from '@/tipos/producto';
import { generarFolioOrden } from '@/utils/formato';

/* Definición de los pasos del wizard */
const PASOS = [
  { numero: 1, etiqueta: 'Resumen', descripcion: 'Tu pedido' },
  { numero: 2, etiqueta: 'Datos', descripcion: 'Tu información' },
  { numero: 3, etiqueta: 'Pago', descripcion: 'Método de pago' },
  { numero: 4, etiqueta: 'Listo', descripcion: 'Confirmación' },
];

export default function CheckoutContenido() {
  const [pasoActual, setPasoActual] = useState(1);
  const [procesando, setProcesando] = useState(false);
  const [ordenGenerada, setOrdenGenerada] = useState<Orden | null>(null);
  const [datosCliente, setDatosCliente] = useState<DatosCliente>({
    nombre: '',
    email: '',
    telefono: '',
    requiereFactura: false,
    rfc: '',
    usoCfdi: 'G03',
    razonSocial: '',
  });
  const [metodoPago, setMetodoPago] = useState<MetodoPago>('efectivo');

  const {
    items,
    subtotalSinIva,
    ivaTotal,
    totalConIva,
    vaciarCarrito,
  } = useCarritoStore();

  /* Carrito vacío — redirigir al catálogo */
  if (items.length === 0 && !ordenGenerada) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
          <ShoppingBag size={36} className="text-muted-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">
            Tu carrito está vacío
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Agrega productos al carrito antes de proceder al pago.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-orange-600 active:scale-95 transition-all duration-150"
        >
          <ArrowLeft size={16} />
          Ir al catálogo
        </Link>
      </div>
    );
  }

  /* Simular procesamiento del pago */
  const handleProcesarPago = async () => {
    setProcesando(true);

    /* Backend: reemplazar con llamada a POST /api/ordenes */
    await new Promise((resolve) => setTimeout(resolve, 2200));

    const nuevaOrden: Orden = {
      folio: generarFolioOrden(),
      fecha: new Date().toISOString(),
      items: [...items],
      datosCliente,
      metodoPago,
      subtotalSinIva,
      ivaTotal,
      totalConIva,
      estado: 'pagada',
    };

    /* Guardar orden en localStorage — historial local */
    const historial = JSON.parse(localStorage.getItem('posmart-historial') ?? '[]');
    historial.unshift(nuevaOrden);
    localStorage.setItem('posmart-historial', JSON.stringify(historial.slice(0, 20)));

    setOrdenGenerada(nuevaOrden);
    vaciarCarrito();
    setProcesando(false);
    setPasoActual(4);
  };

  const irAlPasoSiguiente = () => {
    if (pasoActual < 3) setPasoActual(pasoActual + 1);
    if (pasoActual === 3) handleProcesarPago();
  };

  const irAlPasoAnterior = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1);
  };

  const puedeAvanzar = () => {
    if (pasoActual === 2) {
      return (
        datosCliente.nombre.trim().length >= 2 &&
        datosCliente.email.includes('@')
      );
    }
    return true;
  };

  /* Si ya se completó el pago, mostrar confirmación */
  if (pasoActual === 4 && ordenGenerada) {
    return (
      <div className="flex flex-col gap-6">
        <PasoConfirmacion orden={ordenGenerada} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Seguir comprando
        </Link>
        <div className="h-4 w-px bg-border" />
        <h1 className="text-xl font-bold text-foreground">Checkout</h1>
      </div>

      {/* Barra de progreso wizard */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between relative">
          {/* Línea conectora */}
          <div className="absolute left-0 right-0 top-5 h-0.5 bg-border mx-8 sm:mx-12" />
          <div
            className="absolute left-0 top-5 h-0.5 bg-primary transition-all duration-500 mx-8 sm:mx-12"
            style={{ width: `${((pasoActual - 1) / (PASOS.length - 1)) * 100}%` }}
          />

          {PASOS.map((paso) => {
            const completado = paso.numero < pasoActual;
            const activo = paso.numero === pasoActual;

            return (
              <div
                key={`paso-${paso.numero}`}
                className="flex flex-col items-center gap-2 relative z-10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                    completado
                      ? 'step-completado'
                      : activo
                      ? 'step-activo' :'step-pendiente'
                  }`}
                >
                  {completado ? <CheckCircle size={18} /> : paso.numero}
                </div>
                <div className="text-center hidden sm:block">
                  <p
                    className={`text-xs font-semibold ${
                      activo ? 'text-primary' : completado ? 'text-success' : 'text-muted-foreground'
                    }`}
                  >
                    {paso.etiqueta}
                  </p>
                  <p className="text-xs text-muted-foreground">{paso.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Layout principal: contenido + resumen lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contenido del paso actual */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
            {pasoActual === 1 && <PasoResumen />}
            {pasoActual === 2 && (
              <PasoDatosCliente
                datos={datosCliente}
                onCambiar={setDatosCliente}
              />
            )}
            {pasoActual === 3 && (
              <PasoMetodoPago
                metodoPago={metodoPago}
                onCambiar={setMetodoPago}
              />
            )}

            {/* Botones de navegación */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
              <button
                onClick={irAlPasoAnterior}
                disabled={pasoActual === 1}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={15} />
                Anterior
              </button>

              <div className="text-xs text-muted-foreground">
                Paso {pasoActual} de {PASOS.length - 1}
              </div>

              <button
                onClick={irAlPasoSiguiente}
                disabled={!puedeAvanzar() || procesando}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-orange-600 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                {procesando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Procesando...
                  </>
                ) : pasoActual === 3 ? (
                  <>
                    <CheckCircle size={15} />
                    Confirmar pago
                  </>
                ) : (
                  <>
                    Siguiente
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Resumen lateral sticky */}
        <div className="lg:col-span-1">
          <ResumenLateral
            items={items}
            subtotalSinIva={subtotalSinIva}
            ivaTotal={ivaTotal}
            totalConIva={totalConIva}
          />
        </div>
      </div>
    </div>
  );
}