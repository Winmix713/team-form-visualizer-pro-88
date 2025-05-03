
import { Info, Trophy, Shield, BarChart3 } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ViewType } from "@/hooks/useViewType";

interface StandingsTableHeaderProps {
  viewType: ViewType;
  onViewTypeChange: (value: ViewType) => void;
}

export const StandingsTableHeader = ({ viewType, onViewTypeChange }: StandingsTableHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-blue-500" />
        <CardTitle className="text-white">League Standings</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                <Info className="h-4 w-4 text-gray-400" />
                <span className="sr-only">Standings information</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#0a0f14] border-white/10 text-white">
              <div className="space-y-2 max-w-xs">
                <p className="text-xs">Teams are ranked by points, then goal difference, then goals scored.</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500/20"></div>
                  <span className="text-xs">Champions League qualification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500/20"></div>
                  <span className="text-xs">Europa League qualification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500/20"></div>
                  <span className="text-xs">Relegation zone</span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs value={viewType} onValueChange={(value) => onViewTypeChange(value as ViewType)} className="w-auto">
        <TabsList className="bg-black/30 border border-white/10">
          <TabsTrigger value="table" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Table
          </TabsTrigger>
          <TabsTrigger value="cards" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            Cards
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
