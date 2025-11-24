import { useState, useEffect } from "react";
import { Team } from "../models/Team";
import { fetchAllTeams } from "../services/TeamService";

interface Props {
  onSelect: (team: Team | null) => void;
}

export default function TeamPicker({ onSelect }: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllTeams().then((t) => setTeams(t));
  }, []);

  const onSearchChange = (value: string) => {
    setSearch(value);

    const team = teams.find(
      (t) => t.teamName.toLowerCase() === value.toLowerCase()
    );

    onSelect(team || null);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Search or Select Team:</label>

      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Type team name..."
        style={{ marginRight: "8px", padding: "6px" }}
        list="team-list"
      />

      <datalist id="team-list">
        {teams.map((t) => (
          <option key={t.teamId} value={t.teamName} />
        ))}
      </datalist>

      <select
        onChange={(e) => {
          const team = teams.find((t) => t.teamId === e.target.value);
          if (team) setSearch(team.teamName);
          onSelect(team || null);
        }}
        style={{ padding: "6px" }}
      >
        <option value="">-- Choose Team --</option>
        {teams.map((t) => (
          <option key={t.teamId} value={t.teamId}>
            {t.teamName}
          </option>
        ))}
      </select>
    </div>
  );
}
