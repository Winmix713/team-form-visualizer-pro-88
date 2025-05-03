
import { Team, Match } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getHungarianTeamName } from '@/data/teamsData';

interface AddMatchDialogProps {
  open: boolean;
  onClose: () => void;
  selectedLeague: string;
  teams: Team[];
  newMatch: Partial<Match>;
  handleMatchChange: (field: keyof Match, value: any) => void;
  handleAddMatch: () => void;
}

const AddMatchDialog = ({
  open,
  onClose,
  selectedLeague,
  teams,
  newMatch,
  handleMatchChange,
  handleAddMatch,
}: AddMatchDialogProps) => {
  const filteredTeams = teams.filter((team) => team.category === selectedLeague);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Match</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="match-date">Date</Label>
            <Input
              id="match-date"
              type="date"
              value={newMatch.date}
              onChange={(e) => handleMatchChange('date', e.target.value)}
            />
          </div>
          
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="home-team">Home Team</Label>
            <Select 
              value={newMatch.homeTeamId} 
              onValueChange={(value) => handleMatchChange('homeTeamId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select home team" />
              </SelectTrigger>
              <SelectContent>
                {filteredTeams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {getHungarianTeamName(team.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="away-team">Away Team</Label>
            <Select 
              value={newMatch.awayTeamId} 
              onValueChange={(value) => handleMatchChange('awayTeamId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select away team" />
              </SelectTrigger>
              <SelectContent>
                {filteredTeams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {getHungarianTeamName(team.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="home-score">Home Score</Label>
              <Input
                id="home-score"
                type="number"
                value={newMatch.homeScore}
                onChange={(e) => handleMatchChange('homeScore', parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="away-score">Away Score</Label>
              <Input
                id="away-score"
                type="number"
                value={newMatch.awayScore}
                onChange={(e) => handleMatchChange('awayScore', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              value={newMatch.venue}
              onChange={(e) => handleMatchChange('venue', e.target.value)}
              placeholder="Match venue"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddMatch}>
            Add Match
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMatchDialog;
