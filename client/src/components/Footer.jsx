import "../styles/footer.css";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
     const location = useLocation();
        const handleNavClick = (path) => {
            setMenuOpen(false);
            if (location.pathname === path) {
                window.scrollTo({
                    top: 0,
                    behavior: "instant",
                });
            }   else {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });
            }, 50);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>Derrick Widner</h3>

                <p>Full Stack Developer</p>

                <div className="footer-links">
                    <Link to="/" 
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick("/")
                        }}>Home</Link>
                    <Link to="/projects" 
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick("/projects")
                        }}>Projects</Link>
                    <Link to="/contact" 
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick("/contact")
                        }}>Contact</Link>
                </div>

                <div className="footer-socials">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://Facebook.com" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                </div>

                <p className="footer-copy">
                    &copy;{new Date().getFullYear()} Redline Labs&trade;
                </p>
            </div>
        </footer>
    );
}

export default Footer