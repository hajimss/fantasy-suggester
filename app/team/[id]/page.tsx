import { FormationRow } from "@/components/formationRow";
import SuggestBox from "@/components/suggestBox";
import Team from "@/components/team";
import { Separator } from "@/components/ui/separator";
import {
  FplBootstrapPlayer,
  FplBootstrapPosition,
  FplBootstrapTeam,
  Pick,
} from "@/types/fpl";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const FPL_URL = process.env.FPL_URL;
  let currentGW = 0;

  // Fetch team details here
  const teamRes = await fetch(`${FPL_URL}/entry/${id}/`);
  const teamData = await teamRes.json();
  console.log("Fetched team data:", teamData);

  // Fetch the bootstrap data to get player, position, and team details
  const bsRes = await fetch(`${FPL_URL}/bootstrap-static/`);
  const bsData = await bsRes.json();

  // Find the current gameweek
  for (const event of bsData["events"]) {
    if (event.is_current) {
      currentGW = event.id;
      break;
    }
  }

  // Fetch the picks for the team
  const res = await fetch(`${FPL_URL}/entry/${id}/event/${currentGW}/picks/`);
  const data = await res.json();

  // console.log("Fetched data:", data);
  const picks = data.picks || [];
  const pickData: Pick[] = [];

  for (const pick of picks) {
    const playerData = (bsData["elements"] as FplBootstrapPlayer[]).find(
      (item) => item.id == pick.element
    );

    const playerElementTypeData = (
      bsData["element_types"] as FplBootstrapPosition[]
    ).find((item) => item.id == pick.element_type);

    const playerTeamData = (bsData["teams"] as FplBootstrapTeam[]).find(
      (item) => item.id == playerData?.team
    );

    pickData.push({
      playerData: playerData!,
      playerPositionData: playerElementTypeData!,
      playerTeamData: playerTeamData!,
      captain: pick.is_captain!,
    });
  }

  const startingXI = pickData.slice(0, 11);

  const goalkeepers = startingXI.filter(
    (p) => p.playerPositionData.singular_name_short === "GKP"
  );
  const defenders = startingXI.filter(
    (p) => p.playerPositionData.singular_name_short === "DEF"
  );
  const midfielders = startingXI.filter(
    (p) => p.playerPositionData.singular_name_short === "MID"
  );
  const forwards = startingXI.filter(
    (p) => p.playerPositionData.singular_name_short === "FWD"
  );

  const benches = pickData.slice(11, 15);

  return (
    <div className="flex flex-col gap-5">
      <Team teamData={teamData} />
      <p>Your team:</p>
      <div className="flex flex-col items-center gap-4">
        <FormationRow players={goalkeepers} />
        <FormationRow players={defenders} />
        <FormationRow players={midfielders} />
        <FormationRow players={forwards} />
        <Separator />
      </div>

      <p>Bench:</p>
      <div className="flex flex-col items-center gap-4">
        <FormationRow players={benches} />
      </div>
      <Separator />
      <div className="flex justify-center items-center">
        <SuggestBox
          players={pickData}
          moneyBank={teamData.last_deadline_bank}
        />
      </div>
    </div>
  );
};

export default Page;
