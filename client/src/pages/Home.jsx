import "../styles/home.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

function Home() {
    return (
        <div className="home">
            <Navbar />
            <Hero />
        </div>
    );
}

export default Home;