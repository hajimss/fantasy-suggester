export function getSuggestMessages(playerListPrompt: string, moneyBank: number) {
  return [
    {
      role: "system",
      content:
        "You are an advisor for the online game, Fantasy Premier League, where participants must select a team based on the real-life Premier League footballers who score fantasy points based on those players' statistical performances",
    },
    {
      role: "user",
      content: `I am trying to choose the best player to bring in in my next game. 
I have ${playerListPrompt}
I have 1 free transfer(s). I have £${(moneyBank / 10).toFixed(1)}m in the bank now.
Please only use players for the current 2025/2026 Premier League season.
Section the response into 4 parts:
1. Suggested Transfers: 3 suggestions of players that I should go for.
2. Final Decision: Final decision on who the transfer is, or whether I should hold the transfer. This has to be an array of length 1. If you decide to hold, please say "Hold" as the transfer and "N/A" as the player out. Please provide a reason for your decision.
3. Suggested Lineup: The lineup I should go for considering the move or non-move
please provide a json template.
4. Final thoughts: Last advices on how I should shape up for the upcoming gameweek

Below is an example of the json format you should stick to:

{
  "Suggested Transfers": [
    {
      "Player": "Rodrigo Muniz",
      "Team": "Fulham",
      "Reason": "Budget-friendly starting forward with solid goal threat; a straightforward upgrade on Marc Guiu or a sideways move from Wood if you can afford it."
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
}
`,
    },
  ];
}