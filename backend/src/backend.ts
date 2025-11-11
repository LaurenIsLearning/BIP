//main entry that launches express and registers volumes
import express from "express";
import cors from "cors";
import teamsRouter from "./routes/teams.js";
//import playersRouter from "./routes/players.js";
//import compareRouter from "./routes/compare.js";
//import rankingsRouter from "./routes/rankings.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/teams", teamsRouter);
//app.use("/api/players", playersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));