
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart, 
  Briefcase, 
  FileText, 
  Home, 
  Menu, 
  Users, 
  X,
  Settings
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Briefcase, label: 'Ofertas de Empleo', path: '/jobs' },
  { icon: FileText, label: 'Currículums', path: '/resumes' },
  { icon: Users, label: 'Candidatos', path: '/candidates' },
  { icon: BarChart, label: 'Reportes', path: '/reports' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  if (isMobile && !isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300",
        isMobile && !isOpen && "-translate-x-full",
        isMobile && isOpen && "translate-x-0"
      )}
    >
      <div className="flex items-center h-16 px-6">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-candidify-primary to-candidify-accent rounded-lg w-8 h-8"></div>
          <span className="text-xl font-bold text-foreground">Candidify</span>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <Separator className="bg-sidebar-border" />
      
      <div className="flex-1 overflow-auto p-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <Link
          to="/settings"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            location.pathname === "/settings"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Configuración</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
