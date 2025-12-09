import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// get all players
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                players.id,
                players.name,
                players.skill,
                players.sesswr,
                players.sesspa,
                players.overallwr,
                players.overallmp,
                players.team_id,
                teams.name AS team_name
            FROM players
            LEFT JOIN teams ON players.team_id = teams.id
            ORDER BY players.id;
        `);

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching all players:", err);
        res.status(500).json({ error: "Database fetch failed" });
    }
});


//update existing player
router.put("/update", async (req, res) => {
    const { teamId, player } = req.body;

    if (!player || !teamId) {
        return res.status(400).json({ error: "Missing teamId or player data " });
    }

    try {
        await pool.query(
            `
            UPDATE players
            SET name = $1,
                skill = $2,
                sesswr = $3,
                sesspa = $4,
                overallwr = $5,
                overallmp = $6
            WHERE id = $7 AND team_id = $8
            `,
            [
                player.name,
                player.skill,
                player.sessWR,
                player.sessPA,
                player.overallWR,
                player.overallMP,
                player.playerId,
                teamId
            ]
        );

        res.json({ message: "Player updated successfully" });
    } catch (err) {
        console.error("Error updating player:", err);
        res.status(500).json({ error: "Database update failed" });
    }

});

//create a new player
router.post("/add", async (req, res) => {
    const { teamId, player } = req.body;

    if (!player || !teamId) {
        return res.status(400).json({ error: "Missing teamId or player data" });
    }
    try {
        const result = await pool.query(
            `
        INSERT INTO players (team_id, name, skill, sesswr, sesspa, overallwr, overallmp)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `,
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

        res.json({
            message: "Player created successfully",
            playerId: result.rows[0].id.toString(),
        });
    } catch (err) {
        console.error("Error creating player:", err);
        res.status(500).json({ error: "Database insert failed" });
    }
});

//delete a player
router.delete("/:playerId", async (req, res) => {
    const { playerId } = req.params;
    try {
        const result = await pool.query(
            `DELETE FROM players WHERE id = $1 RETURNING id`,
            [playerId]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Player not found" });
        }
        res.json({ message: "Player found successfully" });
    } catch (err) {
        console.error("Error deleting player:", err);
        res.status(500).json({ error: "Database delete failed" });
    }
});

export default router;