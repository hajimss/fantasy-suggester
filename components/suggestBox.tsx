import { Pick } from "@/types/fpl";
import { Button } from "./ui/button";

// Simple money formatting function
function formatMoney(amount: number) {
  amount = amount / 10;
  return `£${amount.toFixed(1)}m`;
}

const SuggestBox = ({
  players,
  moneyBank,
}: {
  players: Pick[];
  moneyBank: number;
}) => {
  console.log("SuggestBox player:", players[0], players.length);

  let playerListPrompt = "";

  for (const player of players) {
    console.log(
      "Player in SuggestBox:",
      `${player.playerData.web_name} from ${player.playerTeamData.name}`
    );

    playerListPrompt += `${player.playerData.web_name} (${player.playerTeamData.name}), `;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Button className="w-1/2">Suggest!</Button>
      <div>
        <p className="text-sm mt-2">
          <b>Players</b>:{" "}
          {playerListPrompt.slice(0, -2) || "No players available"}
        </p>
        <p className="text-sm mt-2">
          <b>Budget</b>: {formatMoney(moneyBank)}
        </p>
      </div>
    </div>
  );
};

export default SuggestBox;
