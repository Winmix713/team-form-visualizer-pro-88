
import { League } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditLeagueDialogProps {
  open: boolean;
  onClose: () => void;
  leagueSettings: Partial<League>;
  handleLeagueSettingChange: (field: keyof League, value: any) => void;
  handleUpdateLeague: () => void;
}

const EditLeagueDialog = ({
  open,
  onClose,
  leagueSettings,
  handleLeagueSettingChange,
  handleUpdateLeague,
}: EditLeagueDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit League Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="league-name">League Name</Label>
            <Input
              id="league-name"
              value={leagueSettings.name}
              onChange={(e) => handleLeagueSettingChange('name', e.target.value)}
            />
          </div>
          
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="league-season">Season</Label>
            <Input
              id="league-season"
              value={leagueSettings.season}
              onChange={(e) => handleLeagueSettingChange('season', e.target.value)}
              placeholder="e.g., 2023-24"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={leagueSettings.startDate}
                onChange={(e) => handleLeagueSettingChange('startDate', e.target.value)}
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={leagueSettings.endDate}
                onChange={(e) => handleLeagueSettingChange('endDate', e.target.value)}
              />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Points System</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="win-points">Win Points</Label>
              <Input
                id="win-points"
                type="number"
                value={leagueSettings.winPoints}
                onChange={(e) => handleLeagueSettingChange('winPoints', parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="draw-points">Draw Points</Label>
              <Input
                id="draw-points"
                type="number"
                value={leagueSettings.drawPoints}
                onChange={(e) => handleLeagueSettingChange('drawPoints', parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="loss-points">Loss Points</Label>
              <Input
                id="loss-points"
                type="number"
                value={leagueSettings.lossPoints}
                onChange={(e) => handleLeagueSettingChange('lossPoints', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateLeague}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeagueDialog;
