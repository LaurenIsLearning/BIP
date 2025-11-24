-- Tables
CREATE TABLE IF NOT EXISTS teams (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  points INT DEFAULT 0 CHECK (points >= 0)
);

CREATE TABLE IF NOT EXISTS players (
  id BIGSERIAL PRIMARY KEY,
  team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  skill INT CHECK (skill BETWEEN 2 AND 7),
  sessWR FLOAT CHECK (sessWR >= 0),
  sessPA FLOAT CHECK (sessPA >= 0),
  overallWR FLOAT CHECK (overallWR >= 0),
  overallMP FLOAT CHECK (overallMP >= 0)
);

--  Indexes
CREATE INDEX IF NOT EXISTS idx_players_team_id ON players (team_id);

--  Computed Views
--Tie-based ranking
CREATE OR REPLACE VIEW v_team_rankings AS
WITH stats AS (
  SELECT
    t.id,
    t.name,
    COALESCE(SUM(
      CASE
        WHEN m.team1_id = t.id THEN m.team1_points
        WHEN m.team2_id = t.id THEN m.team2_points
        ELSE 0
      END
    ), 0) AS total_points,
    COALESCE(SUM(
      CASE
        WHEN (m.team1_id = t.id AND m.team1_points > m.team2_points) OR
             (m.team2_id = t.id AND m.team2_points > m.team1_points)
        THEN 1 ELSE 0
      END
    ), 0) AS wins,
    COALESCE(SUM(
      CASE
        WHEN (m.team1_id = t.id AND m.team1_points < m.team2_points) OR
             (m.team2_id = t.id AND m.team2_points < m.team1_points)
        THEN 1 ELSE 0
      END
    ), 0) AS losses
  FROM teams t
  LEFT JOIN matches m
    ON t.id IN (m.team1_id, m.team2_id)
  GROUP BY t.id, t.name
)
SELECT
  *,
  RANK() OVER (
    ORDER BY total_points DESC, wins DESC, name ASC
  ) AS ranking
FROM stats;


---- Example Query
-- SELECT * FROM v_team_rankings
-- ORDER BY total_points DESC, wins DESC, name ASC;