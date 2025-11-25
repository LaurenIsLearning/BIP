import { Team } from "../models/Team";
import { Player } from "../models/Player";

interface PlayerResponse {
  playerId: string;
  name: string;
  skill: number;
  sessWR: number;
  sessPA: number;
  overallWR: number;
  overallMP: number;
}

interface TeamResponse {
  teamId: string;
  name: string;
  points: number;
  players?: PlayerResponse[];
}

function mapPlayers(players: PlayerResponse[] | undefined): Player[] {
  if (!Array.isArray(players)) return [];
  return players.map(
    (p) =>
      new Player(
        p.playerId,
        p.name,
        p.skill,
        p.sessWR,
        p.sessPA,
        p.overallWR,
        p.overallMP,
        false
      )
  );
}

export async function fetchAllTeams(): Promise<Team[]> {
  const res = await fetch("http://localhost:3000/api/teams");
  const data: TeamResponse[] = await res.json();

  console.log("Fetched teams:", data);

  return data.map(
    (t) =>
      new Team(
        t.teamId,
        t.name,
        t.points,
        []
      )
  );
}

export async function fetchTeam(id: string): Promise<Team> {
  const res = await fetch(`http://localhost:3000/api/teams/${id}`);
  const t: TeamResponse = await res.json();

  return new Team(
    t.teamId,
    t.name, 
    t.points,
    mapPlayers(t.players)
  );
}
