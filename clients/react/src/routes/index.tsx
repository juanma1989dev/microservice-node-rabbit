import { createFileRoute } from "@tanstack/react-router";
import ProductList from "../components/products/products-list";

export const Route = createFileRoute("/")({
  component: ProductList,
});
