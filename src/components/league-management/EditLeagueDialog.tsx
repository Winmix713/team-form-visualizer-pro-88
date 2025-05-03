
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid, Typography } from '@mui/material';
import { League } from '../../types';

interface EditLeagueDialogProps {
  open: boolean;
  onClose: () => void;
  leagueSettings: Partial<League>;
  handleLeagueSettingChange: (field: keyof League, value: any) => void;
  handleUpdateLeague: () => void;
}

const EditLeagueDialog: React.FC<EditLeagueDialogProps> = ({
  open,
  onClose,
  leagueSettings,
  handleLeagueSettingChange,
  handleUpdateLeague,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit League Settings</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <TextField
            label="League Name"
            fullWidth
            value={leagueSettings.name}
            onChange={(e) => handleLeagueSettingChange('name', e.target.value)}
            margin="normal"
          />
          <TextField
            label="Season"
            fullWidth
            value={leagueSettings.season}
            onChange={(e) => handleLeagueSettingChange('season', e.target.value)}
            margin="normal"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={leagueSettings.startDate}
                onChange={(e) => handleLeagueSettingChange('startDate', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={leagueSettings.endDate}
                onChange={(e) => handleLeagueSettingChange('endDate', e.target.value)}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Typography variant="h6" mt={2} mb={1}>
            Points System
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Win Points"
                type="number"
                fullWidth
                value={leagueSettings.winPoints}
                onChange={(e) => handleLeagueSettingChange('winPoints', parseInt(e.target.value))}
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Draw Points"
                type="number"
                fullWidth
                value={leagueSettings.drawPoints}
                onChange={(e) => handleLeagueSettingChange('drawPoints', parseInt(e.target.value))}
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Loss Points"
                type="number"
                fullWidth
                value={leagueSettings.lossPoints}
                onChange={(e) => handleLeagueSettingChange('lossPoints', parseInt(e.target.value))}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateLeague} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLeagueDialog;
