import { useState } from "react";
import NavBar from "../components/NavBar";
import AdminSidebar from "../components/admin/AdminSidebar.tsx";
import AdminContent from "../components/admin/AdminContent.tsx";
import styles from "../style/AdminPage.module.css";

export type AdminTool = "addTeam" | "editTeam" | "addPlayer" | "editPlayer";

export default function AdminPage() {
  const [activeTool, setActiveTool] = useState<AdminTool>("addTeam");

  return (
    <main className={styles.page}>
      <NavBar />

      <div className={styles.layout}>
        <AdminSidebar active={activeTool} onSelect={setActiveTool} />

        <div className={styles.content}>
          <AdminContent tool={activeTool} />
        </div>
      </div>
    </main>
  );
}
