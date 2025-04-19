
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Tasks = () => {
  const { myProjects, tasks, addTask, updateTask, removeTask, taskCompletionRate } = useApp();
  const [newTasks, setNewTasks] = useState<Record<string, string>>({});
  
  // Get tasks grouped by project
  const tasksByProject = myProjects.map(project => {
    const projectTasks = tasks.filter(task => task.projectId === project.id);
    const completedCount = projectTasks.filter(task => task.completed).length;
    const completionRate = projectTasks.length > 0
      ? (completedCount / projectTasks.length) * 100
      : 0;
      
    return {
      project,
      tasks: projectTasks,
      completed: completedCount,
      total: projectTasks.length,
      completionRate
    };
  });
  
  const handleAddTask = (projectId: string) => {
    if (!newTasks[projectId] || newTasks[projectId].trim() === "") return;
    
    addTask({
      projectId,
      name: newTasks[projectId],
      completed: false
    });
    
    // Clear input
    setNewTasks({
      ...newTasks,
      [projectId]: ""
    });
  };
  
  const handleTaskChange = (taskId: string, completed: boolean) => {
    updateTask(taskId, { completed });
  };
  
  return (
    <div className="space-y-6 pb-6 animate-fade-in">
      <div className="bg-card p-4 rounded-lg border border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {tasks.filter(t => t.completed).length}/{tasks.length} completed
          </p>
        </div>
        <div className="w-20 h-20 relative">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="stroke-current text-muted stroke-2 fill-none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="stroke-current text-dropdeck-purple stroke-2 fill-none"
              strokeDasharray={`${taskCompletionRate}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text
              x="18"
              y="20.35"
              className="fill-current text-foreground text-xs font-medium text-center"
              textAnchor="middle"
            >
              {Math.round(taskCompletionRate)}%
            </text>
          </svg>
        </div>
      </div>
      
      {myProjects.length > 0 ? (
        <div className="space-y-6">
          {tasksByProject.map(({ project, tasks, completed, total, completionRate }) => (
            <div key={project.id} className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
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
                  <div className="flex-1">
                    <h3 className="font-medium">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      <Progress value={completionRate} className="h-2" />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {completed}/{total}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      className={cn(
                        "flex items-center justify-between p-2 rounded border",
                        task.completed 
                          ? "bg-muted border-muted" 
                          : "bg-card border-border"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={task.completed}
                          onCheckedChange={(checked) => 
                            handleTaskChange(task.id, checked as boolean)
                          }
                          id={task.id}
                        />
                        <label 
                          htmlFor={task.id}
                          className={cn(
                            "cursor-pointer",
                            task.completed && "line-through text-muted-foreground"
                          )}
                        >
                          {task.name}
                        </label>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 flex gap-2">
                  <Input
                    placeholder="Add new task..."
                    value={newTasks[project.id] || ""}
                    onChange={(e) => 
                      setNewTasks({
                        ...newTasks,
                        [project.id]: e.target.value
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTask(project.id);
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddTask(project.id)}
                    disabled={!newTasks[project.id] || newTasks[project.id].trim() === ""}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">No projects joined yet</p>
          <Button 
            variant="link" 
            className="text-dropdeck-purple"
            onClick={() => window.location.href = "/explore"}
          >
            Explore Projects
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
