import "../styles/hero.css"
import heroImg from "../assets/hero.png";

function Hero() {
    return (
        <section className="hero">
            <img src={heroImg} alt="Derrick Widner" className="hero-img"></img>

            <h1>Derrick Widner</h1>
            <h3>Full Stack Developer</h3>
            
            <p>
                Building modern web experiences with clean design and powerful backend systems.
            </p>

            <div className="hero-buttons">
                <button>View Projects</button>
                <button>Contact Me</button>
            </div>
        </section>
    );
}

export default Hero;