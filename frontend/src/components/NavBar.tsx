import logo from "../ball15.png";
import { Link } from "react-router-dom";
import styles from "../style/NavBar.module.css";
import { useContext } from 'react';
import AuthContext from './AuthContext.jsx';

function NavBar() {

  return (
    <>
      <nav>
        <section className={styles.nav_left}>
          <Link to={"/"} className={styles.link}>
            <img src={logo} className={styles.nav_left_image} alt="BIP logo" />
            <h2>BIP</h2>
          </Link>
        </section>
        <section className={styles.nav_right}>
          <Link to={"/Stats"}>
            <button className="button_light">View Team</button>
          </Link>
          <Link to={"/Comparison"}>
              <button className="button_light">Team Comparison Page</button>
          </Link>
          {(
            <Link to={"/Login"}>
              <button className="button_light">Login</button>
            </Link>
          )}
          { (
            <Link to={"/Profile"}>
              <button className="button_light">Profile</button>
            </Link>
          )}
        </section>
      </nav>
    </>
  );
}

export default NavBar;
