# Microservices with Node.js, RabbitMQ, Angular & React

Este proyecto es una implementación robusta de una arquitectura de microservicios utilizando el patrón Productor/Consumidor para el procesamiento asíncrono de tareas. Demuestra la integración de múltiples tecnologías modernas para construir un sistema escalable y desacoplado.

## 🚀 Arquitectura del Proyecto

El sistema se compone de dos servicios principales y dos clientes frontend, comunicándose a través de RabbitMQ:

1.  **Producer Service (Node.js/Express/PostgreSQL):** Recibe solicitudes HTTP, persiste datos transaccionales en PostgreSQL y publica eventos en RabbitMQ.
2.  **Consumer Service (Node.js/Express/MongoDB):** Escucha eventos de RabbitMQ, procesa la información y almacena los resultados desnormalizados en MongoDB para consultas rápidas.
3.  **Clientes Frontend:**
    -   **Angular 19:** Panel de administración robusto.
    -   **React 19:** Interfaz de usuario ligera y rápida.

## 💡 Habilidades y Competencias Adquiridas

El desarrollo de este proyecto consolidó conocimientos clave en ingeniería de software moderna:

*   **Arquitectura de Microservicios:** Diseño e implementación de servicios independientes y desacoplados, mejorando la mantenibilidad y escalabilidad.
*   **Comunicación Orientada a Eventos:** Implementación de patrones de mensajería asíncrona con **RabbitMQ** para garantizar la resiliencia y el desacoplamiento entre servicios.
*   **Persistencia Políglota:** Gestión eficiente de datos utilizando lo mejor de ambos mundos: **PostgreSQL** (TypeORM) para integridad relacional y **MongoDB** (Mongoose) para flexibilidad y velocidad en lectura.
*   **Desarrollo Frontend Moderno:** Dominio de los frameworks más demandados (**Angular 19** y **React 19**), implementando interfaces reactivas y optimizadas con **TailwindCSS**.
*   **Type Safety Full-Stack:** Uso extensivo de **TypeScript** tanto en backend como en frontend para reducir errores en tiempo de ejecución y mejorar la experiencia de desarrollo.
*   **Contenerización y Orquestación:** (Opcional: si usaste Docker) Configuración de entornos de desarrollo reproducibles.

## 🛠️ Tech Stack

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Lenguaje:** TypeScript
*   **Bases de Datos:** PostgreSQL, MongoDB
*   **Mensajería:** RabbitMQ (amqplib)
*   **ORM/ODM:** TypeORM, Mongoose

### Frontend
*   **Frameworks:** Angular 19, React 19
*   **Build Tool:** Vite
*   **Estilos:** TailwindCSS
*   **Lenguaje:** TypeScript

## 🏁 Comenzando

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos
*   Node.js (v22 o superior)
*   pnpm
*   Instancias de RabbitMQ, PostgreSQL y MongoDB corriendo (localmente o vía Docker).

### Instalación y Ejecución

#### 1. Servicios Backend

**Producer:**
```bash
cd services/producer
pnpm install
# Configura tus variables de entorno en .env
pnpm run dev
```

**Consumer:**
```bash
cd services/consumer
pnpm install
# Configura tus variables de entorno en .env
pnpm run dev
```

#### 2. Clientes Frontend

**Angular Client:**
```bash
cd clients/angular
pnpm install
pnpm start
```

**React Client:**
```bash
cd clients/react
pnpm install
pnpm run dev
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para mejoras.
