export type FplBootstrapPlayer = {
  id: string;
  web_name: string;
  team: number;
  element_type: number;
};

export type FplBootstrapPosition = {
  id: number;
  singular_name_short: string;
};

export type FplBootstrapTeam = {
  id: number;
  name: string;
};

export type Pick = {
  playerData: FplBootstrapPlayer;
  playerPositionData: FplBootstrapPosition;
  playerTeamData: FplBootstrapTeam;
  captain: boolean;
};