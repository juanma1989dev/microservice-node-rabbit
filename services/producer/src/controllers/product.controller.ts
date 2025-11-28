import { create } from "domain";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product";

const productRepositorty = AppDataSource.getRepository(Product);

export const ProductController = {
  getAll: async () => {
    return await productRepositorty.find({
      order: { id: "ASC" },
    });
  },

  getById: async (id: number) => {
    return productRepositorty.findOneBy({ id });
  },

  create: async (data: Partial<Product>) => {
    const product = productRepositorty.create(data);
    return await productRepositorty.save(product);
  },

  update: async (id: number, data: Partial<Product>) => {
    const product = await productRepositorty.findOneBy({ id });

    if (!product) throw new Error("Product not foud");

    productRepositorty.merge(product, data);

    return productRepositorty.save(product);
  },

  delete: async (id: number) => {
    return await productRepositorty.delete(id);
  },

  like: async (id: number) => {
    const product = await productRepositorty.findOneBy({ id });
    if (!product) throw new Error("Product not foud");

    product.likes++;

    return productRepositorty.save(product);
  },
};
