import { Player } from "./Player";

export class Team {
  teamId: string; // Unique identifier for the team
  name: string; // Team's name
  points: number; // Team's current session points
  players: Player[]; // Array of players in the team

  constructor(
    teamId: string,
    name: string,
    points: number,
    players: Player[],
  ) {
    this.teamId = teamId;
    this.name = name;
    this.points = points;
    this.players = players;
  }
}
