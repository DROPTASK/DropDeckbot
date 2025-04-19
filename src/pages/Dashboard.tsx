
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { StatCard } from "@/components/ui/stat-card";
import { ProjectCard } from "@/components/ui/project-card";
import { NewsCard } from "@/components/ui/news-card";
import { Wallet, LineChart, ListChecks, Target } from "lucide-react";

const Dashboard = () => {
  const { 
    myProjects, 
    projects, 
    news, 
    totalInvestment, 
    totalEarnings, 
    tasks,
    taskCompletionRate
  } = useApp();
  
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const displayProjects = showAllProjects ? projects : projects.slice(0, 5);
  const completedTasks = tasks.filter(t => t.completed).length;
  
  return (
    <div className="space-y-6 pb-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          title="Total Investment" 
          value={`$${totalInvestment.toFixed(2)}`}
          icon={<Wallet className="w-4 h-4" />}
          className="bg-dropdeck-blue/30"
        />
        <StatCard 
          title="Total Earnings" 
          value={`$${totalEarnings.toFixed(2)}`}
          icon={<LineChart className="w-4 h-4" />}
          className="bg-dropdeck-green/30"
        />
        <StatCard 
          title="Projects Joined" 
          value={`${myProjects.length}/${projects.length}`}
          icon={<Target className="w-4 h-4" />}
          className="bg-dropdeck-peach/30"
        />
        <StatCard 
          title="Tasks Completed" 
          value={`${completedTasks}/${tasks.length}`}
          icon={<ListChecks className="w-4 h-4" />}
          className="bg-dropdeck-pink/30"
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">My Projects</h2>
          <button 
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="text-sm text-dropdeck-purple font-medium"
          >
            {showAllProjects ? "Hot Projects" : "All Projects"}
          </button>
        </div>
        
        {myProjects.length > 0 ? (
          <div className="space-y-3">
            {myProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No projects joined yet</p>
            <button
              onClick={() => setShowAllProjects(true)}
              className="text-dropdeck-purple font-medium mt-2"
            >
              Explore Projects
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Latest News</h2>
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex gap-4 pb-2" style={{ minWidth: "max-content" }}>
            {news.map((item) => (
              <div key={item.id} style={{ width: "280px", flexShrink: 0 }}>
                <NewsCard news={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
