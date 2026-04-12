import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bar">
            <ul className="items">
                <li><img src="/Movex.png" style={{width:"35px", height:"35px", borderRadius:"50%", padding:"0px"}} /></li>
                <Link to="/"><li>Home</li></Link>
                <Link to="/dashboard"><li>Dashboard</li></Link>
                <Link to="/exercises"><li>Exercises</li></Link>
                <Link to="/LogWorkout"><li>Log Exercises</li></Link>
                <Link to="/Sahay"><li>S.A.H.A.Y</li></Link>
                <Link to="/about"><li>About</li></Link>
            </ul>

            {/* Hamburger - only shows on mobile */}
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className="items auth-links">
                <Link to="/Login"><li>Sign in</li></Link>
                <Link to="/Signup"><li>Sign up</li></Link>
                <Link to="/logout"><li>Logout</li></Link>
            </ul>
        </div>
    );
}

export default Navbar;
