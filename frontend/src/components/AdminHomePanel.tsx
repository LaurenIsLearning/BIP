import styles from "../style/AdminHomePanel.module.css";

function AdminHomePanel() {
    return (
        <section className={styles.homeContainer}>
            <h1 className={styles.heading}>Welcome, Administrator</h1>
            <p className={styles.subText}>
                Select a tool from the menu above to manage teams, accounts, or view BIP as a user.
            </p>
        </section>
    );
}

export default AdminHomePanel;