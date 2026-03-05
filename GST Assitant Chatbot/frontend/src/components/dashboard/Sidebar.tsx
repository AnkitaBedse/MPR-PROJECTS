import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
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

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-card border-r border-border">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">GSTFile</span>
          </Link>
        </div>
        
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
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
          </nav>
          
          <div className="flex-shrink-0 p-2">
            <button className="group flex items-center w-full px-2 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-accent hover:text-foreground transition-colors">
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}