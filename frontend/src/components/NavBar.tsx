import logo from "../ball15.png"
import { Link } from 'react-router-dom';
import styles from "../style/NavBar.module.css";

function NavBar() {
    return (
        <>
        <nav>
            <section className={styles.nav_left}>
                <Link to={"/"}>
                    <img src={logo} className={styles.nav_left_image} alt="BIP logo"/>
                    <h2>BIP</h2>
                </Link>  
            </section>
            <section className={styles.nav_right}>
                <button>View Rankings</button>
                <button><Link to={"/Comparison"}>Compare Teams</Link></button>
                <button>Look at Team </button>
                <button>Login</button>
            </section>
        </nav>
        </> 
    )
}

export default NavBar;