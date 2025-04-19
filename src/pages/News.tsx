
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { NewsCard } from "@/components/ui/news-card";
import { cn } from "@/lib/utils";

const News = () => {
  const { news } = useApp();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(news.flatMap(item => item.tags))
  );
  
  // Filter news by selected tag
  const filteredNews = selectedTag
    ? news.filter(item => item.tags.includes(selectedTag))
    : news;
  
  return (
    <div className="space-y-6 pb-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-medium mb-4">News & Announcements</h2>
        
        <div className="flex items-center gap-2 overflow-x-auto py-2 mb-4 -mx-4 px-4">
          <button
            className={cn(
              "px-3 py-1 rounded-full text-sm whitespace-nowrap",
              selectedTag === null
                ? "bg-dropdeck-purple text-white"
                : "bg-secondary text-secondary-foreground"
            )}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={cn(
                "px-3 py-1 rounded-full text-sm whitespace-nowrap",
                selectedTag === tag
                  ? "bg-dropdeck-purple text-white"
                  : "bg-secondary text-secondary-foreground"
              )}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredNews.map(item => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
        
        {filteredNews.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No news found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
