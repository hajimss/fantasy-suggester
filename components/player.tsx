import { HardHat } from "lucide-react";
import { Card, CardContent } from "./ui/card";

type FplPlayer = {
  id: string;
  web_name: string;
  team: number;
  element_type: number;
  // Add more if needed
};

type FplPosition = {
  id: number;
  singular_name_short: string;
};

const Player = async ({
  params,
}: {
  params: {
    playerId: string;
    captain: boolean;
    element_type: number;
    position: number;
  };
}) => {
  const { playerId, captain, element_type, position } = await params;
  const FPL_URL = process.env.FPL_URL;

  const res = await fetch(`${FPL_URL}/bootstrap-static/`);
  const data = await res.json();

  const playerData = (data["elements"] as FplPlayer[]).find(
    (item) => item.id == playerId
  );

  const playerPosition = (data["element_types"] as FplPosition[]).find(
    (item) => item.id == element_type
  )?.singular_name_short;

  console.log(playerData);

  return (
    <Card className="w-1/2">
      <CardContent>
        <p className="text-s">
          {captain ? <HardHat size={20} /> : null}
          {playerData ? playerData["web_name"] : "Unknown Player"}
        </p>
        <p className="text-xs italic">{playerPosition}</p>
        <p className="text-xs italic">{position}</p>
      </CardContent>
    </Card>
  );
};

export default Player;
