/**
 * Contenido principal de la página de detalle de producto
 * Lee el ID del producto desde los query params
 * Layout 2 columnas: imagen izquierda, specs derecha
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Package,
  Tag,
  Hash,
  ChevronRight,
  Star,
} from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { toast } from 'sonner';
import { obtenerProductoPorId } from '@/datos/productos';
import { useCarritoStore } from '@/store/carritoStore';
import { useFavoritosStore } from '@/store/favoritosStore';
import { formatearMXN, obtenerColorStock, obtenerTextoStock } from '@/utils/formato';
import { IVA_MEXICO } from '@/datos/productos';

export default function DetalleProductoContenido() {
  const searchParams = useSearchParams();
  const productoId = searchParams?.get('id') ?? '';
  const producto = obtenerProductoPorId(productoId);

  const [cantidad, setCantidad] = useState(1);
  const { agregarProducto, actualizarCantidad, items, abrirCarrito } = useCarritoStore();
  const { toggleFavorito, esFavorito } = useFavoritosStore();

  /* Si no se encontró el producto */
  if (!producto) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
          <Package size={36} className="text-muted-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Producto no encontrado</h1>
          <p className="text-sm text-muted-foreground mb-6">
            El producto que buscas no existe o fue eliminado del catálogo.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-orange-600 active:scale-95 transition-all duration-150"
        >
          <ArrowLeft size={16} />
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const esAgotado = producto?.stock === 0;
  const colorStock = obtenerColorStock(producto?.stock);
  const textoStock = obtenerTextoStock(producto?.stock);
  const favorito = esFavorito(producto?.id);
  const itemEnCarrito = items?.find((i) => i?.producto?.id === producto?.id);
  const estaEnCarrito = !!itemEnCarrito;

  /* Cálculos de precio */
  const precioUnitarioSinIva = producto?.precio;
  const ivaUnitario = Math.round(producto?.precio * IVA_MEXICO * 100) / 100;
  const precioTotalSinIva = Math.round(precioUnitarioSinIva * cantidad * 100) / 100;
  const ivaTotalCalculado = Math.round(precioTotalSinIva * IVA_MEXICO * 100) / 100;
  const totalConIva = Math.round((precioTotalSinIva + ivaTotalCalculado) * 100) / 100;

  const handleAgregarCarrito = () => {
    if (esAgotado) return;

    if (estaEnCarrito) {
      actualizarCantidad(producto?.id, (itemEnCarrito?.cantidad ?? 0) + cantidad);
    } else {
      for (let i = 0; i < cantidad; i++) {
        agregarProducto(producto);
      }
    }

    toast?.success(`${producto?.nombre} agregado al carrito`, {
      description: `${cantidad} unidad${cantidad > 1 ? 'es' : ''} · ${formatearMXN(totalConIva)} total con IVA`,
      icon: '🛒',
      action: {
        label: 'Ver carrito',
        onClick: () => abrirCarrito(),
      },
    });
  };

  const handleToggleFavorito = () => {
    toggleFavorito(producto?.id);
    toast(favorito ? 'Eliminado de favoritos' : 'Guardado en favoritos', {
      icon: favorito ? '💔' : '❤️',
      duration: 1800,
    });
  };

  const handleCompartir = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard?.writeText(window.location?.href);
      toast?.success('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm" aria-label="Navegación">
        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
          Catálogo
        </Link>
        <ChevronRight size={14} className="text-muted-foreground" />
        <span className="text-muted-foreground">{producto?.categoria}</span>
        <ChevronRight size={14} className="text-muted-foreground" />
        <span className="text-foreground font-medium line-clamp-1 max-w-[200px]">
          {producto?.nombre}
        </span>
      </nav>
      {/* Botón regresar */}
      <Link
        href="/"
        className="flex items-center gap-2 w-fit text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Regresar al catálogo
      </Link>
      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        {/* Columna izquierda — Imagen */}
        <div className="flex flex-col gap-4">
          {/* Imagen principal */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
            <AppImage
              src={producto?.imagen}
              alt={`Fotografía detallada de ${producto?.nombre} — ${producto?.categoria} en PosMart`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {producto?.nuevo && (
                <span className="badge-base bg-primary text-primary-foreground">Nuevo</span>
              )}
              {producto?.destacado && (
                <span className="badge-base bg-secondary text-secondary-foreground">Destacado</span>
              )}
              {esAgotado && (
                <span className="badge-base badge-agotado">Agotado</span>
              )}
            </div>

            {/* Acciones sobre imagen */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={handleToggleFavorito}
                className={`w-10 h-10 flex items-center justify-center rounded-xl shadow-md transition-all duration-150 active:scale-90 ${
                  favorito
                    ? 'bg-red-50 text-red-500' :'bg-white/90 text-muted-foreground hover:bg-white hover:text-red-500'
                }`}
                aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Heart size={18} className={favorito ? 'fill-red-500' : ''} />
              </button>
              <button
                onClick={handleCompartir}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/90 shadow-md text-muted-foreground hover:bg-white hover:text-foreground transition-all duration-150 active:scale-90"
                aria-label="Compartir producto"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Info rápida en cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Package, label: 'Stock', valor: `${producto?.stock} unidades` },
              { icon: Tag, label: 'Categoría', valor: producto?.categoria },
              { icon: Hash, label: 'SKU', valor: producto?.sku },
            ]?.map((info, idx) => (
              <div
                key={`info-card-${idx + 1}`}
                className="flex flex-col items-center gap-1.5 p-3 bg-muted/50 rounded-xl border border-border text-center"
              >
                <info.icon size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground font-medium">{info?.label}</span>
                <span className="text-xs font-bold text-foreground line-clamp-1">{info?.valor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha — Detalles y compra */}
        <div className="flex flex-col gap-6">
          {/* Categoría */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {producto?.categoria}
            </span>
            {producto?.destacado && (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5]?.map((estrella) => (
                  <Star
                    key={`estrella-${estrella}`}
                    size={12}
                    className="text-warning fill-warning"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Nombre del producto */}
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
            {producto?.nombre}
          </h1>

          {/* Descripción */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {producto?.descripcion}
          </p>

          {/* Desglose de precio con IVA */}
          <div className="bg-muted/50 rounded-xl border border-border p-4 flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Desglose de precio
            </h3>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Precio unitario (sin IVA)
                </span>
                <span className="text-sm font-medium text-foreground nums-tabular">
                  {formatearMXN(precioUnitarioSinIva)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  IVA 16% por unidad
                </span>
                <span className="text-sm font-medium text-foreground nums-tabular">
                  {formatearMXN(ivaUnitario)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-base font-bold text-foreground">
                  Precio con IVA
                </span>
                <span className="text-xl font-bold text-primary nums-tabular">
                  {formatearMXN(producto?.precioConIva)}
                </span>
              </div>
            </div>
          </div>

          {/* Selector de cantidad */}
          <div className="flex flex-col gap-2">
            <label className="label-base">Cantidad</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-muted rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  disabled={cantidad <= 1}
                  className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Disminuir cantidad"
                >
                  <Minus size={16} />
                </button>
                <span className="w-14 text-center text-base font-bold text-foreground nums-tabular">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(Math.min(producto?.stock, cantidad + 1))}
                  disabled={cantidad >= producto?.stock || esAgotado}
                  className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Stock indicator */}
              <div className="flex items-center gap-1.5">
                {colorStock === 'agotado' ? (
                  <XCircle size={15} className="text-danger" />
                ) : colorStock === 'bajo' ? (
                  <AlertTriangle size={15} className="text-warning" />
                ) : (
                  <CheckCircle size={15} className="text-success" />
                )}
                <span
                  className={`text-sm font-medium ${
                    colorStock === 'agotado'
                      ? 'text-danger'
                      : colorStock === 'bajo' ?'text-warning' :'text-success'
                  }`}
                >
                  {textoStock}
                </span>
              </div>
            </div>
          </div>

          {/* Total con cantidad seleccionada */}
          {cantidad > 1 && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 fade-in">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({cantidad} unidades, sin IVA)</span>
                  <span className="font-medium nums-tabular">{formatearMXN(precioTotalSinIva)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IVA 16%</span>
                  <span className="font-medium nums-tabular">{formatearMXN(ivaTotalCalculado)}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-primary/20">
                  <span className="font-bold text-foreground">Total con IVA</span>
                  <span className="font-bold text-primary text-lg nums-tabular">
                    {formatearMXN(totalConIva)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAgregarCarrito}
              disabled={esAgotado}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-base font-bold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground bg-primary text-primary-foreground hover:bg-orange-600"
            >
              <ShoppingCart size={20} />
              {esAgotado
                ? 'Producto agotado'
                : estaEnCarrito
                ? `Agregar ${cantidad} más al carrito`
                : `Agregar ${cantidad > 1 ? `${cantidad} unidades` : 'al carrito'}`}
            </button>

            <Link
              href="/checkout-simulaci-n-de-pago"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-base font-semibold border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-150 active:scale-[0.98]"
            >
              Ir al checkout
            </Link>
          </div>

          {/* Info adicional */}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle size={13} className="text-success shrink-0" />
              <span>Todos los precios incluyen IVA 16% (LIVA México)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle size={13} className="text-success shrink-0" />
              <span>Factura electrónica (CFDI) disponible en el checkout</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle size={13} className="text-success shrink-0" />
              <span>Pagos con efectivo, tarjeta o transferencia SPEI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}