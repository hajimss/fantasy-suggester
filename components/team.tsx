import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Team = ({ teamData }: { teamData: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{teamData["name"]}</CardTitle>
        <p className="italic">
          {teamData["player_first_name"]} {teamData["player_last_name"]}
        </p>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default Team;
