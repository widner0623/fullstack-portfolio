import "../styles/home.css";
import Hero from "../components/Hero";
import About from "../components/About";
import Amazon from "../components/Amazon";

function Home() {
    return (
        <div className="home">
            <Hero />
            <Amazon />
            <About />
            
        </div>
    );
}

export default Home;