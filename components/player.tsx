import { Pick } from "@/types/fpl";
import { Card, CardContent } from "./ui/card";

const Player = ({ player }: { player: Pick }) => {
  console.log(player);

  return (
    <Card className="w-30">
      <CardContent>
        <p className="text-s">
          {/* {player.playerData.captain ? <HardHat size={20} /> : null} */}
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
