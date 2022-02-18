import { useEffect, useState } from "react"

import axios from "axios"

import Coin from "../Coin/Coin"
import { ICoin } from "../Coin/interfaces"
import { coinGeckoURLs } from '../../utils/coinGeckoApiURLs'
import TopCoinsPagination from "./TopCoinsPagination"
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";


export default () => {
    const [coins, setCoins] = useState<ICoin[]>()
    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [search, setSearch] = useState<boolean>(false)

    const cryptos = useSelector((root: RootState) => root.marketCapPercentage.cryptos)

    useEffect(() => {
        (async () => {
            const response = await axios.get(coinGeckoURLs.coins(perPage, page))
            response.status === 200 && setCoins(response.data)
        })()
    }, [page, perPage])
    if (coins)
        return <div className="top-coins">
            <TopCoinsPagination page={page} search={search} setPage={setPage} setSearch={setSearch}
                                setPerPage={setPerPage} maxPage={Math.round(cryptos / perPage)}/>
            <div className="top-coins__header">
                <div className="top-coins__header__field">
                    <p className="top-coins__header__field__content">Name</p>
                </div>
                <div className="top-coins__header__field">
                    <p className="top-coins__header__field__content">Price</p>
                </div>
                <div className="top-coins__header__field">
                    <p className="top-coins__header__field__content">Change 24h</p>
                </div>
                <div className="top-coins__header__field">
                    <p className="top-coins__header__field__content">Market Cap</p>
                </div>
                <div className="top-coins__header__field">
                    <p className="top-coins__header__field__content">Circulating Supply</p>
                </div>
            </div>
            {coins.map((coin: ICoin, index: number) => <Coin coin={coin} index={index}/>)}
            <TopCoinsPagination page={page} search={search} setPage={setPage} setSearch={setSearch}
                                setPerPage={setPerPage} maxPage={Math.round(cryptos / perPage)}/>
        </div>
    else
        return <></>
}
