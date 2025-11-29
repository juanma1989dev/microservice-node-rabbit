import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { productRouter } from "./routes/product.routes";
import { RabbitMQService } from "./services/rabbitmq.service";
import { errorHandler } from "./middlewares/error.middleware";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];
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

    app.use("/api/products", productRouter);

    // Middleware global de errores (al final)
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en  http://localhost:${PORT}/`);
    });

    process.on("beforeExit", async () => {
      await RabbitMQService.close();
    });
  })
  .catch((error) => console.error("Error al conectar DB:", error));
