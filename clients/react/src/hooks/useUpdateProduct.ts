import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../utils/fetcher";
import type { Product } from "../types";
import { API_URL } from "../constants";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; title: string; image: string }) => {
      const res = await fetcher<Product>(`${API_URL}/products/${data.id}`, {
        method: "PUT",
        body: {
          title: data.title,
          image: data.image,
        },
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
