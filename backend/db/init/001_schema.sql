--Tables
CREATE TABLE IF NOT EXISTS TEAMS (
  ID            BIGSERIAL PRIMARY KEY, --auto increments up to large integers (bigint + sequence + nextval())
  NAME          TEXT NOT NULL UNIQUE --unique team name
);

CREATE TABLE IF NOT EXISTS MATCHES (
  ID            BIGSERIAL PRIMARY KEY, 
  MATCH_DATE    DATE NOT NULL,
  TEAM1_ID      BIGINT NOT NULL REFERENCES TEAMS(ID) ON DELETE RESTRICT, --FK1 pointing to teams(id)/wont allow team to be deleated if referenced in a match
  TEAM2_ID      BIGINT NOT NULL REFERENCES TEAMS(ID) ON DELETE RESTRICT, --FK2 pointing to teams(id)
  TEAM1_POINTS  INT NOT NULL DEFAULT 0 CHECK (TEAM1_POINTS >= 0), --check = not negative
  TEAM2_POINTS  INT NOT NULL DEFAULT 0 CHECK (TEAM2_POINTS >= 0),
  CONSTRAINT MATCHES_DISTINCT_TEAMS CHECK (TEAM1_ID <> TEAM2_ID) --distinct so dont play self
);

--Indexes (speed up queries by date & team IDs)
CREATE INDEX IF NOT EXISTS IDX_MATCHES_DATE ON MATCHES (MATCH_DATE);
CREATE INDEX IF NOT EXISTS IDX_MATCHES_TEAMS ON MATCHES (TEAM1_ID, TEAM2_ID);

--Views (computed rankings)
CREATE OR REPLACE VIEW V_TEAM_RANKINGS AS
SELECT
  T.ID,
  T.NAME,
  --sum of points for team across all matches
  COALESCE(SUM( --coalesce converts null into 0
    CASE
      WHEN M.TEAM1_ID = T.ID THEN M.TEAM1_POINTS
      WHEN M.TEAM2_ID = T.ID THEN M.TEAM2_POINTS
      ELSE 0
    END
  ), 0) AS TOTAL_POINTS,
  --number of wins for team
  COALESCE(SUM(
    CASE
      WHEN (M.TEAM1_ID = T.ID AND M.TEAM1_POINTS > M.TEAM2_POINTS) OR
           (M.TEAM2_ID = T.ID AND M.TEAM2_POINTS > M.TEAM1_POINTS)
      THEN 1 ELSE 0
    END
  ), 0) AS WINS,
  --number of losses for team
  COALESCE(SUM(
    CASE
      WHEN (M.TEAM1_ID = T.ID AND M.TEAM1_POINTS < M.TEAM2_POINTS) OR
           (M.TEAM2_ID = T.ID AND M.TEAM2_POINTS < M.TEAM1_POINTS)
      THEN 1 ELSE 0
    END
  ), 0) AS LOSSES

FROM TEAMS T
LEFT JOIN MATCHES M --include teams with 0 matches
  ON T.ID IN (M.TEAM1_ID, M.TEAM2_ID)
GROUP BY T.ID, T.NAME;

--example of querying the view for rankings
--SELECT * FROM V_TEAM_RANKINGS
--ORDER BY TOTAL_POINTS DESC, WINS DESC, NAME ASC;
