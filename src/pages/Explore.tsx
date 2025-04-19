
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
      <Input
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
