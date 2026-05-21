# POSMART

Sistema web de Punto de Venta (POS) desarrollado con tecnologías modernas para la venta de productos de manera rápida, intuitiva y eficiente.

---

# Descripción

POSMART es una aplicación web enfocada en la gestión de ventas y productos mediante una interfaz moderna y fácil de utilizar. El sistema permite visualizar productos organizados por categorías, consultar detalles de cada producto y agregarlos a un carrito de compras para generar una venta.

El proyecto fue desarrollado con un enfoque modular y escalable, utilizando herramientas modernas del ecosistema JavaScript.

---

# Características principales

* Catálogo de productos.
* Organización de productos por categorías.
* Visualización detallada de productos.
* Carrito de compras dinámico.
* Cálculo automático de totales.
* Interfaz moderna y responsiva.
* Gestión de estado global.
* Navegación rápida entre vistas.
* Arquitectura escalable.
* Diseño adaptable a distintos dispositivos.

---

# Tecnologías utilizadas

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Zustand

## Herramientas de desarrollo

* Node.js
* npm
* ESLint
* Git
* GitHub

---

# Arquitectura del proyecto

El sistema fue construido siguiendo una estructura organizada por componentes y módulos para facilitar el mantenimiento y escalabilidad del proyecto.

## Estructura general

```bash
posmart/
│
├── app/
├── components/
├── store/
├── public/
├── styles/
├── types/
├── hooks/
├── utils/
├── package.json
└── tsconfig.json
```

## Descripción de carpetas

### app/

Contiene las rutas principales de la aplicación utilizando App Router de Next.js.

### components/

Incluye los componentes reutilizables de la interfaz, como tarjetas de productos, botones, modales y elementos visuales.

### store/

Gestiona el estado global de la aplicación mediante Zustand.

### public/

Almacena imágenes, íconos y recursos estáticos.

### styles/

Contiene estilos globales y configuraciones visuales.

### types/

Define interfaces y tipos de TypeScript utilizados en el proyecto.

### hooks/

Incluye hooks personalizados para reutilizar lógica dentro del sistema.

### utils/

Contiene funciones auxiliares y lógica reutilizable.

---

# Funcionalidades del sistema

## Catálogo de productos

El sistema permite mostrar un listado de productos con:

* Imagen
* Nombre
* Precio
* Categoría
* Descripción

Los productos se muestran mediante tarjetas dinámicas que facilitan la visualización.

---

## Filtrado por categorías

Los usuarios pueden filtrar productos según su categoría para mejorar la experiencia de búsqueda.

Ejemplos:

* Bebidas
* Snacks
* Electrónica
* Papelería
* Limpieza

---

## Vista de detalle

Cada producto cuenta con una vista individual donde se muestra información más detallada:

* Imagen ampliada
* Descripción completa
* Precio
* Categoría
* Botón para agregar al carrito

---

## Carrito de compras

El carrito permite:

* Agregar productos
* Eliminar productos
* Modificar cantidades
* Visualizar subtotal
* Visualizar total general

Toda la información del carrito se actualiza dinámicamente.

---

# Gestión de estado con Zustand

El sistema utiliza Zustand para administrar el estado global.

Esto permite:

* Compartir información entre componentes.
* Mantener sincronizado el carrito.
* Evitar prop drilling.
* Mejorar la organización del código.

Ejemplo:

```ts
import { create } from 'zustand'

interface CartState {
  items: Product[]
  addItem: (product: Product) => void
}
```

---

# Diseño responsivo

La interfaz fue diseñada para adaptarse a distintos tamaños de pantalla:

* Computadoras
* Tablets
* Dispositivos móviles

Tailwind CSS permite crear una experiencia visual moderna y adaptable.

---

# Instalación del proyecto

## Clonar repositorio

```bash
git clone https://github.com/nroquev-dev/posmart.git
```

## Entrar al proyecto

```bash
cd posmart
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

---

# Scripts disponibles

## Ejecutar servidor de desarrollo

```bash
npm run dev
```

## Generar build de producción

```bash
npm run build
```

## Ejecutar producción

```bash
npm start
```

## Ejecutar lint

```bash
npm run lint
```

---

# Flujo del sistema

1. El usuario visualiza el catálogo de productos.
2. Selecciona una categoría.
3. Consulta el detalle del producto.
4. Agrega productos al carrito.
5. El sistema calcula automáticamente el total.
6. El usuario puede modificar cantidades o eliminar productos.

---

# Objetivos del proyecto

* Desarrollar un sistema POS moderno.
* Aplicar buenas prácticas de desarrollo.
* Implementar una arquitectura escalable.
* Utilizar tecnologías modernas del ecosistema React.
* Mejorar la experiencia del usuario.
* Facilitar futuras ampliaciones del sistema.

---

# Posibles mejoras futuras

* Integración con base de datos.
* Sistema de autenticación.
* Generación de tickets.
* Integración con métodos de pago.
* Panel administrativo.
* Control de inventario.
* Reportes de ventas.
* Gestión de usuarios y roles.
* Historial de ventas.
* Integración con APIs externas.

---

# Buenas prácticas implementadas

* Componentes reutilizables.
* Código modular.
* Uso de TypeScript para tipado.
* Separación de responsabilidades.
* Manejo centralizado de estado.
* Organización clara de carpetas.
* Diseño responsivo.

---

# Capturas del sistema

Aquí puedes agregar imágenes del sistema:

```bash
/public/capturas/
```

Ejemplo:

```md
![Inicio](./public/capturas/inicio.png)
```

---

# Autor

Desarrollado por Nertamid Roque

---

# Licencia

Este proyecto es de uso educativo y demostrativo.

