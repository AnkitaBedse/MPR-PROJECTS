import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">GSTFile</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="/chatbot" className="text-muted-foreground hover:text-foreground transition-colors">
              Chatbot
            </Link>
            <Link to="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link to="/info" className="text-muted-foreground hover:text-foreground transition-colors">
              Info
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/login")}
              className="text-muted-foreground hover:text-foreground"
            >
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-accent"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/chatbot"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Chatbot
              </Link>
              <Link
                to="/documentation"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link
                to="/info"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Info
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 px-4">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}