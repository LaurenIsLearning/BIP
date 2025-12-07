import { pool } from "./db.js";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

//Seed Teams & Players
async function seedTeamsAndPlayers() {
  //Load JSON
  const jsonPath = path.join(process.cwd(), "db/init/teamdata.json");
  const raw = fs.readFileSync(jsonPath, "utf8");
  const data = JSON.parse(raw);

  for (const team of data) {
    //Insert team if not exists
    const teamRes = await pool.query(
      `INSERT INTO teams (name, points)
       VALUES ($1, $2)
       ON CONFLICT (name) DO NOTHING
       RETURNING id`,
      [team.name, team.points]
    );

    // Get team ID no matter what
    const teamId =
      teamRes.rows[0]?.id ||
      (
        await pool.query("SELECT id FROM teams WHERE name = $1", [
          team.name,
        ])
      ).rows[0].id;

    console.log(`Team: ${team.name} (id ${teamId})`);

    // Insert all players
    for (const p of team.players) {
      await pool.query(
        `INSERT INTO players 
         (team_id, name, skill, sessWR, sessPA, overallWR, overallMP)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          teamId,
          p.name,
          p.skill,
          p.sessWR,
          p.sessPA,
          p.overallWR,
          p.overallMP,
        ]
      );
    }

    console.log(`Players added: ${team.players.length}`);
  }

  console.log("\nAll teams and players have been seeded!");
}

//trying to add tester player accounts
async function seedTestUsers() {
  console.log("\nSeeding test user accounts...");

  const testUsers = [
    { email: "ryan.hogans@bip.com", playerName: "Ryan Hogans" },
    { email: "mary.davies@bip.com", playerName: "Mary Davies" },
    { email: "alec.cordobes@bip.com", playerName: "Alec Cordobes" },
    { email: "groundhog@bip.com", playerName: "Groundhog Eaglin" },
    { email: "alysha.waldren@bip.com", playerName: "Alysha Waldren" },
  ];

  const passwordHash = await bcrypt.hash("test123", 10);

  for (const u of testUsers) {
    const playerRes = await pool.query(
      `SELECT id, team_id FROM players WHERE name = $1`,
      [u.playerName]
    );

    if (playerRes.rows.length === 0) {
      console.log(`Player not found for: ${u.email}`);
      continue;
    }

    const player = playerRes.rows[0];

    await pool.query(
      `INSERT INTO users (email, password_hash, role, name, player_id, team_id)
       VALUES ($1, $2, 'player', $3, $4, $5)
       ON CONFLICT (email) DO NOTHING`,
      [u.email, passwordHash, u.playerName, player.id, player.team_id]
    );

    console.log(`Created test account: ${u.email}`);
  }
}


//main seeder
async function seed() {
  console.log("=== Running BIP Seeder ===\n");

  try {
    await seedTeamsAndPlayers();
    await seedTestUsers();
  } catch (err) {
    console.error("SEED ERROR:", err);
  } finally {
    pool.end();
    console.log("\n=== Seeding Complete ===");
  }
}

seed();
