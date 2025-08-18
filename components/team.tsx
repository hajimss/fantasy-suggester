import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface TeamData {
  name: string;
  player_first_name: string;
  player_last_name: string;
  summary_overall_rank: number | string;
}

const Team = ({ teamData }: { teamData: TeamData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{teamData["name"]}</CardTitle>
        <p className="italic">
          {teamData["player_first_name"]} {teamData["player_last_name"]}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-s">
          Overall Rank: {teamData["summary_overall_rank"]}
        </p>
      </CardContent>
    </Card>
  );
};

export default Team;
