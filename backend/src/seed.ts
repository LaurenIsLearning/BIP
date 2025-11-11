import { pool } from "./db.js";
import fs from "fs";

async function seed() {
  const raw = fs.readFileSync("./db/init/teamdata.json", "utf8");
  const data = JSON.parse(raw);

  for (const team of data) {
    const teamRes = await pool.query(
      "INSERT INTO teams (name, points) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING RETURNING id",
      [team.name, team.points]
    );
    const teamId =
      teamRes.rows[0]?.id ||
      (await pool.query("SELECT id FROM teams WHERE name=$1", [team.name])).rows[0].id;

    for (const player of team.players) {
      await pool.query(
        `INSERT INTO players (team_id, name, skill, sessWR, sessPA, overallWR, overallMP)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          teamId,
          player.name,
          player.skill,
          player.sessWR,
          player.sessPA,
          player.overallWR,
          player.overallMP,
        ]
      );
    }

    console.log(`Seeded team: ${team.name}`);
  }

  console.log("~All teams and players have been seeded!");
  pool.end();
}

seed().catch((err) => {
  console.error(err);
  pool.end();
});
