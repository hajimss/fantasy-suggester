import Player from "@/components/player";
import Team from "@/components/team";
import { Key } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const FPL_URL = process.env.FPL_URL;
  const GW = 38; // TODO: Replace with dynamic logic

  const res = await fetch(`${FPL_URL}/entry/${id}/event/${GW}/picks/`);
  const data = await res.json();

  console.log("Fetched data:", data);
  const picks = data.picks || [];

  return (
    <div className="flex flex-col gap-5">
      <Team params={{ teamId: id }} />
      <p>Your team:</p>
      <div className="flex flex-col gap-2 justify-center items-center">
        {picks.map(
          (pick: {
            element: Key | null | undefined;
            is_captain: boolean;
            element_type: number;
            position: number;
          }) => (
            <Player
              key={pick.element}
              params={{
                playerId: pick.element?.toString() ?? "",
                captain: pick.is_captain,
                element_type: pick.element_type,
                position: pick.position,
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Page;
