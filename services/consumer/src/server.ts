import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./middlewares/error.middleware";
import { productRouter } from "./routes/product.routes";
import { RabbitMQService } from "./services/rabbitmq.service";
import { initializeRabbitMQConsumers } from "./rabbitmq.consumers";
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];
const PORT_APP = process.env.PORT_APP || 8001;
const rabbitmqUri = process.env.RABBITMQ_URI;

if (!rabbitmqUri) {
  throw new Error("The enviroment varaible RABBITMQ_URI is not defined");
}

const app = express();
app.use(express.json());
app.use(cors({ origin: allowedOrigins }));

AppDataSource.initialize()
  .then(async () => {
    console.log("Conexión a la DB exitosa");

    await RabbitMQService.connect(rabbitmqUri);

    await initializeRabbitMQConsumers();

    app.use("/api/products", productRouter);

    // Middleware global de errores (al final)
    app.use(errorHandler);

    app.listen(PORT_APP, () => {
      console.log(
        `Servidor corriendo en el puerto http://localhost:${PORT_APP}/`
      );
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
