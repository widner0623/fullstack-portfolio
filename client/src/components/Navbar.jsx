import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import "../styles/navbar.css";

function Navbar () {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const handleNavClick = (path) => {
        setMenuOpen(false);
        if (location.pathname === path) {
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
        } else {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });
            }, 50);
        }
    };
    return (
        <nav className="navbar">
            <h2 className="logo">Redline Labs</h2>

        {/* Desktop Links */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
               <Link to="/" onClick={() => handleNavClick("/")}>Home</Link>
               <Link to="/projects" onClick={() => handleNavClick("/projects")}>Projects</Link>
               <Link to="/contact" onClick={() => handleNavClick("/contact")}>Contact</Link>
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