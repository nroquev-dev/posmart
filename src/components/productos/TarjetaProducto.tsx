/**
 * Tarjeta de producto para el grid del catálogo
 * Muestra imagen, nombre, precio MXN, stock y botón agregar
 */
'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye, AlertTriangle } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { toast } from 'sonner';
import { Producto } from '@/tipos/producto';
import { useCarritoStore } from '@/store/carritoStore';
import { useFavoritosStore } from '@/store/favoritosStore';
import { formatearMXN, obtenerColorStock, obtenerTextoStock } from '@/utils/formato';

interface TarjetaProductoProps {
  producto: Producto;
}

export default function TarjetaProducto({ producto }: TarjetaProductoProps) {
  const { agregarProducto, items } = useCarritoStore();
  const { toggleFavorito, esFavorito } = useFavoritosStore();

  const estaEnCarrito = items.some((i) => i.producto.id === producto.id);
  const esAgotado = producto.stock === 0;
  const colorStock = obtenerColorStock(producto.stock);
  const textoStock = obtenerTextoStock(producto.stock);
  const favorito = esFavorito(producto.id);

  const handleAgregarCarrito = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (esAgotado) return;

    agregarProducto(producto);
    toast.success(`${producto.nombre} agregado al carrito`, {
      description: `${formatearMXN(producto.precioConIva)} c/u · IVA incluido`,
      icon: '🛒',
      duration: 2500,
    });
  };

  const handleToggleFavorito = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorito(producto.id);
    toast(favorito ? 'Eliminado de favoritos' : 'Agregado a favoritos', {
      icon: favorito ? '💔' : '❤️',
      duration: 1800,
    });
  };

  return (
    <article className="group relative bg-card rounded-xl border border-border shadow-producto hover:shadow-producto-hover transition-all duration-200 hover:-translate-y-1 overflow-hidden flex flex-col">
      {/* Imagen con overlay de acciones */}
      <Link href={`/detalle-de-producto?id=${producto.id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <AppImage
            src={producto.imagen}
            alt={`Fotografía de ${producto.nombre} — ${producto.categoria}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay oscuro en hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />

          {/* Botón ver detalles — aparece en hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="flex items-center gap-2 px-4 py-2 bg-white/90 text-foreground rounded-full text-xs font-semibold shadow-lg">
              <Eye size={14} />
              Ver detalles
            </span>
          </div>

          {/* Badges superiores */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {producto.nuevo && (
              <span className="badge-base bg-primary text-primary-foreground text-xs">
                Nuevo
              </span>
            )}
            {producto.destacado && !producto.nuevo && (
              <span className="badge-base bg-secondary text-secondary-foreground text-xs">
                Destacado
              </span>
            )}
            {esAgotado && (
              <span className="badge-base badge-agotado text-xs">
                Agotado
              </span>
            )}
          </div>

          {/* Botón favorito */}
          <button
            onClick={handleToggleFavorito}
            className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-all duration-150 active:scale-90 ${
              favorito
                ? 'bg-red-50 text-red-500' :'bg-white/80 text-muted-foreground hover:bg-white hover:text-red-500'
            }`}
            aria-label={favorito ? `Quitar ${producto.nombre} de favoritos` : `Agregar ${producto.nombre} a favoritos`}
          >
            <Heart
              size={14}
              className={favorito ? 'fill-red-500' : ''}
            />
          </button>
        </div>
      </Link>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col flex-1 p-3.5 gap-2">
        {/* Categoría */}
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {producto.categoria}
        </span>

        {/* Nombre */}
        <Link
          href={`/detalle-de-producto?id=${producto.id}`}
          className="text-sm font-semibold text-foreground line-clamp-2 leading-snug hover:text-primary transition-colors"
        >
          {producto.nombre}
        </Link>

        {/* SKU */}
        <span className="text-xs text-muted-foreground font-mono">
          {producto.sku}
        </span>

        {/* Stock badge */}
        <div className="flex items-center gap-1.5">
          {colorStock === 'bajo' && (
            <AlertTriangle size={12} className="text-warning shrink-0" />
          )}
          <span
            className={`text-xs font-medium ${
              colorStock === 'agotado'
                ? 'text-danger'
                : colorStock === 'bajo' ?'text-warning' :'text-success'
            }`}
          >
            {textoStock}
          </span>
        </div>

        {/* Precio y botón */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground nums-tabular leading-none">
              {formatearMXN(producto.precioConIva)}
            </span>
            <span className="text-xs text-muted-foreground">IVA incluido</span>
          </div>

          <button
            onClick={handleAgregarCarrito}
            disabled={esAgotado}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150 active:scale-95 shrink-0 ${
              esAgotado
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : estaEnCarrito
                ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' :'bg-primary text-primary-foreground hover:bg-orange-600'
            }`}
            aria-label={
              esAgotado
                ? `${producto.nombre} — Agotado`
                : `Agregar ${producto.nombre} al carrito`
            }
          >
            <ShoppingCart size={13} />
            {esAgotado ? 'Agotado' : estaEnCarrito ? 'En carrito' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
}