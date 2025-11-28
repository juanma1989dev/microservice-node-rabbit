import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../utils/fetcher";
import type { Product } from "../types";
import { API_URL } from "../constants";

export function useProductById(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetcher<Product>(`${API_URL}/products/${id}`);
      return res.data;
    },
  });
}
