/**
 * Tipos TypeScript para el sistema PosMart
 * Adaptados al mercado mexicano con IVA y MXN
 */

/* Categorías disponibles en el catálogo */
export type Categoria =
  | 'Electrónica' |'Ropa y Accesorios' |'Alimentos y Bebidas' |'Hogar y Jardín' |'Deportes' |'Salud y Belleza' |'Juguetes' |'Papelería';

/* Estructura de un producto en el catálogo */
export interface Producto {
  id: string;
  sku: string;
  nombre: string;
  descripcion: string;
  precio: number;         /* Precio SIN IVA en MXN */
  precioConIva: number;   /* Precio CON IVA 16% en MXN */
  categoria: Categoria;
  imagen: string;
  stock: number;
  destacado?: boolean;
  nuevo?: boolean;
}

/* Item dentro del carrito de compras */
export interface CarritoItem {
  producto: Producto;
  cantidad: number;
  subtotal: number;       /* precio * cantidad SIN IVA */
  subtotalConIva: number; /* precioConIva * cantidad */
}

/* Estado global del carrito */
export interface EstadoCarrito {
  items: CarritoItem[];
  abierto: boolean;
  totalItems: number;
  subtotalSinIva: number;
  ivaTotal: number;
  totalConIva: number;
}

/* Métodos de pago disponibles en México */
export type MetodoPago = 'efectivo' | 'tarjeta_credito' | 'tarjeta_debito' | 'transferencia_spei';

/* Uso de CFDI para facturación */
export type UsoCFDI =
  | 'G01'  /* Adquisición de mercancias */
  | 'G03'  /* Gastos en general */
  | 'I01'  /* Construcciones */
  | 'P01'  /* Por definir */
  | 'S01'; /* Sin efectos fiscales */

/* Datos del cliente para checkout */
export interface DatosCliente {
  nombre: string;
  email: string;
  telefono?: string;
  requiereFactura: boolean;
  rfc?: string;
  usoCfdi?: UsoCFDI;
  razonSocial?: string;
}

/* Orden de compra generada */
export interface Orden {
  folio: string;
  fecha: string;
  items: CarritoItem[];
  datosCliente: DatosCliente;
  metodoPago: MetodoPago;
  subtotalSinIva: number;
  ivaTotal: number;
  totalConIva: number;
  estado: 'pendiente' | 'pagada' | 'cancelada';
}

/* Opciones de ordenamiento del catálogo */
export type OrdenCatalogo = 'nombre_asc' | 'nombre_desc' | 'precio_asc' | 'precio_desc' | 'relevancia';

/* Filtros activos en el catálogo */
export interface FiltrosCatalogo {
  busqueda: string;
  categoria: Categoria | 'Todos';
  orden: OrdenCatalogo;
}