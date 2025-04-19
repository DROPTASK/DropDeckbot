
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 border-b border-border flex items-center justify-between px-4">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-dropdeck-purple flex items-center justify-center text-white font-bold">
          D
        </div>
        <h1 className="text-lg font-semibold">DropDeck</h1>
      </Link>
      
      <button 
        onClick={() => setShowProfile(true)}
        className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
      >
        <User className="w-5 h-5" />
      </button>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4 py-2">
            <h2 className="text-xl font-bold text-center">About Owner</h2>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-dropdeck-purple/20 flex items-center justify-center">
                <User className="w-10 h-10 text-dropdeck-purple" />
              </div>
              <h3 className="font-medium">John Doe</h3>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Github
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
