import { Router, Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";
import { RabbitMQService } from "../services/rabbitmq.service";
import { asyncHandler } from "../middlewares/async.middleware";

export const productRouter = Router();

// GET /api/products
productRouter.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const products = await ProductController.getAll();
    res.json({ success: true, data: products });
  })
);

// GET /api/products/:id
productRouter.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await ProductController.getById(id);
    if (!product) throw { status: 404, message: "Producto no encontrado" };
    res.json({ success: true, data: product });
  })
);

// POST /api/products
productRouter.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await ProductController.create(req.body);
    RabbitMQService.sendToQueue("micro:product_created", result);
    res.status(201).json({ success: true, data: result });
  })
);

// PUT /api/products/:id
productRouter.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await ProductController.update(id, req.body);
    RabbitMQService.sendToQueue("micro:product_updated", result);
    res.json({ success: true, data: result });
  })
);

// DELETE /api/products/:id
productRouter.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await ProductController.delete(id);
    RabbitMQService.sendToQueue("micro:product_deleted", { id });
    res.json({ success: true });
  })
);

// POST /api/products/:id/like
productRouter.post(
  "/:id/like",
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await ProductController.like(id);
    RabbitMQService.sendToQueue("micro:product_updated", result);
    res.json({ success: true, data: result });
  })
);
