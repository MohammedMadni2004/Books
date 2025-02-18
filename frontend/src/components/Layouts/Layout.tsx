import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto py-8">
        <Outlet />
      </main>
    </div>
  );
}
