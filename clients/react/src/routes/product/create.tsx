import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCreateProduct } from "../../hooks/useCreateProduct";

export const Route = createFileRoute("/product/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [form, setForm] = useState({
    title: "",
    image: "",
  });

  const createProduct = useCreateProduct();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProduct.mutate(form, {
      onSuccess: () => {
        setForm({ title: "", image: "" });
        navigate({ to: "/" });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto space-y-5"
    >
      <h2 className="text-2xl font-bold">Formulario de Imagen</h2>

      {/* Input de Texto */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Texto</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingresa un texto..."
          required
        />
      </div>

      {/* Select */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Tipo de Imagen</label>
        <select
          name="image"
          value={form.image}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Selecciona un tipo...{" "}
          </option>
          <option value="countryside">Campo</option>
          <option value="city">Ciudad</option>
          <option value="village">Villa</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Guardar
      </button>
    </form>
  );
}
