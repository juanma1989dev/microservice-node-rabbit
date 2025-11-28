import { createRootRoute, Outlet } from "@tanstack/react-router";
import MainMenu from "../components/main-menu";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-100 flex">
      <MainMenu />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  ),
});
