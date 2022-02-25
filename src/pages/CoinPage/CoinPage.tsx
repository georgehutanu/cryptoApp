import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"
import axios from "axios"

import { coinGeckoURLs } from "../../utils/coinGeckoApiURLs"
import CoinChart from "../../components/CoinChart/CoinChart"
import TopSection from "../../components/TopSection/TopSection"
import CoinInfo from "../../components/CoinInfo/CoinInfo"
import SearchBar from "../../components/SearchBar/SearchBar"


export default () => {
    const [coin, setCoin] = useState()
    const [coinID, setCoinID] = useState('')
    const [coinInfo, setCoinInfo] = useState()
    const [prices, setPrices] = useState([])
    const [dates, setDates] = useState([])

    const params = useParams()

    useEffect(() => {
        (async () => {
            const response = params.coin && await axios.get(coinGeckoURLs.coin(params.coin))
            response && response.status === 200 && setCoin(response.data.coins[0])
            response && response.status === 200 && setCoinID(response.data.coins[0].id)
        })()
    }, [params.coin])

    useEffect(() => {
        (async () => {
            const response = coinID && await axios.get(coinGeckoURLs.coinMarketHistory(coinID, 1))
            response && response.status === 200 && setPrices(response.data.prices.map((price: [number, number]) => price[1].toFixed(2)))
            response && response.status === 200 && setDates(response.data.prices.map((price: [number, number]) => new Date(price[0]).getUTCDate()))
        })()
    }, [coinID])

    useEffect(() => {
        (async () => {
            const response = coinID && await axios.get(coinGeckoURLs.coinInfo(coinID))
            response && response.status === 200 && setCoinInfo(response.data)
        })()
    }, [coinID])

    return coin && coinInfo ?
        <div className="coin-page">
            <TopSection/>
            <SearchBar/>
            <CoinInfo coin={coinInfo}/>
            <CoinChart prices={prices} dates={dates}/>
        </div> :
        <> </>
}