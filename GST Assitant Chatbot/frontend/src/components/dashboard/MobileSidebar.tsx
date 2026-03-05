import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Menu,
  X,
  Home, 
  Upload, 
  FileCheck, 
  MessageCircle, 
  User, 
  LogOut,
  FileText
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Upload Documents", href: "/dashboard/upload", icon: Upload },
  { name: "Filing Status", href: "/dashboard/status", icon: FileCheck },
  { name: "AI Assistant", href: "/dashboard/chat", icon: MessageCircle },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="md:hidden">
        <div className="flex items-center justify-between h-16 px-4 bg-card border-b border-border">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">GSTFile</span>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-card border-r border-border shadow-lg">
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <div className="bg-primary rounded-lg p-2">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">GSTFile</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
              
              <button className="group flex items-center w-full px-2 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-accent hover:text-foreground transition-colors mt-8">
                <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}