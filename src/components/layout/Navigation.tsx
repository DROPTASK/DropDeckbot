
import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, Compass, BarChart2, ListTodo, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, path: "/", label: "Dashboard" },
    { icon: TrendingUp, path: "/investment", label: "Investment" },
    { icon: Compass, path: "/explore", label: "Explore" },
    { icon: BarChart2, path: "/statistics", label: "Statistics" },
    { icon: ListTodo, path: "/tasks", label: "Tasks" },
    { icon: Newspaper, path: "/news", label: "News" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-t border-border z-40">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center w-14 h-full"
            aria-label={item.label}
          >
            <item.icon 
              className={cn(
                "nav-icon",
                location.pathname === item.path && "active"
              )}
            />
            <span className="text-xs mt-1 text-muted-foreground">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
