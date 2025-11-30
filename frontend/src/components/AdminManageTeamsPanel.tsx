import styles from "../style/AdminManageTeamsPanel.module.css";
import { Team } from "../models/Team";

type Props = {
    teams: Team[]
    onSelectTeam: (teamId: string) => void;
};

function AdminManageTeamsPanel({ teams, onSelectTeam }: Props) {
    return (
        <section className={styles.panelContainer}>
            <h1 className={styles.heading}>Manage Teams</h1>

            {teams.length === 0 && (
                <p>No teams in database.</p>
            )}

            <ul className={styles.teamList}>
                {teams.map(team => (
                    <li
                        key={team.teamId}
                        className={styles.teamItem}
                        onClick={() => onSelectTeam(team.teamId)}
                    >
                        <strong>{team.name}</strong> - {team.points} pts
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default AdminManageTeamsPanel;
