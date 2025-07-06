import { HardHat } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Player = async ({
  params,
}: {
  params: Promise<{
    playerId: string;
    captain: boolean;
    element_type: number;
    position: number;
  }>;
}) => {
  const { playerId, captain, element_type, position } = await params;
  const FPL_URL = process.env.FPL_URL;

  const res = await fetch(`${FPL_URL}/bootstrap-static/`);
  const data = await res.json();
  let playerData = undefined;

  //   TODO: Optimise
  for (const item of data["elements"]) {
    if (item.id == playerId) {
      playerData = item;
    }
  }

  let playerPosition = undefined;
  for (const item of data["element_types"]) {
    if (item.id == element_type) {
      playerPosition = item.singular_name_short;
    }
  }

  console.log(playerData);

  return (
    <Card className="w-1/2">
      <CardContent>
        <p className="text-s">
          {captain ? <HardHat size={20} /> : null}
          {playerData["web_name"]}
        </p>
        <p className="text-xs italic">{playerPosition}</p>
        <p className="text-xs italic">{position}</p>
      </CardContent>
    </Card>
  );
};

export default Player;
