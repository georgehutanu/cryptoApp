import { useEffect, useState } from "react"

import axios from "axios"
import { useSelector } from "react-redux"

import Coin from "../Coin/Coin"
import { ICoin } from "../Coin/interfaces"
import { coinGeckoURLs } from '../../utils/coinGeckoApiURLs'
import TopCoinsPagination from "./TopCoinsPagination"
import { RootState } from "../../reducers"
import ICoinInfo from "../CoinInfo/interfaces"


export default () => {
    const [coins, setCoins] = useState<ICoin[]>()
    const [watchlistCoins, setWatchlistCoins] = useState<ICoinInfo[]>()
    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [search, setSearch] = useState<boolean>(false)
    const [favoriteCoins, setFavoriteCoins] = useState<boolean>(false)

    const cryptos = useSelector((root: RootState) => root.marketCapPercentage.cryptos)
    const userWatchlist = useSelector((root: RootState) => root.watchlist)
    const userID = useSelector((root: RootState) => root.user.userID)

    useEffect(() => {
        (async () => {
            if (favoriteCoins && userWatchlist) {
                const result = await Promise.all(userWatchlist.map((coinID: string) => axios.get(coinGeckoURLs.coinInfo(coinID))))
                setWatchlistCoins(result.map((response) => response.status === 200 && response.data))
            } else {
                const response = await axios.get(coinGeckoURLs.coins(perPage, page))
                response.status === 200 && setCoins(response.data)
            }
        })()
    }, [page, perPage, userWatchlist, favoriteCoins])

    useEffect(() => {
        userWatchlist.length === 0 && favoriteCoins && setFavoriteCoins(false)
    }, [userWatchlist])

    return coins || watchlistCoins ?
        <div className="top-coins">
            {userWatchlist && userWatchlist.length > 0 &&
                <a className="top-coins__watchlist" onClick={() => setFavoriteCoins(prev => !prev)}>
                    {favoriteCoins ? "Top Coins" : 'Watchlist'}
                </a>}
            {!favoriteCoins &&
                <TopCoinsPagination page={page} search={search} setPage={setPage}
                                    setSearch={setSearch} setPerPage={setPerPage}
                                    maxPage={Math.round(cryptos / perPage)} perPage={perPage}/>}
            <div className="top-coins__header">
                {userID !== 0 && <div className="top-coins__header__field top-coins__header__field--small">
                    <p className="top-coins__header__field__content">Favorite</p>
                </div>}
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
                <div className="top-coins__header__field">
                    <p className="top-coins__header__field__content">Portfolio</p>
                </div>
            </div>
            {!favoriteCoins && coins ?
                coins.map((coin: ICoin, index: number) => <Coin coin={coin} key={index}/>) :
                watchlistCoins && watchlistCoins.map((coin: ICoinInfo, index: number) => {
                    const coinProps: ICoin = {
                        circulating_supply: coin.market_data.circulating_supply,
                        current_price: coin.market_data.current_price.usd,
                        image: coin.image.small,
                        market_cap: coin.market_data.market_cap.usd,
                        market_cap_rank: coin.market_cap_rank,
                        name: coin.name,
                        price_change_percentage_24h: coin.market_data.price_change_percentage_24h,
                        symbol: coin.symbol,
                        id: coin.id
                    }
                    return <Coin coin={coinProps} key={index}/>
                })}
            {!favoriteCoins &&
                <TopCoinsPagination page={page} search={search} setPage={setPage}
                                    setSearch={setSearch} setPerPage={setPerPage}
                                    maxPage={Math.round(cryptos / perPage)} perPage={perPage}/>}
        </div> : <></>
}
