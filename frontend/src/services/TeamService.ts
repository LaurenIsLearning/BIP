import { Team } from "../models/Team";
import { Player } from "../models/Player";

function mapPlayers(players: any[] | undefined): Player[] {
  if (!Array.isArray(players)) return [];
  return players.map(
    (p: any) =>
      new Player(
        p.name,
        p.skill,
        p.sesswr,
        p.sesspa,
        p.overallwr,
        p.overallmp,
        false
      )
  );
}

export async function fetchAllTeams(): Promise<Team[]> {
  const res = await fetch("http://localhost:3000/api/teams");
  const data = await res.json();

  console.log("Fetched teams:", data);

  return data.map(
    (t: any) =>
      new Team(
        t.id,
        t.name,
        mapPlayers(undefined), // No players in this endpoint
        t.points,
        t.ranking
      )
  );
}

export async function fetchTeam(id: string): Promise<Team> {
  const res = await fetch(`http://localhost:3000/api/teams/${id}`);
  const t = await res.json();

  return new Team(t.id, t.name, mapPlayers(t.players), t.points, t.ranking);
}
