import { Player } from "./Player";

export class Team {
  teamName: string; // Team's name
  players: Player[]; // Array of players in the team
  sessionPoints: number; // Team's current session points
  ranking: number; // Team's ranking

  constructor(
    teamName: string,
    players: Player[],
    sessionPoints: number,
    ranking: number
  ) {
    this.teamName = teamName;
    this.players = players;
    this.sessionPoints = sessionPoints;
    this.ranking = ranking;
  }
}
