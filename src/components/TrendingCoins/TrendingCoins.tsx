import { useEffect, useState } from "react"

import axios from "axios"

import TrendingCoin from "../TrendingCoin/TrendingCoin"
import { ITrendingCoin } from "../TrendingCoin/interfaces"
import { coinGeckoURLs } from "../../utils/coinGeckoApiURLs"


export default () => {
    const [trendingCoins, setTrendingCoins] = useState<{ item: ITrendingCoin }[]>()
    const [smallViewTrending, setSmallViewTrending] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            const response = await axios.get(coinGeckoURLs.trending)
            setTrendingCoins(response.data.coins)
        })()
    }, [smallViewTrending])

    return trendingCoins ?
        <div className="trending-coins">
            <div className="trending-coins__title">
                <h3 className="trending-coins__title--content">Trending Coins</h3>
                <div className="trending-coins__more">
                    <p className="trending-coins__more--content" onClick={() => {
                        setSmallViewTrending((prev: boolean) => !prev)
                    }}>{'More >'}</p>
                </div>
            </div>
            {smallViewTrending ?
                trendingCoins.map((coin: { item: ITrendingCoin }, index: number) =>
                    (index < 3) && <TrendingCoin coin={coin} key={index}/>) :
                trendingCoins.map((coin: { item: ITrendingCoin }, index: number) =>
                    <TrendingCoin coin={coin} key={index}/>)
            }
        </div> :
        <></>
}