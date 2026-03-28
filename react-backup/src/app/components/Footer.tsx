import { Grid3x3, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Grid3x3 className="w-6 h-6" />
              <span className="text-xl font-medium">SimpleGrid</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              AI-Powered Real-Time Operations Platform for Physical Businesses. Designed for operators, powered by intelligence.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="mailto:hello@simplegrid.ai" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                hello@simplegrid.ai
              </a>
              <a href="tel:+919649933000" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +91 96499 33000
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>22nd Cross Road, 23rd Main Road,<br />HSR Layout, Bengaluru, Karnataka 560102</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 SimpleGrid. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/hiring" className="hover:text-foreground transition-colors">Hiring</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/company/simplegridai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}