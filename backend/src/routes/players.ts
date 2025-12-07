import express from "express";
import { pool } from "../db.js";

const router = express.Router();

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
            WHERE id = $7 and team_id = $8
            `,
            [
                player.name,
                player.skill,
                player.sessWR,
                player.sessPA,
                player.overallWP,
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
            return res.status(404).json({error: "Player not found"});
        }
        res.json({message:"Player found successfully"});
    } catch (err) {
        console.error("Error deleting player:", err);
        res.status(500).json({error: "Database delete failed"});
    }
});

export default router;