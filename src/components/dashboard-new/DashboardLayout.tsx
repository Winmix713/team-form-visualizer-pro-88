
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  header: ReactNode;
  mainContent: ReactNode;
  sidebarContent: ReactNode;
  featuredSection?: ReactNode;
}

const DashboardLayout = ({
  header,
  mainContent,
  sidebarContent,
  featuredSection
}: DashboardLayoutProps) => {
  return (
    <div className="container mx-auto px-4">
      {header}
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          {mainContent}
        </div>
        
        <div className="md:col-span-4">
          {sidebarContent}
        </div>
      </div>
      
      {featuredSection}
    </div>
  );
};

export default DashboardLayout;
