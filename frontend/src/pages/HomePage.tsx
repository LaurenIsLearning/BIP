import NavBar from "../components/NavBar";
import HomeHero from "../components/HomeHero";
import RankingsPreview from "../components/RankingsPreview";
import "../style/HomePage.css"
import Footer from "../components/Footer";
import TeamSearchBar from "../components/TeamSearchBar";

function HomePage() {
    return (
        <>
            <NavBar />
            <HomeHero />
            <RankingsPreview />
            <TeamSearchBar />
            <Footer />
        </>
    )
}

export default HomePage;