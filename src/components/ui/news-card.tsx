
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewsItem } from "@/context/AppContext";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  news: NewsItem;
  className?: string;
}

export function NewsCard({ news, className }: NewsCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div
      className={cn("news-card cursor-pointer", className)}
      onClick={() => navigate(`/news/${news.id}`)}
    >
      <div className="h-40 bg-muted relative overflow-hidden">
        {!imageError ? (
          <img 
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">Image not available</span>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex gap-1">
            {news.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="text-xs px-2 py-0.5 bg-black/30 text-white rounded-full"
              >
                {tag}
              </span>
            ))}
            {news.tags.length > 2 && (
              <span className="text-xs px-2 py-0.5 bg-black/30 text-white rounded-full">
                +{news.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium mb-1 line-clamp-2">{news.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{news.description}</p>
      </div>
    </div>
  );
}
