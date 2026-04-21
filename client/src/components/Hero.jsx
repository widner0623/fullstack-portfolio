import "../styles/hero.css"
import profileImg from "../assets/profileImg.jpg";
import { Link } from "react-router-dom"

function Hero() {
    return (
        <section className="hero">
            <img src={profileImg} alt="Derrick Widner" className="hero-img"></img>

            <h1>Derrick Widner</h1>
            <h3>Full Stack Developer</h3>

            <p>
                Building modern web experiences with clean design and powerful backend systems.
            </p>

            <div className="hero-buttons">
                <Link className="link-button" to="/projects">View Projects</Link>
                <Link className="link-button" to="/contact">Contact Me</Link>
            </div>
        </section>
    );
}

export default Hero;