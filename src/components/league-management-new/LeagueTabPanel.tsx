
import { ReactNode } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const LeagueTabPanel = ({ children, value, index }: TabPanelProps) => {
  if (value !== index) {
    return null;
  }

  return (
    <div role="tabpanel" id={`league-tabpanel-${index}`} aria-labelledby={`league-tab-${index}`} className="py-6">
      {children}
    </div>
  );
};

export default LeagueTabPanel;
