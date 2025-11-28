import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../utils/fetcher";
import { API_URL } from "../constants";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; image: string }) => {
      const res = await fetcher(`${API_URL}/products`, {
        method: "POST",
        body: data,
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
