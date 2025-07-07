import { teamBgClassMap } from "@/lib/teamBgClassMap";
import { Pick } from "@/types/fpl";
import { HardHat } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Player = ({ player }: { player: Pick }) => {
  console.log(player);
  const bgClass = teamBgClassMap[player.playerTeamData.name] || "bg-gray-300";

  return (
    <Card className={`w-30 ${bgClass}`}>
      <CardContent>
        <p className="text-s">
          {player.captain ? <HardHat size={20} /> : null}
          {player ? player.playerData.web_name : "Unknown Player"}
        </p>
        <p className="text-xs italic">
          {player.playerPositionData.singular_name_short}
        </p>
        <p className="text-xs italic">{player.playerTeamData.name}</p>
      </CardContent>
    </Card>
  );
};

export default Player;
