
import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Team } from '../../types';

interface CategoryDistributionChartProps {
  teams: Team[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({ teams }) => {
  const teamDistribution = teams.reduce((acc, team) => {
    const category = team.category || 'Unknown';
    const existingCategory = acc.find((item) => item.name === category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Team Categories
        </Typography>
        <Box height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={teamDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {teamDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategoryDistributionChart;
