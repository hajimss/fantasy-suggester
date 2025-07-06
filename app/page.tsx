"use client";

import { Input } from "@/components/ui/input";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [teamId, setTeamId] = useState<string>("");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col justify-center items-start">
        <p>Welcome! Please sign in to get good at FPL.</p>
        <div className="border-2 p-2">
          <SignInButton />
        </div>
      </div>
    );
  }

  const handleTeamIdSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Team ID submitted:", teamId);

    if (!teamId) {
      alert("Please enter a valid team ID.");
      return;
    }

    window.location.href = `/team/${teamId}`;
  };

  return (
    <div>
      <header className="text-2xl font-bold mb-4">
        Hi {user.firstName} {user.lastName}, welcome to Fantasy Suggester!
      </header>
      <form
        onSubmit={handleTeamIdSubmit}
        className="flex flex-col items-center"
      >
        <label>Input your fantasy team ID below to get started:</label>
        <Input
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          placeholder="Fantasy team ID"
          className="w-3/4"
        />
      </form>
    </div>
  );
}
