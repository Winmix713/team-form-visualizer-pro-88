
import { memo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface MatchFiltersProps {
  onFilterChange: (filters: any) => void
}

const MatchFilters = memo(({ onFilterChange }: MatchFiltersProps) => {
  const [filters, setFilters] = useState({
    team: "",
    round: "",
    result: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <div className="flex-1">
        <Input
          placeholder="Filter by team..."
          className="bg-black/30 border-white/10 text-white"
          value={filters.team}
          onChange={(e) => handleFilterChange("team", e.target.value)}
        />
      </div>
      <Select value={filters.round} onValueChange={(value) => handleFilterChange("round", value)}>
        <SelectTrigger className="w-full md:w-[180px] bg-black/30 border-white/10 text-white">
          <SelectValue placeholder="Round" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Rounds</SelectItem>
          <SelectItem value="1">Round 1</SelectItem>
          <SelectItem value="2">Round 2</SelectItem>
          <SelectItem value="3">Round 3</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filters.result} onValueChange={(value) => handleFilterChange("result", value)}>
        <SelectTrigger className="w-full md:w-[180px] bg-black/30 border-white/10 text-white">
          <SelectValue placeholder="Result" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Results</SelectItem>
          <SelectItem value="home">Home Wins</SelectItem>
          <SelectItem value="away">Away Wins</SelectItem>
          <SelectItem value="draw">Draws</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
        onClick={() => {
          setFilters({ team: "", round: "", result: "" })
          onFilterChange({ team: "", round: "", result: "" })
        }}
      >
        Reset
      </Button>
    </div>
  )
})

MatchFilters.displayName = "MatchFilters"

export default MatchFilters
