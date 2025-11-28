import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres15", // o tu host
  port: 5432,
  username: "admin",
  password: "adm1nP4s5#",
  database: "node-microservice-rabbit",
  synchronize: true, // ⚠ En producción = false
  logging: false,
  entities: [__dirname + "/entities/*.{ts,js}"],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
});
