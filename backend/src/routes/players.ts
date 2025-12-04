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