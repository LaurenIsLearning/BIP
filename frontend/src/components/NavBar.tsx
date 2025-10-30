import logo from "../ball15.png"
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
        <nav>
            <section className="nav-left">
                <img src={logo} alt="BIP logo"/>
                <h2>BIP</h2>
            </section>
            <section className="nav-right">
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