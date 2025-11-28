import type { ConsumeMessage } from "amqplib";
import { RabbitMQService } from "../services/rabbitmq.service";

export const createConsumerRabbitMq = async (
  queueName: string,
  handler: (data: any) => Promise<any>,
  successMessage: string
) => {
  const channel = RabbitMQService.getChannel();

  await channel.assertQueue(queueName, { durable: false });

  channel.consume(
    queueName,
    async (msg: ConsumeMessage | null) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());
        await handler(data);
        console.log(`✅ ${successMessage}`);
      } catch (error) {
        console.error(`❌ Error en ${queueName}:`, error);
      }
    },
    { noAck: true }
  );
};
