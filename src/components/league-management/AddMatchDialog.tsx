
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { Team, Match } from '../../types';

interface AddMatchDialogProps {
  open: boolean;
  onClose: () => void;
  selectedLeague: string;
  teams: Team[];
  newMatch: Partial<Match>;
  handleMatchChange: (field: keyof Match, value: any) => void;
  handleAddMatch: () => void;
}

const AddMatchDialog: React.FC<AddMatchDialogProps> = ({
  open,
  onClose,
  selectedLeague,
  teams,
  newMatch,
  handleMatchChange,
  handleAddMatch,
}) => {
  const filteredTeams = teams.filter((team) => team.category === selectedLeague);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Match</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={newMatch.date}
            onChange={(e) => handleMatchChange('date', e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Home Team</InputLabel>
            <Select
              value={newMatch.homeTeamId}
              onChange={(e) => handleMatchChange('homeTeamId', e.target.value)}
              label="Home Team"
            >
              {filteredTeams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Away Team</InputLabel>
            <Select
              value={newMatch.awayTeamId}
              onChange={(e) => handleMatchChange('awayTeamId', e.target.value)}
              label="Away Team"
            >
              {filteredTeams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Home Score"
                type="number"
                fullWidth
                value={newMatch.homeScore}
                onChange={(e) => handleMatchChange('homeScore', parseInt(e.target.value))}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Away Score"
                type="number"
                fullWidth
                value={newMatch.awayScore}
                onChange={(e) => handleMatchChange('awayScore', parseInt(e.target.value))}
                margin="normal"
              />
            </Grid>
          </Grid>
          <TextField
            label="Venue"
            fullWidth
            value={newMatch.venue}
            onChange={(e) => handleMatchChange('venue', e.target.value)}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddMatch} color="primary">
          Add Match
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMatchDialog;
