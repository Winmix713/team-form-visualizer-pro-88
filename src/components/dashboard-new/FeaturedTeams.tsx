
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const FeaturedTeams = () => {
  const featuredTeams = [
    { name: 'London Ágyúk', league: 'Premier League', stadium: 'Emirates Stadium', logo: '/placeholder.svg' },
    { name: 'Vörös Ördögök', league: 'Premier League', stadium: 'Old Trafford', logo: '/placeholder.svg' },
    { name: 'Manchester Kék', league: 'Premier League', stadium: 'Etihad Stadium', logo: '/placeholder.svg' },
    { name: 'Aston Oroszlán', league: 'Premier League', stadium: 'Villa Park', logo: '/placeholder.svg' },
  ];

  return (
    <div className="py-8 space-y-4">
      <h2 className="text-2xl font-semibold">Featured Teams</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {featuredTeams.map((team) => (
          <Card key={team.name} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={team.logo} alt={team.name} />
                  <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{team.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{team.league}</p>
              <p className="text-sm mt-1">Stadium: {team.stadium}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTeams;
