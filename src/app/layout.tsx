import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import '../styles/tailwind.css';

/* Fuente principal — Plus Jakarta Sans */
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'PosMart — Sistema de Ventas para México',
  description:
    'Sistema de punto de venta moderno para México. Gestiona tu catálogo, carrito y ventas con IVA automático en MXN.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        {children}
        {/* Sistema de notificaciones toast — backend: conectar a eventos globales */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'var(--font-plus-jakarta-sans)',
              fontSize: '14px',
            },
          }}
          richColors
        />
</body>
    </html>
  );
}