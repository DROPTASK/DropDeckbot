
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "./context/AppContext";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Investment from "./pages/Investment";
import Explore from "./pages/Explore";
import ProjectDetails from "./pages/ProjectDetails";
import Statistics from "./pages/Statistics";
import Tasks from "./pages/Tasks";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/:projectId" element={<ProjectDetails />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:newsId" element={<NewsDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
