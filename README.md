# Microservice Node Rabbit

Este proyecto es una implementación de una arquitectura de microservicios orientada a eventos, utilizando Node.js, RabbitMQ, PostgreSQL y MongoDB.

## Estructura del Proyecto

El proyecto está organizado como un monorepo (pnpm workspace) con la siguiente estructura:

- **services/**: Contiene los servicios backend.
  - **producer**: Servicio encargado de recibir peticiones HTTP, persistir datos en PostgreSQL y enviar mensajes a RabbitMQ.
  - **consumer**: Servicio encargado de consumir mensajes de RabbitMQ y persistir datos en MongoDB.
- **clients/**: Contiene las aplicaciones frontend.
  - **angular**: Cliente desarrollado en Angular.
  - **react**: Cliente desarrollado en React.

## Tecnologías

- **Backend**: Node.js, Express, TypeORM.
- **Mensajería**: RabbitMQ (amqplib).
- **Base de Datos**: PostgreSQL (Producer), MongoDB (Consumer).
- **Frontend**: Angular, React.
- **Gestor de Paquetes**: pnpm.

## Requisitos Previos

Asegúrate de tener instalado y en ejecución lo siguiente:

- [Node.js](https://nodejs.org/) (v22 recomendado)
- [pnpm](https://pnpm.io/)
- [RabbitMQ](https://www.rabbitmq.com/) (Puerto 5672)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)

> **Nota**: Los servicios están configurados actualmente para conectar a `rabbitmq` como host (común en entornos Docker). Si ejecutas localmente, asegúrate de ajustar las cadenas de conexión en `src/server.ts` o configurar tu `/etc/hosts`.

## Instalación

Instala las dependencias desde la raíz del proyecto:

```bash
pnpm install
```

## Ejecución

### Servicios Backend

Para iniciar los servicios en modo desarrollo:

**Producer Service** (Puerto 5173):
```bash
cd services/producer
pnpm dev
```

**Consumer Service** (Puerto 8001):
```bash
cd services/consumer
pnpm dev
```

### Clientes Frontend

**React Client**:
```bash
cd clients/react
pnpm dev
```

**Angular Client**:
```bash
cd clients/angular
pnpm start
```

## Configuración

Actualmente, las configuraciones de conexión (DB, RabbitMQ) se encuentran en los archivos `src/server.ts` de cada servicio. Se recomienda migrar estas configuraciones a variables de entorno (`.env`) para mayor seguridad y flexibilidad.

- **RabbitMQ**: `amqp://admin:securepassword@rabbitmq:5672`
- **CORS**: Configurado para aceptar peticiones desde `localhost:3000`, `localhost:5174`, `localhost:4200`.
