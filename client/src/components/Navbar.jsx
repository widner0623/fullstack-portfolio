import {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/navbar.css";

function Navbar () {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="navbar">
            <h2 className="logo">Redline Labs</h2>

        {/* Desktop Links */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
               <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
               <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
               <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>

            <div
                className={`overlay ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
            ></div>
            
        {/* Mobile View */}
            <div
                className={`hamburger ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}

export default Navbar;