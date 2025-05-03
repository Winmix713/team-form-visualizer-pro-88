
import { Link } from 'react-router-dom';
import { Team } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TeamsListProps {
  filteredTeams: Team[];
}

const TeamsList = ({ filteredTeams }: TeamsListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Teams ({filteredTeams.length})
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="overflow-hidden">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium">{team.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{team.category}</p>
              
              <div className="mt-4 space-y-1 text-sm">
                <p>Founded: {team.founded}</p>
                <p>Stadium: {team.stadium}</p>
                <p>Coach: {team.coach || 'N/A'}</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-2 pt-2 pb-4">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/team/${team.id}`}>View Details</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/edit-team/${team.id}`}>Edit</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {filteredTeams.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">
            No teams found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamsList;
