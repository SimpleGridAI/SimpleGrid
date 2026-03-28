import { Grid3x3 } from "lucide-react";
import { Link } from "react-router";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Grid3x3 className="w-6 h-6" />
            <span className="text-xl font-medium">SimpleGrid</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a href="/#problem" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              The Problem
            </a>
            <a href="/#approach" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How SimpleGrid Works
            </a>
            <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              The Solution
            </a>
            <Link to="/hiring" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Hiring
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}