import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useLikePorduct } from "../../hooks/useLikeProduct";
import type { Product } from "../../types";

interface ProductProps {
  product: Product;
  onDelete: () => void;
}

export default function ProductCard({ product, onDelete }: ProductProps) {
  const likeProduct = useLikePorduct();

  const handleDeleteClick = () => {
    const confirmed = confirm(
      `¿Estás seguro de eliminar el producto "${product.title}"?`
    );
    if (!confirmed) return;

    onDelete();
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex flex-col relative">
      <span className="right-3 absolute top-3 flex justify-center">
        {product.likes} Likes
        <Heart
          className={`h-5 w-5 ml-3 cursor-pointer ${
            product.likes > 0 ? "text-red-500" : "text-gray-400"
          }`}
          onClick={() => likeProduct.mutate(product.id)}
        />
      </span>

      <h3 className="text-xl font-semibold mb-3 mt-5">{product.title}</h3>

      {/* Imagen del producto */}
      <div className="w-full h-52 overflow-hidden rounded-lg mb-4 bg-gray-100">
        <img
          src={`/images/${product.image}.webp`}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <Link
        className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-center"
        to={`/product/edit/$id`}
        params={{ id: product.id.toString() }}
      >
        View Details
      </Link>

      <button
        className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
}
