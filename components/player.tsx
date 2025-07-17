import { teamBgClassMap, temaBorderClassMap } from "@/lib/teamBgClassMap";
import { Pick } from "@/types/fpl";

const Player = ({ player }: { player: Pick }) => {
  console.log(player);
  const bgClass = teamBgClassMap[player.playerTeamData.name] || "bg-gray-300";
  const borderClass =
    temaBorderClassMap[player.playerTeamData.name] || "bg-gray-200";

  return (
    <div
      className={`w-1/5 text-[0.6rem] rounded-sm ${bgClass} ${borderClass} border-2 text-pretty`}
    >
      <div className="p-2">
        <p className="font-semibold">
          {player ? player.playerData.web_name : "Unknown Player"}
          {player.captain ? "(C)" : null}
        </p>
        <p></p>
        <p className="italic">{player.playerTeamData.name}</p>
      </div>
    </div>
  );
};

export default Player;
