
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Project } from "@/context/AppContext";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  showJoinedBadge?: boolean;
}

export function ProjectCard({ project, className, showJoinedBadge = true }: ProjectCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div
      className={cn("project-card flex items-center cursor-pointer", className)}
      onClick={() => navigate(`/explore/${project.id}`)}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center flex-shrink-0 mr-3">
        {!imageError ? (
          <img 
            src={project.logo}
            alt={project.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <span className="text-xl font-bold text-muted-foreground">
            {project.name.charAt(0)}
          </span>
        )}
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground truncate">{project.name}</h3>
          {showJoinedBadge && project.joined && (
            <span className="text-xs px-2 py-0.5 bg-dropdeck-purple/20 text-dropdeck-purple rounded-full">
              Joined
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{project.description}</p>
      </div>
      
      <ChevronRight className="w-4 h-4 text-muted-foreground ml-2" />
    </div>
  );
}
