
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className={cn("transition-all duration-300", isMobile ? "pl-0" : "pl-64")}>
        <div className="container py-6 px-4 md:px-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
