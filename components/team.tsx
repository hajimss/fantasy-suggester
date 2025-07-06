import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Team = async ({ params }: { params: { teamId: string } }) => {
  const { teamId } = params;
  const FPL_URL = process.env.FPL_URL;

  const res = await fetch(`${FPL_URL}/entry/${teamId}/`);
  const teamData = await res.json();
  console.log(teamData);

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
