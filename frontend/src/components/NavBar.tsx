import logo from "../ball15.png"

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
                <button>Compare Teams</button>
                <button>Login</button>
            </section>
        </nav>
        </> 
    )
}

export default NavBar;