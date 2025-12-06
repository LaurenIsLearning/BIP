import logo from "../ball15.png";
import { Link } from "react-router-dom";
import styles from "../style/NavBar.module.css";

function NavBar() {
  return (
    <>
      <nav>
        <section className={styles.nav_left}>
          <Link to={"/"} className={styles.link} data-testid="nav-home-link">
            <img src={logo} className={styles.nav_left_image} alt="BIP logo" />
            <h2>BIP</h2>
          </Link>
        </section>
        <section className={styles.nav_right}>
          <button className="button_light" data-testid="nav-stats-btn">
            <Link to={"/Stats"}>View Team</Link>
          </button>
          <button className="button_light" data-testid="nav-compare-btn">
            <Link to={"/Comparison"}>Team Comparison Page</Link>
          </button>
          <button className="button_light" data-testid="nav-login-btn">
            <Link to={"/Login"}>Login</Link>
          </button>
        </section>
      </nav>
    </>
  );
}

export default NavBar;
