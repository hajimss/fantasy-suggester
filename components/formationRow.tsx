import { Pick } from "@/types/fpl";
import Player from "./player";

export const FormationRow = ({ players }: { players: Pick[] }) => {
  console.log(players);
  return (
    <div className="flex justify-center gap-2">
      {players.map((player) => (
        <Player key={player.playerData.id} player={player} />
      ))}
    </div>
  );
};
