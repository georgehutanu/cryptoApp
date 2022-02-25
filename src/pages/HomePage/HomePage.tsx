import TopSection from "../../components/TopSection/TopSection"
import TopCoins from "../../components/TopCoins/TopCoins"
import TrendingCoins from "../../components/TrendingCoins/TrendingCoins"
import SearchBar from "../../components/SearchBar/SearchBar"


export default () => {
    return <div className="home-page--wrap">
        <div className="home-page">
            <TopSection/>
            <SearchBar/>
            <div className="home-page__daily-info">
                <TrendingCoins/>
                <TrendingCoins/>
                <TrendingCoins/>
            </div>
            <TopCoins/>
        </div>
    </div>
}