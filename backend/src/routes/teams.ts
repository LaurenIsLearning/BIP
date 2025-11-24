import express from "express";
import { pool } from "../db.js"

const router = express.Router();

//GET /api/teams ::to get list of teams
//GET /api/teams :: get list of teams
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, points FROM teams ORDER BY id`
    );

    // Map DB → FE model
    const formatted = result.rows.map(t => ({
      teamId: t.id.toString(),
      name: t.name,
      points: t.points,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching teams");
  }
});

//GET /api/teams/:id ::get one team and its players
r//GET /api/teams/:id :: get one team and its players
router.get("/:id", async (req, res) => {
  try {
    const query = `
      SELECT 
        t.id,
        t.name,
        t.points,
        COALESCE(json_agg(p.* ORDER BY p.id), '[]'::json) AS players
      FROM teams t
      LEFT JOIN players p ON t.id = p.team_id
      WHERE t.id = $1
      GROUP BY t.id;
    `;

    const result = await pool.query(query, [req.params.id]);

    if (!result.rows.length) {
      return res.status(404).json({ message: "Team not found" });
    }

    const row = result.rows[0];

    // Map database to frontend model
    const formatted = {
      teamId: row.id.toString(),
      name: row.name,
      points: row.points,
      players: row.players.map((p) => ({
        playerId: p.id.toString(),
        name: p.name,
        skill: p.skill,
        sessWR: p.sesswr,
        sessPA: p.sesspa,
        overallWR: p.overallwr,
        overallMP: p.overallmp,
        played: false,
      })),
    };

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching team");
  }
});


export default router;