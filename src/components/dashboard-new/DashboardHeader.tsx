
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DashboardHeaderProps {
  searchQuery: string;
  filter: string;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: string) => void;
}

const DashboardHeader = ({
  searchQuery,
  filter,
  setSearchQuery,
  setFilter
}: DashboardHeaderProps) => {
  return (
    <div className="py-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Team Management Dashboard</h1>
        
        <Button
          variant="outline"
          className="flex items-center gap-2"
          asChild
        >
          <Link to="/league-management">
            <Settings className="h-4 w-4" />
            League Management
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="md:col-span-7">
          <Select
            value={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="premier">Premier League</SelectItem>
              <SelectItem value="championship">Championship</SelectItem>
              <SelectItem value="league1">League One</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
