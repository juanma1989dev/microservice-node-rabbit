// import "reflect-metadata";
// import express from "express";
// import { Request, Response } from "express";
// import cors from "cors";
// import { AppDataSource } from "./data-source";
// import { Product } from "./entities/product";
// import amqplib from "amqplib/callback_api";

// const app = express();

// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:5174"],
//   })
// );

// AppDataSource.initialize()
//   .then((db) => {
//     const productRepositorty = db.getRepository(Product);

//     amqplib.connect(
//       "amqp://admin:securepassword@rabbitmq:5672",
//       (error0, connection) => {
//         if (error0) {
//           throw error0;
//         }

//         connection.createChannel((error, channel) => {
//           if (error) {
//             throw error;
//           }

//           //  Se le puede dar un orden ??????????? por id ???
//           app.get("/api/products/", async (req: Request, res: Response) => {
//             const products = await productRepositorty.find({
//               order: { id: "ASC" },
//             });
//             res.json(products);
//           });

//           app.get("/api/products/:id", async (req: Request, res: Response) => {
//             const id = Number(req.params.id);
//             const product = await productRepositorty.findOneBy({ id });
//             return res.send(product);
//           });

//           app.post("/api/products/", async (req: Request, res: Response) => {
//             const product = await productRepositorty.create(req.body);
//             const result = await productRepositorty.save(product);

//             channel.sendToQueue(
//               "micro:product_created",
//               Buffer.from(JSON.stringify(result))
//             );

//             return res.send(result);
//           });

//           app.put("/api/products/:id", async (req: Request, res: Response) => {
//             const id = Number(req.params.id);
//             const product = await productRepositorty.findOneBy({ id });
//             productRepositorty.merge(product, req.body);
//             const result = await productRepositorty.save(product);

//             channel.sendToQueue(
//               "micro:product_updated",
//               Buffer.from(JSON.stringify(result))
//             );

//             return res.send(result);
//           });

//           app.delete(
//             "/api/products/:id",
//             async (req: Request, res: Response) => {
//               const id = Number(req.params.id);
//               const result = await productRepositorty.delete(id);

//               channel.sendToQueue(
//                 "micro:product_deleted",
//                 Buffer.from(req.params.id)
//               );

//               return res.send(result);
//             }
//           );

//           app.post(
//             "/api/products/:id/like",
//             async (req: Request, res: Response) => {
//               const id = Number(req.params.id);
//               const product = await productRepositorty.findOneBy({ id });
//               product.likes++;
//               const result = await productRepositorty.save(product);

//               channel.sendToQueue(
//                 "micro:product_updated",
//                 Buffer.from(JSON.stringify(result))
//               );

//               return res.send(result);
//             }
//           );

//           app.listen(5173, () => {
//             console.log("Servidor corriendo en el puerto 5173");
//           });

//           process.on("beforeExit", () => {
//             console.log("closing");
//             connection.close();
//           });
//         });
//       }
//     );
//   })
//   .catch((error) => console.error("Error al conectar DB:", error));
