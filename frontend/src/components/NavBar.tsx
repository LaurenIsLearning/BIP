import logo from "../ball15.png";
import { Link } from "react-router-dom";
import styles from "../style/NavBar.module.css";
import { useContext, useState } from 'react';
import {AuthContext} from './AuthContext.tsx';
//import UserContext from './UserContext.js';

function NavBar() {
  const auth  = useContext(AuthContext);
  const user = auth?.user;

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
          {!user && (
            <Link to={"/Login"}>
              <button className="button_light">Login</button>
            </Link>
          )}
          {user && (
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
