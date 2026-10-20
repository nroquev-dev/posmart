/**
 * Barra de navegación principal del sistema PosMart
 * Incluye logo, links de navegación y botón del carrito con contador
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Heart, Store, Package } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { useCarritoStore } from '@/store/carritoStore';
import { useFavoritosStore } from '@/store/favoritosStore';

export default function BarraNavegacion() {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const { totalItems, toggleCarrito } = useCarritoStore();
  const { favoritos } = useFavoritosStore();

  const navLinks = [
    { href: '/', label: 'Catálogo', icono: Store },
    { href: '/checkout-simulacion-de-pago', label: 'Checkout', icono: Package },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-topbar">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <AppLogo size={36} />
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-lg text-foreground tracking-tight">
                  PosMart
                </span>
                <span className="text-xs text-muted-foreground font-medium hidden sm:block">
                  Sistema de Ventas MX
                </span>
              </div>
            </Link>

            {/* Nav links — desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks?.map((link) => (
                <Link
                  key={`nav-${link?.href}`}
                  href={link?.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
                >
                  <link.icono size={16} />
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* Acciones derecha */}
            <div className="flex items-center gap-2">
              {/* Favoritos */}
              <Link
                href="/"
                className="relative flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
                title="Favoritos"
              >
                <Heart size={20} />
                {favoritos?.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center bounce-in">
                    {favoritos?.length > 9 ? '9+' : favoritos?.length}
                  </span>
                )}
              </Link>

              {/* Botón carrito */}
              <button
                onClick={toggleCarrito}
                className="relative flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-orange-600 active:scale-95 transition-all duration-150"
                aria-label={`Carrito con ${totalItems} productos`}
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Carrito</span>
                {totalItems > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 bg-white text-primary text-xs font-bold rounded-full bounce-in">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>

              {/* Hamburger móvil */}
              <button
                onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
                aria-label="Menú"
              >
                {menuMovilAbierto ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {menuMovilAbierto && (
          <div className="md:hidden border-t border-border bg-card fade-in">
            <nav className="max-w-screen-2xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks?.map((link) => (
                <Link
                  key={`nav-movil-${link?.href}`}
                  href={link?.href}
                  onClick={() => setMenuMovilAbierto(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
                >
                  <link.icono size={18} />
                  {link?.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}