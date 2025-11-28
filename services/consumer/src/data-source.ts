import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: "mongo8", // Nombre del servicio en docker-compose
  port: 27017, // Puerto interno del contenedor
  username: "admin",
  password: "adm1nP4s5M0ng0",
  database: "node-microservice-rabbit",
  authSource: "admin", // Para autenticación obligatoria en Mongo
  synchronize: true, // ⚠️ En producción ponlo en false
  logging: false,
  entities: [__dirname + "/entities/*.{js,ts}"],
});
