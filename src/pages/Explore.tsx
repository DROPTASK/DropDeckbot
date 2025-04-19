
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/ui/project-card";
import { Input } from "@/components/ui/input";

const Explore = () => {
  const { projects } = useApp();
  const [search, setSearch] = useState("");
  
  // Filter projects based on search term
  const filteredProjects = projects.filter(
    project => project.name.toLowerCase().includes(search.toLowerCase()) || 
              project.description.toLowerCase().includes(search.toLowerCase()) ||
              project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );
  
  return (
    <div className="space-y-6 pb-6 animate-fade-in">
      <div>
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className={cn(
              "rounded-2xl overflow-hidden border border-border",
              "h-44 relative"
            )}>
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br",
                project.joined 
                  ? "from-dropdeck-purple/20 to-dropdeck-purple/5" 
                  : "from-card to-secondary/50"
              )} />
              
              <div className="relative h-full p-4 flex flex-col items-center justify-between">
                <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center overflow-hidden">
                  <img 
                    src={project.logo} 
                    alt={project.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/200?text=" + project.name.charAt(0);
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="font-medium text-lg">{project.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2 justify-center">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
