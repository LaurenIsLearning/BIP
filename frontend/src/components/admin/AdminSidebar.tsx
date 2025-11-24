import styles from "../../style/AdminSidebar.module.css";
import type { AdminTool } from "../../pages/AdminPage";

interface Props {
  active: AdminTool;
  onSelect: (tool: AdminTool) => void;
}

export default function AdminSidebar({ active, onSelect }: Props) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Admin Tools</h2>

      <button
        className={active === "addTeam" ? styles.active : ""}
        onClick={() => onSelect("addTeam")}
      >
        Add Team
      </button>

      <button
        className={active === "editTeam" ? styles.active : ""}
        onClick={() => onSelect("editTeam")}
      >
        Edit Team
      </button>

      <button
        className={active === "addPlayer" ? styles.active : ""}
        onClick={() => onSelect("addPlayer")}
      >
        Add Player
      </button>

      <button
        className={active === "editPlayer" ? styles.active : ""}
        onClick={() => onSelect("editPlayer")}
      >
        Edit Player
      </button>
    </aside>
  );
}
