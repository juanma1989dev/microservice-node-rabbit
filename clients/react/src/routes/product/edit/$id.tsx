import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useUpdateProduct } from "../../../hooks/useUpdateProduct";
import { useProductById } from "../../../hooks/useProductById";
import { useState } from "react";

export const Route = createFileRoute("/product/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id: idParam } = Route.useParams();
  const id = Number(idParam);

  const navigate = useNavigate();
  const updateProduct = useUpdateProduct();
  const { data: product, isLoading, error } = useProductById(id);

  const [form, setForm] = useState<{
    title: string | null;
    image: string | null;
  }>({
    title: null,
    image: null,
  });

  if (isLoading) return <div className="p-4">Cargando producto...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error cargando el producto</div>;
  if (!product) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct.mutate(
      {
        id,
        title: form.title ?? product.title,
        image: form.image ?? product.image,
      },
      { onSuccess: () => navigate({ to: "/" }) }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editando producto: {id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Texto</label>
          <input
            type="text"
            name="title"
            value={form.title ?? product.title ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Tipo de Imagen
          </label>
          <select
            name="image"
            value={form.image ?? product.image ?? ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Seleccione un tipo</option>
            <option value="countryside">Campo</option>
            <option value="city">Ciudad</option>
            <option value="village">Villa</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          💾 Guardar
        </button>
      </form>
    </div>
  );
}
