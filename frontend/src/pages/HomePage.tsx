import NavBar from "../components/NavBar";
import HomeHero from "../components/HomeHero";
import RankingsPreview from "../components/RankingsPreview";
import "../style/HomePage.css"

function HomePage() {
    return (
        <>
            <NavBar />
            <HomeHero />
            <RankingsPreview />
        </>
    )
}

export default HomePage;