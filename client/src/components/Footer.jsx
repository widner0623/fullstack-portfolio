import "../styles/footer.css";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>Derrick Widner</h3>

                <p>Full Stack Developer</p>

                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/contact">Contact</Link>
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