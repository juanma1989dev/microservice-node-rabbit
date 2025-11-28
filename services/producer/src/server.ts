import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { productRouter } from "./routes/product.routes";
import { RabbitMQService } from "./services/rabbitmq.service";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5174"] }));

AppDataSource.initialize()
  .then(async () => {
    console.log("Conexión a la DB exitosa");

    await RabbitMQService.connect("amqp://admin:securepassword@rabbitmq:5672");

    app.use("/api/products", productRouter);

    // Middleware global de errores (al final)
    app.use(errorHandler);

    app.listen(5173, () => {
      console.log("Servidor corriendo en el puerto 5173");
    });

    process.on("beforeExit", async () => {
      await RabbitMQService.close();
    });
  })
  .catch((error) => console.error("Error al conectar DB:", error));
