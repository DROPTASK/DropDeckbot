
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-16">
        <div className="container px-4 py-6 max-w-md mx-auto">
          <Outlet />
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
