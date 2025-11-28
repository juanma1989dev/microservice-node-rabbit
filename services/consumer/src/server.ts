import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./middlewares/error.middleware";
import { productRouter } from "./routes/product.routes";
import { RabbitMQService } from "./services/rabbitmq.service";
import { initializeRabbitMQConsumers } from "./rabbitmq.consumers";

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:4200", "http://localhost:5174"] }));

AppDataSource.initialize()
  .then(async () => {
    console.log("Conexión a la DB exitosa");

    await RabbitMQService.connect("amqp://admin:securepassword@rabbitmq:5672");

    await initializeRabbitMQConsumers();

    app.use("/api/products", productRouter);

    // Middleware global de errores (al final)
    app.use(errorHandler);

    app.listen(8001, () => {
      console.log("Servidor corriendo en el puerto 8001");
    });

    // Manejo de cierre graceful
    const gracefulShutdown = async () => {
      console.log("🔄 Cerrando conexiones...");
      await RabbitMQService.close();
      await AppDataSource.destroy();
      process.exit(0);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  })
  .catch((error) => console.error("Error al conectar DB:", error));
