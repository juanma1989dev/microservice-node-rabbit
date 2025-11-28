import { Link } from "@tanstack/react-router";

export default function MainMenu() {
  return (
    <aside className="w-64 bg-white shadow-md p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-600">
        Products - (emiter)
      </h2>
      <nav className="flex flex-col space-y-2">
        <Link
          to="/"
          className="text-left px-3 py-2 rounded-lg hover:bg-gray-200"
        >
          Products
        </Link>
      </nav>
    </aside>
  );
}
