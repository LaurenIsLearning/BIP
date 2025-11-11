// each route is an endpoint
import express from "express";
import { pool } from "../db.js"

const router = express.Router();

//GET /api/teams ::to get list of teams
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching teams");
  }
});

//GET /api/teams/:id ::get one team and its players
router.get("/:id", async (req, res) => {
  try {
    const query = `
      SELECT t.*, json_agg(p.*) AS players
      FROM teams t
      JOIN players p ON t.id = p.team_id
      WHERE t.id = $1
      GROUP BY t.id;
    `;
    const result = await pool.query(query, [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching team");
  }
});

export default router;