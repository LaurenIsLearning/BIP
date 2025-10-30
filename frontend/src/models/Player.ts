export class Player {
  playerName: string; // Player's name
  skillLevel: number; // Player's skill level (2-7)
  sessionWR: number; // Player's current session winrate
  sessionPA: number; // Player's current session points achieved percentage
  overallWR: number; // Player's overall winrate
  overallMP: number; // Player's overall matches played
  played: boolean = false; // Whether the player has played or not

  constructor(
    playerName: string,
    skillLevel: number,
    sessionWR: number,
    sessionPA: number,
    overallWR: number,
    overallMP: number,
    played: boolean = false
  ) {
    this.playerName = playerName;
    this.skillLevel = skillLevel;
    this.sessionWR = sessionWR;
    this.sessionPA = sessionPA;
    this.overallWR = overallWR;
    this.overallMP = overallMP;
    this.played = played;
  }
}
