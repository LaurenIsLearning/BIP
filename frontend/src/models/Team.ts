import { Player } from "./Player";

export class Team {
  teamId: string; // Unique identifier for the team
  teamName: string; // Team's name
  players: Player[]; // Array of players in the team
  sessionPoints: number; // Team's current session points

  constructor(
    teamId: string,
    teamName: string,
    players: Player[],
    sessionPoints: number,
  ) {
    this.teamId = teamId;
    this.teamName = teamName;
    this.players = players;
    this.sessionPoints = sessionPoints;
  }
}
