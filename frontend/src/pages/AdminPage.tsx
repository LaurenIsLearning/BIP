import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../style/AdminPage.css";

function AdminPage() {
    return (
        <>
            <NavBar />

            <section className="admin-hero">
                <h1>Admin Panel</h1>
                <p>Manage Teams, Players, and League Data</p>
            </section>

            <section className="admin-options">
                <h2>Actions</h2>
                <div className="admin-buttons">
                    <button>Add Team</button>
                    <button>Edit Team</button>
                    <button>Add Player</button>
                    <button>Edit Player</button>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default AdminPage;
