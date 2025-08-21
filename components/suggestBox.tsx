"use client";

import { Pick, SuggestionJson } from "@/types/fpl";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
  const [suggestion, setSuggestion] = useState<SuggestionJson | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestionsLeft, setSuggestionsLeft] = useState<number | null>(null);
  console.log("SuggestBox player:", players[0], players.length);

  const fetchUsage = async () => {
    const res = await fetch("/api/usage");
    if (res.ok) {
      const data = await res.json();
      setSuggestionsLeft(data.suggestionsLeft);
    }
  };

  useEffect(() => {
    fetchUsage();
  }, []);

  let playerListPrompt = "";

  for (const player of players) {
    console.log(
      "Player in SuggestBox:",
      `${player.playerData.web_name} from ${player.playerTeamData.name}`
    );

    playerListPrompt += `${player.playerData.web_name} (${player.playerTeamData.name}), `;
  }

  const handleSuggest = async () => {
    setLoading(true); // Start loading
    // Example prompt/messages for the API
    const messages = [
      {
        role: "system",
        content:
          "You are an advisor for the online game, Fantasy Premier League, where participants must select a team based on the real-life Premier League footballers who score fantasy points based on those players' statistical performances",
      },
      {
        role: "user",
        content: `I am trying to choose the best player to bring in in my next game. 
I have ${playerListPrompt.slice(0, -2)}
I have 1 free transfer(s). I have ${formatMoney(moneyBank)} in the bank now.
Section the response into 4 parts:
1. Suggested Transfers: maximum of 3 suggestions of players that I should go for
2. Final Decision: Final decision on who the transfer is, or whether I should hold the transfer
3. Suggested Lineup: The lineup I should go for considering the move or non-move
please provide a json template.
4. Final thoughts: Last advices on how I should shape up for the upcoming gameweek

Below is an example of the json format you should stick to:

{
  "Suggested Transfers": [
    {
      "Player": "Evan Ferguson",
      "Team": "Brighton",
      "Reason": "Ferguson has been in good form and Brighton have a favorable fixture. He could be a good replacement for Wood or Guiu."
    },
    {
      "Player": "Ollie Watkins",
      "Team": "Aston Villa",
      "Reason": "Watkins is a consistent performer and has been involved in goals regularly. He could strengthen your forward line."
    },
    {
      "Player": "James Ward-Prowse",
      "Team": "West Ham",
      "Reason": "Ward-Prowse is on set-pieces and has been delivering points consistently. He could be a good midfield option if you want to replace Palmer or Wirtz."
    }
  ],
  "Final Decision": [{
    "Transfer": "Evan Ferguson",
    "Out": "Chris Wood",
    "Reason": "Ferguson offers a better attacking threat and Brighton's upcoming fixtures are favorable."
      }],
  "Suggested Lineup": {
    "Goalkeeper": "Sánchez (Chelsea)",
    "Defenders": [
      "Murillo (Nott'm Forest)",
      "Pedro Porro (Spurs)",
      "N.Williams (Nott'm Forest)"
    ],
    "Midfielders": [
      "M.Salah (Liverpool)",
      "B.Fernandes (Man Utd)",
      "Palmer (Chelsea)",
      "Reijnders (Man City)"
    ],
    "Forwards": [
      "Strand Larsen (Wolves)",
      "Evan Ferguson (Brighton)",
      "Marc Guiu (Sunderland)"
    ],
    "Bench": [
      "Dúbravka (Burnley)",
      "Andersen (Fulham)",
      "Estève (Burnley)",
      "Wirtz (Liverpool)"
    ]
  },
  "Final Thoughts": "Keep an eye on any last-minute injury news before the deadline. Consider rotating your bench players based on fixture difficulty. Monitor the performances of your new transfer and be ready to make adjustments in the coming weeks. Also, keep an eye on the form of your premium assets like Salah and Fernandes, as they are key to your team's success."
}`,
      },
    ];

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error from API:", errorText);
      if (res.status === 429) {
        alert("Daily limit reached. Please try again tomorrow.");
      }
      setLoading(false);
      return;
    }

    const data = await res.json();
    if (!data?.content) {
      return;
    }
    console.log("Suggestion response:", data.content);
    setSuggestion(JSON.parse(data.content));
    setLoading(false); // Stop loading

    // Re-fetch usage after suggestion
    fetchUsage();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="mb-2">
        {suggestionsLeft !== null && (
          <span className="text-sm text-gray-700">
            Suggestions left today: <b>{suggestionsLeft}</b>
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <Button
          onClick={handleSuggest}
          className="w-1/2"
          disabled={loading || suggestionsLeft === 0}
        >
          {loading
            ? "Loading..."
            : suggestionsLeft == 0
            ? "No suggestions left"
            : "Suggest!"}
        </Button>
        {loading && (
          <p className="text-sm m-2 italic text-center">
            Generating suggestions... This process may take up to 2 minutes.
          </p>
        )}
      </div>
      <div className="flex flex-col w-full">
        <p className="text-sm m-2">
          <b>Budget</b>: {formatMoney(moneyBank)}
        </p>
        {suggestion && (
          <div>
            <div>
              <p className="text-sm m-2">
                <b>Suggestions:</b>
              </p>
              <div className="flex gap-2 justify-center">
                {suggestion["Suggested Transfers"].map((player) => {
                  return (
                    <Card className="w-1/3" key={player.Player}>
                      <CardHeader>
                        <CardTitle>{player.Player}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm m-2 italic">{player.Team}</p>
                        <p className="text-sm m-2">{player.Reason}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm m-2">
                <b>Final Decision:</b>
              </p>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>
                    {suggestion["Final Decision"][0].Transfer}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm m-2 italic">
                    Out: {suggestion["Final Decision"][0].Out}
                  </p>
                  <p className="text-sm m-2">
                    {suggestion["Final Decision"][0].Reason}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestBox;
