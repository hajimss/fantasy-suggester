import { FormationRow } from "@/components/formationRow";
import Team from "@/components/team";
import { Button } from "@/components/ui/button";
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
  const GW = 38; // TODO: Replace with dynamic logic

  const res = await fetch(`${FPL_URL}/entry/${id}/event/${GW}/picks/`);
  const data = await res.json();

  const bsRes = await fetch(`${FPL_URL}/bootstrap-static/`);
  const bsData = await bsRes.json();

  console.log("Fetched data:", bsData["teams"]);
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
      <Team params={{ teamId: id }} />
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
        <Button className="w-1/2">Suggest!</Button>
      </div>
    </div>
  );
};

export default Page;
