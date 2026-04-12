import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bar">
            <div className="nav-logo">
                <img src="/Movex.png" style={{ width: "35px", height: "35px", borderRadius: "50%" }} />
            </div>

            {/* Hamburger button - only visible on mobile */}
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Nav links - collapse on mobile */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <ul className="items">
                    <Link to="/" onClick={() => setMenuOpen(false)}><li>Home</li></Link>
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}><li>Dashboard</li></Link>
                    <Link to="/exercises" onClick={() => setMenuOpen(false)}><li>Exercises</li></Link>
                    <Link to="/LogWorkout" onClick={() => setMenuOpen(false)}><li>Log Exercises</li></Link>
                    <Link to="/Sahay" onClick={() => setMenuOpen(false)}><li>S.A.H.A.Y</li></Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}><li>About</li></Link>
                </ul>
                <ul className="items">
                    <Link to="/Login" onClick={() => setMenuOpen(false)}><li>Sign in</li></Link>
                    <Link to="/Signup" onClick={() => setMenuOpen(false)}><li>Sign up</li></Link>
                    <Link to="/logout" onClick={() => setMenuOpen(false)}><li>Logout</li></Link>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
