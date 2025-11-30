import styles from "../style/AdminEditTeamPanel.module.css";
import { Team } from "../models/Team";

type Props = {
    team: Team;
    onBack?: () => void;
};

function AdminEditTeamPanel({ team, onBack }: Props) {
    return (
        <section className={styles.panelContainer}>
            <h1 className={styles.heading}>Edit Team</h1>

            <p className={styles.subText}>
                You are now editing <strong>{team.name}</strong>.
            </p>

            <button className={styles.backButton} onClick={onBack}>
                ⬅ Back to Manage Teams
            </button>

            {/* Placeholder for future fields */}
            <div className={styles.placeholderBox}>
                <p>Team editing tools will go here.</p>
            </div>
        </section>
    );
}

export default AdminEditTeamPanel;
