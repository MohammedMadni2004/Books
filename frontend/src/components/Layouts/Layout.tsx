import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>
        Layout
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
