
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Edit, ArrowLeft } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LeagueManagementHeaderProps {
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  handleAddMatchOpen: () => void;
  handleEditLeagueOpen: () => void;
}

const LeagueManagementHeader = ({
  selectedLeague,
  setSelectedLeague,
  handleAddMatchOpen,
  handleEditLeagueOpen,
}: LeagueManagementHeaderProps) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">League Management</h1>
        
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="w-full">
        <Select
          value={selectedLeague}
          onValueChange={setSelectedLeague}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select League" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="premier">Premier League</SelectItem>
            <SelectItem value="championship">Championship</SelectItem>
            <SelectItem value="league1">League One</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          onClick={handleAddMatchOpen}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Match
        </Button>
        
        <Button 
          onClick={handleEditLeagueOpen}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit League Settings
        </Button>
      </div>
    </div>
  );
};

export default LeagueManagementHeader;
