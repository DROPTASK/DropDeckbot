
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, PlusCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, joinProject, leaveProject, toggleFavorite } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="text-center py-10">
        <p>Project not found</p>
        <Button variant="link" onClick={() => navigate("/explore")}>
          Back to Explore
        </Button>
      </div>
    );
  }
  
  const handleJoinProject = () => {
    joinProject(project.id);
    toast({
      title: "Project joined",
      description: `You have joined ${project.name}`,
    });
  };
  
  const handleLeaveProject = () => {
    leaveProject(project.id);
    toast({
      title: "Project left",
      description: `You have left ${project.name}`,
    });
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite(project.id);
    toast({
      title: project.favorite ? "Removed from favorites" : "Added to favorites",
      description: `${project.name} has been ${project.favorite ? "removed from" : "added to"} your favorites`,
    });
  };
  
  const handleExternalLink = () => {
    if (project.externalLink) {
      window.open(project.externalLink, "_blank");
    }
  };
  
  return (
    <div className="space-y-6 pb-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-xl font-semibold">Project Details</h2>
      </div>
      
      <div className={cn(
        "rounded-2xl overflow-hidden border border-border",
        "relative"
      )}>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br",
          project.joined 
            ? "from-dropdeck-purple/20 to-dropdeck-purple/5" 
            : "from-card to-secondary/50"
        )} />
        
        <div className="relative p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-card border-2 border-border flex items-center justify-center overflow-hidden">
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
          
          <h1 className="text-2xl font-bold mt-4">{project.name}</h1>
          
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {project.tge && (
            <div className="bg-card p-3 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">TGE</p>
              <p className="font-medium">{project.tge}</p>
            </div>
          )}
          
          {project.funding && (
            <div className="bg-card p-3 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Funding</p>
              <p className="font-medium">{project.funding}</p>
            </div>
          )}
          
          {project.reward && (
            <div className="bg-card p-3 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Reward</p>
              <p className="font-medium">{project.reward}</p>
            </div>
          )}
          
          {project.type && (
            <div className="bg-card p-3 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{project.type}</p>
            </div>
          )}
        </div>
        
        <div className="bg-card p-4 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">Description</p>
          <p>{project.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button 
          variant="outline" 
          className={cn(
            "flex items-center gap-2",
            project.favorite ? "bg-dropdeck-pink/20 border-dropdeck-pink/30" : ""
          )}
          onClick={handleToggleFavorite}
        >
          <Heart className={cn(
            "h-4 w-4",
            project.favorite ? "fill-red-500 text-red-500" : ""
          )} />
          <span>Favorite</span>
        </Button>
        
        <Button 
          variant="outline"
          className={cn(
            "flex items-center gap-2",
            project.joined ? "bg-dropdeck-purple/20 border-dropdeck-purple/30" : ""
          )}
          onClick={project.joined ? handleLeaveProject : handleJoinProject}
        >
          <PlusCircle className="h-4 w-4" />
          <span>{project.joined ? "Leave" : "Join"}</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleExternalLink}
          disabled={!project.externalLink}
        >
          <ExternalLink className="h-4 w-4" />
          <span>Open</span>
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetails;
