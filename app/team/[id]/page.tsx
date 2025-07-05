"use client";

import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params?.id;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Team ID: {id}</h1>
      <p className="mb-4">This is the page for team ID: {id}</p>
      <p>
        Here you can display team details, statistics, or any other relevant
        information.
      </p>
    </div>
  );
};

export default Page;
