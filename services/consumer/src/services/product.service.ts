import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product";
import axios from "axios";

const repository = AppDataSource.getMongoRepository(Product);
const URL_SERVICE_MAIN_SERVICE = process.env.URL_MAIN_SERVICE;

export const ProductService = {
  getAll: async () => {
    const products = await repository.find({
      order: { id: "ASC" },
    });
    return products;
  },

  getOne: async (id: string) => {
    const product = await repository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  },

  create: async (data: Partial<Product>) => {
    const product = new Product();
    product.admin_id = Number(data.id);
    product.title = data.title;
    product.image = data.image;
    product.likes = data.likes || 0;

    await repository.save(product);
    return product;
  },

  update: async (data: Partial<Product>) => {
    const result = await repository.updateOne(
      { admin_id: Number(data.id) },
      {
        $set: {
          title: data.title,
          image: data.image,
          likes: data.likes,
        },
      }
    );
    return result;
  },

  deleted: async (id: number) => {
    const result = await repository.deleteOne({ admin_id: id });
    return result;
  },

  like: async (id: string) => {
    const product = await repository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Notificar al microservicio admin sobre el like
    try {
      await axios.post(
        `${URL_SERVICE_MAIN_SERVICE}/${product.admin_id}/like`,
        {}
      );
    } catch (error) {
      console.error("Error al notificar like al microservicio admin:", error);
      throw new Error("Error al sincronizar like con admin");
    }

    product.likes++;
    return repository.save(product);
  },
};
