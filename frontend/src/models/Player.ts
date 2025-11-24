export class Player {
  playerId: string; // Player's Unique Identifier
  name: string; // Player's name
  skill: number; // Player's skill level (2-7)
  sessWR: number; // Player's current session winrate
  sessPA: number; // Player's current session points achieved percentage
  overallWR: number; // Player's overall winrate
  overallMP: number; // Player's overall matches played
  played: boolean = false; // Whether the player has played or not

  constructor(
    playerId: string,
    name: string,
    skill: number,
    sessWR: number,
    sessPA: number,
    overallWR: number,
    overallMP: number,
    played: boolean = false
  ) {
    this.playerId = playerId;
    this.name = name;
    this.skill = skill;
    this.sessWR = sessWR;
    this.sessPA = sessPA;
    this.overallWR = overallWR;
    this.overallMP = overallMP;
    this.played = played;
  }
}
