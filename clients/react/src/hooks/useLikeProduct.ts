import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../utils/fetcher";
import { API_URL } from "../constants";

export function useLikePorduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetcher(`${API_URL}/products/${id}/like`, {
        method: "POST",
        body: { id },
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
