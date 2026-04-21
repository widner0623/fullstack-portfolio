import "../styles/footer.css";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaCommentDots } from "react-icons/fa";

function Footer() {
     const location = useLocation();
        const handleNavClick = (path) => {
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
                    <Link to="/" onClick={() => handleNavClick("/")}>Home</Link>
                    <Link to="/projects" onClick={() => handleNavClick("/projects")}>Projects</Link>
                    <Link to="/contact" onClick={() => handleNavClick("/contact")}>Contact</Link>
                </div>

                <div className="footer-socials">
                    <a href="https://linkedin.com/in/derrick-w-549757211/" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/widner0623/" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://Facebook.com/derrick.widner.7/" target="_blank" rel="noreferrer">
                        <FaFacebook />
                    </a>
                    <a  href="sms:+15093368537" rel="noreferrer">
                        <FaCommentDots />
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