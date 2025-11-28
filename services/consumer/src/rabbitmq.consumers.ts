import { Product } from "./entities/product";
import { ProductService } from "./services/product.service";
import { createConsumerRabbitMq } from "./utils/createConsumerRabbitMq";

export const initializeRabbitMQConsumers = async () => {
  await createConsumerRabbitMq(
    "micro:product_created",
    (data: Product) => ProductService.create(data),
    "Producto creado"
  );

  await createConsumerRabbitMq(
    "micro:product_updated",
    (data: Product) => ProductService.update(data),
    "Producto actualizado"
  );

  await createConsumerRabbitMq(
    "micro:product_deleted",
    (data: { id: number }) => ProductService.deleted(data.id),
    "Producto eliminado"
  );

  console.log("🐰 Consumidores de RabbitMQ iniciados");
};
