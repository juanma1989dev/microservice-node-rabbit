import amqp from "amqplib";
import type { Channel, Connection } from "amqplib";

let channel: Channel | null = null;
let connection: Connection | null = null;

export const RabbitMQService = {
  connect: async (url: string): Promise<Channel> => {
    connection = (await amqp.connect(url)) as unknown as Connection;
    // @ts-ignore
    channel = await connection.createChannel();
    console.log("Conectado a RabbitMQ");
    return channel;
  },

  sendToQueue: (queue: string, message: any): void => {
    if (!channel) throw new Error("RabbitMQ no conectado");
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  },

  close: async (): Promise<void> => {
    if (channel) await channel.close();
    // @ts-ignore
    if (connection) await connection.close();
    console.log("RabbitMQ cerrado");
  },
};
