import express from "express";
import { pool } from "../db.js";

const router = express.Router();

//GET /api/teams ::to get list of teams
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.id, t.name, t.points, vr.ranking AS ranking
       FROM teams t
       JOIN v_team_rankings vr ON vr.id = t.id
       ORDER BY vr.ranking ASC`
    );

    // Map DB → FE model
    const formatted = result.rows.map((t) => ({
      teamId: t.id.toString(),
      name: t.name,
      points: t.points,
      ranking: t.ranking,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching teams");
  }
});

//GET /api/teams/:id ::get one team and its players
router.get("/:id", async (req, res) => {
  try {
    const query = `
      SELECT 
        t.id,
        t.name,
        t.points,
        vr.ranking AS ranking,
        COALESCE(json_agg(p.* ORDER BY p.id), '[]'::json) AS players
      FROM teams t
      JOIN v_team_rankings vr ON vr.id = t.id
      LEFT JOIN players p ON t.id = p.team_id
      WHERE t.id = $1
      GROUP BY t.id, t.name, t.points, vr.ranking;
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
      ranking: row.ranking,
      players: row.players.map((p) => ({
        playerId: p.id.toString(),
        name: p.name,
        skill: p.skill,
        sessWR: p.sesswr,
        sessPA: p.sesspa,
        overallWR: p.overallwr,
        overallMP: p.overallmp,
      })),
    };

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching team");
  }
});

//update team with new form data
router.put("/update", async (req, res) => {
  const { teamId, name, points } = req.body;

  if (!teamId || name === undefined || points === undefined) {
    return res.status(400).json({ error: "Missing teamId, name, or points" })
  }

  try {
    const result = await pool.query(
      `
      UPDATE teams
      SET name = $1,
        points = $2,
      WHERE id = $3,
      `,
      [name, points, teamId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json({ message: "Team updated successfully" });
  } catch (err) {
    console.error("Error updating team:", err);
    res.status(500).json({ error: "Database update failed" });
  }
});

//delete team and its players
router.delete("/:teamId", async (req, res) => {
  const { teamId } = req.params;

  try {
    //delete players first
    await pool.query(
      `DELETE FROM players WHERE team_id = $1`,
      [teamId]
    );

    //delete team
    const result = await pool.query(
      `DELETE FROM teams WHERE id = $1 RETURNING id`,
      [teamId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Team not round"
      });
    }
    res.json({
      message: "Team and all players deleted successfully."
    });
  } catch (err) {
    console.error("Error deleting team:", err);
    res.status(500).json({ error: "Database delete failed" });
  }

});

export default router;
