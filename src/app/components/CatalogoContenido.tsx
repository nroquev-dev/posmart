/**
 * Componente cliente principal del catálogo
 * Maneja filtros, búsqueda, ordenamiento y renderiza el grid
 */
'use client';

import React, { useState, useMemo } from 'react';
import { Package, SlidersHorizontal, RefreshCw } from 'lucide-react';
import TarjetaProducto from '@/components/productos/TarjetaProducto';
import SkeletonTarjeta from '@/components/productos/SkeletonTarjeta';
import FiltroCategorias from '@/components/productos/FiltroCategorias';
import BuscadorProductos from '@/components/productos/BuscadorProductos';
import OrdenamientoSelect from '@/components/productos/OrdenamientoSelect';
import { productos, obtenerCategorias } from '@/datos/productos';
import { useBusqueda } from '@/hooks/useBusqueda';
import { OrdenCatalogo } from '@/tipos/producto';

export default function CatalogoContenido() {
  const [categoriaActiva, setCategoriaActiva] = useState<string>('Todos');
  const [orden, setOrden] = useState<OrdenCatalogo>('relevancia');
  const [cargando] = useState(false);

  const { busqueda, setBusqueda, busquedaDebounced } = useBusqueda('', 300);

  const categorias = obtenerCategorias();

  /* Filtrar y ordenar productos */
  const productosFiltrados = useMemo(() => {
    let resultado = [...productos];

    /* Filtro por categoría */
    if (categoriaActiva !== 'Todos') {
      resultado = resultado?.filter((p) => p?.categoria === categoriaActiva);
    }

    /* Filtro por búsqueda */
    if (busquedaDebounced?.trim()) {
      const termino = busquedaDebounced?.toLowerCase()?.trim();
      resultado = resultado?.filter(
        (p) =>
          p?.nombre?.toLowerCase()?.includes(termino) ||
          p?.sku?.toLowerCase()?.includes(termino) ||
          p?.categoria?.toLowerCase()?.includes(termino) ||
          p?.descripcion?.toLowerCase()?.includes(termino)
      );
    }

    /* Ordenamiento */
    switch (orden) {
      case 'nombre_asc':
        resultado?.sort((a, b) => a?.nombre?.localeCompare(b?.nombre, 'es-MX'));
        break;
      case 'nombre_desc':
        resultado?.sort((a, b) => b?.nombre?.localeCompare(a?.nombre, 'es-MX'));
        break;
      case 'precio_asc':
        resultado?.sort((a, b) => a?.precioConIva - b?.precioConIva);
        break;
      case 'precio_desc':
        resultado?.sort((a, b) => b?.precioConIva - a?.precioConIva);
        break;
      case 'relevancia':
      default:
        /* Destacados primero, luego nuevos, luego el resto */
        resultado?.sort((a, b) => {
          const pesoA = (a?.destacado ? 2 : 0) + (a?.nuevo ? 1 : 0);
          const pesoB = (b?.destacado ? 2 : 0) + (b?.nuevo ? 1 : 0);
          return pesoB - pesoA;
        });
    }

    return resultado;
  }, [categoriaActiva, busquedaDebounced, orden]);

  const limpiarFiltros = () => {
    setCategoriaActiva('Todos');
    setBusqueda('');
    setOrden('relevancia');
  };

  const hayFiltrosActivos =
    categoriaActiva !== 'Todos' || busquedaDebounced?.trim() !== '' || orden !== 'relevancia';

  return (
    <div className="flex flex-col gap-6">
      {/* Header del catálogo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Catálogo de Productos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {productosFiltrados?.length} producto{productosFiltrados?.length !== 1 ? 's' : ''} disponible{productosFiltrados?.length !== 1 ? 's' : ''} · Precios en MXN con IVA incluido
          </p>
        </div>

        {/* Badge IVA incluido */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-green-50 border border-green-200 rounded-xl shrink-0">
          <div className="w-2 h-2 bg-success rounded-full pulse-soft" />
          <span className="text-xs font-semibold text-green-700">Precios con IVA 16% incluido</span>
        </div>
      </div>
      {/* Barra de filtros */}
      <div className="bg-card rounded-xl border border-border p-4 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Buscador */}
          <div className="flex-1">
            <BuscadorProductos
              valor={busqueda}
              onChange={setBusqueda}
              placeholder="Buscar por nombre, SKU o categoría..."
            />
          </div>

          {/* Ordenamiento */}
          <OrdenamientoSelect valor={orden} onChange={setOrden} />
        </div>

        {/* Chips de categorías */}
        <div className="flex items-start gap-3">
          <FiltroCategorias
            categorias={categorias}
            categoriaActiva={categoriaActiva}
            onCambiarCategoria={setCategoriaActiva}
          />
        </div>

        {/* Limpiar filtros */}
        {hayFiltrosActivos && (
          <div className="flex items-center justify-between pt-1 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <SlidersHorizontal size={12} />
              <span>Filtros activos aplicados</span>
            </div>
            <button
              onClick={limpiarFiltros}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-orange-600 transition-colors"
            >
              <RefreshCw size={12} />
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
      {/* Grid de productos */}
      {cargando ? (
        /* Skeleton loaders */
        (<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 })?.map((_, i) => (
            <SkeletonTarjeta key={`skeleton-${i + 1}`} />
          ))}
        </div>)
      ) : productosFiltrados?.length === 0 ? (
        /* Estado vacío */
        (<div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <Package size={36} className="text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground mb-1">
              No se encontraron productos
            </p>
            <p className="text-sm text-muted-foreground max-w-sm">
              {busquedaDebounced
                ? `No hay resultados para "${busquedaDebounced}" en ${categoriaActiva === 'Todos' ? 'todas las categorías' : categoriaActiva}`
                : `No hay productos en la categoría ${categoriaActiva}`}
            </p>
          </div>
          <button
            onClick={limpiarFiltros}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-orange-600 active:scale-95 transition-all duration-150"
          >
            Ver todos los productos
          </button>
        </div>)
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {productosFiltrados?.map((producto) => (
            <TarjetaProducto key={`prod-card-${producto?.id}`} producto={producto} />
          ))}
        </div>
      )}
      {/* Footer del catálogo */}
      <div className="flex items-center justify-center py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          PosMart © 2026 · Sistema de Ventas para México · Todos los precios incluyen IVA 16%
        </p>
      </div>
    </div>
  );
}