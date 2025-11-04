import NavBar from "../components/NavBar";
import HomeHero from "../components/HomeHero";
import RankingsPreview from "../components/RankingsPreview";
import "../style/HomePage.css"
import Footer from "../components/Footer";

function HomePage() {
    return (
        <>
            <NavBar />
            <HomeHero />
            <RankingsPreview />
            <Footer />
        </>
    )
}

export default HomePage;