import { Router, Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { ProductController } from "../controllers/product.controller";

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
    const product = await ProductController.getOne(req.params.id);
    res.json({ success: true, data: product });
  })
);

// POST /api/products/:id/like
productRouter.post("/:id/like", async (req: Request, res: Response) => {
  const result = await ProductController.like(req.params.id);
  res.json({ success: true, data: result });
});
