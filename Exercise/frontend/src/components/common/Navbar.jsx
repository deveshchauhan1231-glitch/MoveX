import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="bar">
            <div className="nav-shell">
                <div className="nav-left">
                    <Link to="/" className="brand-link" onClick={closeMenu}>
                        <img src="/sh.png" alt="MoveX logo" className="brand-logo" />
                        <span className="brand-name">MoveX</span>
                    </Link>

                    <ul className="items items-primary desktop-only">
                        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                        <li><Link to="/exercises" onClick={closeMenu}>Exercises</Link></li>
                        <li><Link to="/LogWorkout" onClick={closeMenu}>Log Exercises</Link></li>
                        <li><Link to="/Sahay" onClick={closeMenu}>S.A.H.A.Y</Link></li>
                        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                    </ul>
                </div>

                <ul className="items items-secondary desktop-only">
                    <li><Link to="/Login" onClick={closeMenu}>Sign in</Link></li>
                    <li><Link to="/Signup" onClick={closeMenu}>Sign up</Link></li>
                    <li><Link to="/logout" onClick={closeMenu}>Logout</Link></li>
                </ul>

                <button
                    type="button"
                    className={`nav-toggle ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`nav-panel ${menuOpen ? "open" : ""}`}>
                    <ul className="items items-mobile">
                        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                        <li><Link to="/exercises" onClick={closeMenu}>Exercises</Link></li>
                        <li><Link to="/LogWorkout" onClick={closeMenu}>Log Exercises</Link></li>
                        <li><Link to="/Sahay" onClick={closeMenu}>S.A.H.A.Y</Link></li>
                        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                        <li><Link to="/Login" onClick={closeMenu}>Sign in</Link></li>
                        <li><Link to="/Signup" onClick={closeMenu}>Sign up</Link></li>
                        <li><Link to="/logout" onClick={closeMenu}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
