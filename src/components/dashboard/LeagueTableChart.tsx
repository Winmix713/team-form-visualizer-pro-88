
import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TeamStat {
  name: string;
  wins: number;
  draws: number;
  losses: number;
  points: number;
}

interface LeagueTableChartProps {
  teamStats: TeamStat[];
}

const LeagueTableChart: React.FC<LeagueTableChartProps> = ({ teamStats }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          League Table (Top 5)
        </Typography>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={teamStats.slice(0, 5)}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="points" name="Points" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeagueTableChart;
