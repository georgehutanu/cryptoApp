import { useEffect, useState } from 'react'

import { useDispatch } from "react-redux"
import axios from 'axios'

import { IDominance } from "./interfaces"
import { coinGeckoURLs } from '../../utils/coinGeckoApiURLs'
import { saveMarketCapPercentage24h } from '../../actions/'
import transformLargeNumberInReadableNumber from "../../utils/transformLargeNumberInReadableNumber";


export default () => {
    const [cryptos, setCryptos] = useState<number>(0)
    const [marketCap, setMarketCap] = useState<number>(0)
    const [dominance, setDominance] = useState<IDominance>({ btc: 0, eth: 0 })
    const [volume24h, setVolume24h] = useState<number>(0)
    const [ethGas, setEthGas] = useState<number>(0)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const response = await axios.get(coinGeckoURLs.global)
            if (response.status === 200) {
                setCryptos(response.data.data.active_cryptocurrencies)
                setDominance(response.data.data.market_cap_percentage)
                setMarketCap(response.data.data.total_market_cap.usd)
                setVolume24h(response.data.data.total_volume.usd)
            }

            const gweiValueApi = await axios.get(coinGeckoURLs.gwei)
            gweiValueApi.status === 200 && setEthGas(gweiValueApi.data.average / 10)

            dispatch(saveMarketCapPercentage24h({
                marketCapPercentage24h: response.data.data.market_cap_change_percentage_24h_usd,
                marketCap: response.data.data.total_market_cap.usd,
                cryptos: response.data.data.active_cryptocurrencies
            }))
        })()
    }, [])

    return <>
        <div className="top-info-bar">
            <ul className="top-info-bar__list">
                {}
                <li className="top-info-bar__list--element">
                    Cryptos: &nbsp;
                    <span
                        className="top-info-bar__list--element--value">{transformLargeNumberInReadableNumber(cryptos)}</span>
                </li>
                <li className="top-info-bar__list--element">Market Cap: &nbsp;
                    <span className="top-info-bar__list--element--value">
                        ${transformLargeNumberInReadableNumber(marketCap)}
                    </span>
                </li>
                <li className="top-info-bar__list--element">24h Vol: &nbsp;
                    <span className="top-info-bar__list--element--value">
                        ${transformLargeNumberInReadableNumber(volume24h)}
                    </span>
                </li>
                <li className="top-info-bar__list--element">Dominance: &nbsp;
                    <span className="top-info-bar__list--element--value">
                        BTC: {dominance.btc.toFixed(1)}% &nbsp; ETH: {dominance.eth.toFixed(1)}%
                    </span>
                </li>
                <li className="top-info-bar__list--element">ETH Gas: &nbsp;
                    <span className="top-info-bar__list--element--value">{ethGas}&nbsp; Gwei</span></li>
            </ul>
        </div>
    </>
}


