import { useEffect, useState } from "react";
import styles from "../style/AdminManageAccountsPanel.module.css";

interface User {
  id: number;
  email: string;
  role: string;
  name: string;
  player_id: number | null;
  team_id: number | null;
  created_at: string;
}

export default function AdminManageAccountsPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  //load all users
  async function loadUsers() {
    try {
      const res = await fetch("http://localhost:3000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  }

  //delete user
  async function deleteUser(id: number) {
    if (!confirm("Are you sure you want to DELETE this account?")) return;

    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete user.");
      return;
    }

    alert("User deleted!");
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className={styles.panelContainer}>
      <h1 className={styles.heading}>Manage Accounts</h1>
      <p className={styles.subText}>View or delete all BIP user accounts.</p>

      {loading && <p>Loading users...</p>}

      {!loading && (
        <ul className={styles.userList}>
          {users.map((u) => (
            <li key={u.id} className={styles.userItem}>
              <div className={styles.userDetails}>
                <strong>{u.email}</strong>
                <span>Name: {u.name}</span>
                <span>Role: {u.role}</span>
              </div>

              <button
                className={styles.deleteButton}
                onClick={() => deleteUser(u.id)}
                disabled={u.role === "admin"}
              >
                {u.role === "admin" ? "Cannot Delete Admin" : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}