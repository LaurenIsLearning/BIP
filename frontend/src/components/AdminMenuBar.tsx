import styles from "../style/AdminMenuBar.module.css";

//to select buttons to change main side
type Props = {
    onSelect: (panel: string) => void;
    active: string;
}

function AdminMenuBar({ onSelect, active }: Props) {
    return (
        <nav className={styles.menuBar}>
            <header className={styles.menuLabel}> Admin Dashboard
            </header>

            <menu className={styles.menuButtons}>
                <button
                    className={active === "home" ? styles.active : ""}
                    onClick={() => onSelect("home")}
                >
                    Overview
                </button>

                <button
                    className={active === "manage-teams" ? styles.active : ""}
                    onClick={() => onSelect("manage-teams")}
                >
                    Manage Teams
                </button>

                <button
                    className={active === "manage-accounts" ? styles.active : ""}
                    onClick={() => onSelect("manage-accounts")}
                >
                    Manage Accounts
                </button>

            </menu>
        </nav>
    );
}

export default AdminMenuBar;
