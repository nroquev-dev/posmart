/**
 * Datos mock de productos para PosMart
 * 15+ productos con categorías variadas, precios en MXN con IVA 16%
 * Backend: reemplazar con llamada a API GET /api/productos
 */
import { Producto } from '@/tipos/producto';

/* Constante del IVA mexicano */
export const IVA_MEXICO = 0.16;

/* Función para calcular precio con IVA */
export const calcularPrecioConIva = (precioSinIva: number): number =>
Math.round(precioSinIva * (1 + IVA_MEXICO) * 100) / 100;

/* Catálogo de productos mock */
export const productos: Producto[] = [
{
  id: 'prod-001',
  sku: 'ELEC-TV-55-001',
  nombre: 'Televisor Smart LED 55" 4K',
  descripcion:
  'Televisor inteligente de 55 pulgadas con resolución 4K Ultra HD. Compatible con Netflix, Disney+, Amazon Prime y más. Incluye control remoto con reconocimiento de voz, 3 puertos HDMI y 2 USB. Procesador Quad-Core para una experiencia fluida.',
  precio: 7758.62,
  precioConIva: 8999.99,
  categoria: 'Electrónica',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_1c73e9bf8-1769041066680.png",
  stock: 8,
  destacado: true
},
{
  id: 'prod-002',
  sku: 'ELEC-AUD-BT-002',
  nombre: 'Audífonos Bluetooth Inalámbricos',
  descripcion:
  'Audífonos over-ear con cancelación activa de ruido (ANC). Batería de 30 horas de duración, carga rápida USB-C. Conectividad Bluetooth 5.2 con latencia ultrabaja. Plegables y con estuche de transporte incluido.',
  precio: 1379.31,
  precioConIva: 1599.99,
  categoria: 'Electrónica',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_158eac53e-1764700769229.png",
  stock: 23,
  nuevo: true
},
{
  id: 'prod-003',
  sku: 'ELEC-CEL-AND-003',
  nombre: 'Smartphone Android 6.7" 128GB',
  descripcion:
  'Teléfono inteligente con pantalla AMOLED de 6.7 pulgadas, procesador Octa-Core 2.8GHz, 8GB RAM y 128GB almacenamiento expandible. Cámara triple de 108MP + 12MP + 5MP. Batería 5000mAh con carga rápida 65W.',
  precio: 6896.55,
  precioConIva: 7999.99,
  categoria: 'Electrónica',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_17ebf1395-1764852870287.png",
  stock: 15,
  destacado: true
},
{
  id: 'prod-004',
  sku: 'ROPA-CAM-HOM-004',
  nombre: 'Camisa de Lino Manga Larga',
  descripcion:
  'Camisa casual de lino 100% para hombre. Corte regular, cuello italiano, botones de nácar. Disponible en talla S-XXL. Ideal para clima cálido, transpirable y fresca. Lavado a máquina permitido.',
  precio: 431.03,
  precioConIva: 499.99,
  categoria: 'Ropa y Accesorios',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_174d5306c-1772354892866.png",
  stock: 42
},
{
  id: 'prod-005',
  sku: 'ROPA-TEN-DEP-005',
  nombre: 'Tenis Deportivos Running',
  descripcion:
  'Calzado deportivo para running con suela de amortiguación EVA. Upper de malla transpirable, plantilla anatómica removible. Peso ultraligero 280g. Suela antideslizante para todo tipo de terreno.',
  precio: 1120.69,
  precioConIva: 1299.99,
  categoria: 'Ropa y Accesorios',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_1b03084cc-1773122128274.png",
  stock: 18,
  destacado: true
},
{
  id: 'prod-006',
  sku: 'ALIM-CAF-MEX-006',
  nombre: 'Café de Altura Chiapas 500g',
  descripcion:
  'Café de especialidad cultivado en las montañas de Chiapas a más de 1,400 msnm. Tostado medio, notas de chocolate amargo y frutos rojos. Molido para cafetera de goteo o prensa francesa. Certificado orgánico.',
  precio: 172.41,
  precioConIva: 199.99,
  categoria: 'Alimentos y Bebidas',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_10a3e1b94-1779194734791.png",
  stock: 67,
  nuevo: true
},
{
  id: 'prod-007',
  sku: 'ALIM-CHO-ARZ-007',
  nombre: 'Chocolate Artesanal Oaxaca 200g',
  descripcion:
  'Chocolate de mesa artesanal elaborado con cacao criollo de Oaxaca. Mezcla tradicional con canela, almendras y azúcar mascabado. Sin conservadores ni colorantes artificiales. Ideal para preparar champurrado y atole.',
  precio: 103.45,
  precioConIva: 119.99,
  categoria: 'Alimentos y Bebidas',
  imagen: "https://images.unsplash.com/photo-1643094264639-955fdb53cfc7",
  stock: 34
},
{
  id: 'prod-008',
  sku: 'HOG-LAMP-LED-008',
  nombre: 'Lámpara de Escritorio LED Táctil',
  descripcion:
  'Lámpara LED de escritorio con control táctil, 3 temperaturas de color (cálida, neutra, fría) y 5 niveles de brillo. Puerto USB-A para carga de dispositivos. Brazo articulado 360°. Consumo energético 12W.',
  precio: 517.24,
  precioConIva: 599.99,
  categoria: 'Hogar y Jardín',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7a14a69-1764656591353.png",
  stock: 11
},
{
  id: 'prod-009',
  sku: 'HOG-OLL-ACE-009',
  nombre: 'Olla de Presión 6L Acero Inoxidable',
  descripcion:
  'Olla de presión de acero inoxidable 18/10, capacidad 6 litros. Sistema de válvula de seguridad triple, tapa de cierre hermético. Compatible con todo tipo de cocinas incluyendo inducción. Garantía 5 años.',
  precio: 775.86,
  precioConIva: 899.99,
  categoria: 'Hogar y Jardín',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_17577e316-1770577989660.png",
  stock: 6
},
{
  id: 'prod-010',
  sku: 'DEP-YOGA-MAT-010',
  nombre: 'Mat de Yoga Antideslizante 6mm',
  descripcion:
  'Mat de yoga de TPE ecológico, grosor 6mm con excelente amortiguación. Superficie antideslizante en ambos lados. Incluye correa de carga. Dimensiones: 183 x 61 cm. Libre de PVC y látex.',
  precio: 344.83,
  precioConIva: 399.99,
  categoria: 'Deportes',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_199236f6b-1771716546805.png",
  stock: 29,
  nuevo: true
},
{
  id: 'prod-011',
  sku: 'DEP-BICI-CAS-011',
  nombre: 'Casco de Ciclismo Ventilado',
  descripcion:
  'Casco de ciclismo certificado CE/EN 1078. 21 ventilaciones para flujo de aire óptimo. Sistema de ajuste micro-ratchet. Visera desmontable. Talla M (54-58cm). Peso 260g. Disponible en varios colores.',
  precio: 603.45,
  precioConIva: 699.99,
  categoria: 'Deportes',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_14ee7f227-1768922940264.png",
  stock: 3
},
{
  id: 'prod-012',
  sku: 'SAL-CREM-HID-012',
  nombre: 'Crema Hidratante SPF 50+ 120ml',
  descripcion:
  'Crema facial hidratante con protección solar SPF 50+. Fórmula ligera no comedogénica, absorción rápida. Contiene ácido hialurónico, vitamina C y niacinamida. Dermatológicamente probada. Para todo tipo de piel.',
  precio: 258.62,
  precioConIva: 299.99,
  categoria: 'Salud y Belleza',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_1c6a91560-1773028191182.png",
  stock: 51,
  destacado: true
},
{
  id: 'prod-013',
  sku: 'SAL-VIT-COM-013',
  nombre: 'Vitaminas Complejo B + Vitamina C',
  descripcion:
  'Suplemento vitamínico con complejo B completo (B1, B2, B3, B5, B6, B7, B9, B12) más vitamina C 500mg. 60 tabletas de liberación prolongada. Apoya el sistema inmune y niveles de energía. Fabricado en México, registro COFEPRIS.',
  precio: 215.52,
  precioConIva: 249.99,
  categoria: 'Salud y Belleza',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5c31925-1764661114175.png",
  stock: 88
},
{
  id: 'prod-014',
  sku: 'JUG-LEGO-BLO-014',
  nombre: 'Set de Bloques de Construcción 500 pzas',
  descripcion:
  'Set de bloques de construcción compatibles con marcas reconocidas. 500 piezas en 12 colores diferentes. Incluye instrucciones para construir 6 modelos. Material ABS no tóxico. Para niños de 6+ años. Caja organizadora incluida.',
  precio: 431.03,
  precioConIva: 499.99,
  categoria: 'Juguetes',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_132f71b20-1767615501258.png",
  stock: 22,
  nuevo: true
},
{
  id: 'prod-015',
  sku: 'PAP-MOC-CUA-015',
  nombre: 'Mochila Escolar Ergonómica 25L',
  descripcion:
  'Mochila escolar con respaldo ergonómico acolchado y tirantes ajustables. Capacidad 25 litros, compartimento principal para laptop 15.6", bolsillo frontal organizador, 2 bolsillos laterales para botella. Material impermeable.',
  precio: 603.45,
  precioConIva: 699.99,
  categoria: 'Papelería',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_1feb5bd6e-1773357715270.png",
  stock: 14
},
{
  id: 'prod-016',
  sku: 'ELEC-TAB-AND-016',
  nombre: 'Tablet Android 10.1" 64GB WiFi',
  descripcion:
  'Tablet con pantalla IPS de 10.1 pulgadas Full HD, procesador Octa-Core, 4GB RAM, 64GB almacenamiento expandible hasta 256GB. Batería 7000mAh, doble cámara 8MP/5MP. Android 13, compatible con teclado Bluetooth.',
  precio: 3879.31,
  precioConIva: 4499.99,
  categoria: 'Electrónica',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_111562bf9-1779194734344.png",
  stock: 9
},
{
  id: 'prod-017',
  sku: 'HOG-ALF-VIN-017',
  nombre: 'Alfombra Vinílica Lavable 120x80cm',
  descripcion:
  'Alfombra de vinilo de alta resistencia, lavable con agua y jabón. Diseño geométrico moderno en tonos neutros. Antideslizante, resistente a manchas y humedad. Ideal para cocina, baño o entrada. Grosor 2mm.',
  precio: 387.93,
  precioConIva: 449.99,
  categoria: 'Hogar y Jardín',
  imagen: "https://img.rocket.new/generatedImages/rocket_gen_img_136f45488-1779194734520.png",
  stock: 0
}];


/* Función para obtener todas las categorías únicas */
export const obtenerCategorias = (): string[] => {
  const cats = [...new Set(productos.map((p) => p.categoria))];
  return ['Todos', ...cats];
};

/* Función para obtener producto por ID */
export const obtenerProductoPorId = (id: string): Producto | undefined =>
productos.find((p) => p.id === id);

/* Función para formatear precio en MXN */
export const formatearPrecioMXN = (precio: number): string =>
new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(precio);