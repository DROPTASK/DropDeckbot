
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";

const NewsDetail = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const { news } = useApp();
  const navigate = useNavigate();
  
  const newsItem = news.find(item => item.id === newsId);
  
  if (!newsItem) {
    return (
      <div className="text-center py-10">
        <p>News article not found</p>
        <Button variant="link" onClick={() => navigate("/news")}>
          Back to News
        </Button>
      </div>
    );
  }
  
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
        <h2 className="text-xl font-semibold">News</h2>
      </div>
      
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        <div className="h-48 bg-muted">
          <img 
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=News+Image";
            }}
          />
        </div>
        
        <div className="p-4">
          <div className="flex gap-2 mb-2">
            {newsItem.tags.map(tag => (
              <span 
                key={tag}
                className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{newsItem.title}</h1>
          <p className="text-sm text-muted-foreground mb-4">
            {format(new Date(newsItem.date), "MMMM d, yyyy")}
          </p>
          
          <div className="prose prose-sm max-w-none">
            <p className="mb-4">{newsItem.description}</p>
            <p>{newsItem.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
