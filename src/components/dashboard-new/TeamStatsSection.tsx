
import { Team, Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getHungarianTeamName } from '@/data/teamsData';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface TeamStatsSectionProps {
  teams: Team[];
  topScorers: Player[];
  teamStats: Array<{ name: string; wins: number; draws: number; losses: number; points: number }>;
}

const TeamStatsSection = ({ teams, topScorers, teamStats }: TeamStatsSectionProps) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Calculate category distribution
  const teamDistribution = teams.reduce((acc, team) => {
    const category = team.category || 'Unknown';
    const existing = acc.find((item) => item.name === category);
    
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <div className="space-y-4">
      {/* Category Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Team Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={teamDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
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
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* League Table Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>League Table (Top 5)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {teamStats.slice(0, 5).map((team, index) => (
              <div key={team.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{index + 1}.</span>
                  <span>{getHungarianTeamName(team.name)}</span>
                </div>
                <span className="font-medium">{team.points} pts</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Scorers */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Top Scorers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topScorers.map((player, index) => (
              <div key={player.id} className="flex justify-between items-center">
                <div>
                  <span className="text-muted-foreground mr-2">{index + 1}.</span>
                  <span>{player.name} </span>
                  <span className="text-muted-foreground">
                    ({getHungarianTeamName(teams.find((team) => team.id === player.teamId)?.name || 'Unknown Team')})
                  </span>
                </div>
                <span className="font-medium">{player.goals} goals</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamStatsSection;
