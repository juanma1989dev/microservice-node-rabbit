import { ProductService } from "../services/product.service";

export const ProductController = {
  getAll: async () => {
    return ProductService.getAll();
  },

  getOne: async (id: string) => {
    return ProductService.getOne(id);
  },

  like: async (id: string) => {
    return ProductService.like(id);
  },
};
