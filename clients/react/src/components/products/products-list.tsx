import ProductCard from "./product-card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../../types";
import { Link } from "@tanstack/react-router";
import { fetcher } from "../../utils/fetcher";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { API_URL } from "../../constants";

const fetchProducts = async function (): Promise<Product[]> {
  const response = await fetcher<Product[]>(`${API_URL}/products`);
  return response.data;
};

export default function ProductList() {
  const { error, isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteProduct = useDeleteProduct();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 flex justify-between items-center text-gray-600">
        Product List
        <Link
          to="/product/create"
          className="text-blue-600 hover:underline text-sm font-semibold ml-2 "
        >
          Add product
        </Link>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data ?? []).map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={() => deleteProduct.mutate(product.id)}
          />
        ))}
      </div>
    </>
  );
}
