/**
 * Utilidades de formato para el mercado mexicano
 * Precios en MXN, IVA 16%, fechas en español
 */

/* Formatea un número como precio en MXN */
export const formatearMXN = (precio: number): string =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(precio);

/* Formatea fecha en español mexicano */
export const formatearFecha = (fecha: Date): string =>
  new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(fecha);

/* Formatea fecha corta */
export const formatearFechaCorta = (fecha: Date): string =>
  new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(fecha);

/* Genera folio de orden único */
export const generarFolioOrden = (): string => {
  const prefijo = 'PV';
  const timestamp = Date.now().toString().slice(-6);
  const aleatorio = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefijo}-${timestamp}-${aleatorio}`;
};

/* Trunca texto largo con elipsis */
export const truncarTexto = (texto: string, maxCaracteres: number): string =>
  texto.length > maxCaracteres ? `${texto.slice(0, maxCaracteres)}...` : texto;

/* Calcula el porcentaje de descuento */
export const calcularDescuento = (precioOriginal: number, precioActual: number): number =>
  Math.round(((precioOriginal - precioActual) / precioOriginal) * 100);

/* Obtiene el color del badge según el stock */
export const obtenerColorStock = (stock: number): 'disponible' | 'bajo' | 'agotado' => {
  if (stock === 0) return 'agotado';
  if (stock <= 5) return 'bajo';
  return 'disponible';
};

/* Obtiene el texto del badge según el stock */
export const obtenerTextoStock = (stock: number): string => {
  if (stock === 0) return 'Agotado';
  if (stock <= 5) return `Solo ${stock} disponibles`;
  return `${stock} en stock`;
};