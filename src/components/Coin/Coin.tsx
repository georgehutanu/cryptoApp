import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

import transformLargeNumberInReadableNumber from "../../utils/transformLargeNumberInReadableNumber"
import { ICoin, ICoinProps } from "./interfaces"
import { RootState } from "../../reducers"
import FavoriteStarIcon from "./FavoriteStarIcon"
import { addCoinToPortfolio } from "../../actions"
import { useNavigate } from "react-router-dom";


export default ({ coin, }: ICoinProps<ICoin>) => {
    const [positivePriceChange, setPositivePriceChange] = useState(false)
    const [coinAmountForPortfolio, setCoinAmountForPortfolio] = useState(0)

    const userWatchlist = useSelector((state: RootState) => state.watchlist)
    const userPortfolio = useSelector((state: RootState) => state.portfolio)
    const userID = useSelector((state: RootState) => state.user.userID)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        setPositivePriceChange(coin.price_change_percentage_24h > 0)
    }, [userWatchlist, userPortfolio])

    return <div className="coin">
        {userID !== 0 &&
            <div className="coin__field--small">
                <FavoriteStarIcon coinID={coin.id} stared={userWatchlist.includes(coin.id)}/>
            </div>}
        <a href={`http://localhost:3000/coin/${coin.symbol}`} className="coin__field">
            <p className="coin__field--rank">{coin.market_cap_rank}&nbsp;&nbsp;&nbsp;</p>
            <div className="coin__field--image">
                <img className="coin__field--image--content" src={coin.image} alt="coin"/>
            </div>
            <div className="coin__field__content">
                <p className="coin__field__content--name">{coin.name}</p>
                <p className="coin__field__content--name">{coin.symbol.toUpperCase()}</p>
            </div>
        </a>
        <div className="coin__field">
            <p className="coin__field__content">
                $&nbsp;{coin.current_price > 1000 ? transformLargeNumberInReadableNumber(coin.current_price) : coin.current_price}
            </p>
        </div>
        <div className="coin__field">
            <p className={`coin__field__content coin__field__content--change-24h${positivePriceChange ? "--up" : "--down"}`}>
                {coin?.price_change_percentage_24h?.toFixed(2)}%
            </p>
        </div>
        <div className="coin__field">
            <p className="coin__field__content">
                $&nbsp;{transformLargeNumberInReadableNumber(coin.market_cap)}
            </p>
        </div>
        <div className="coin__field">
            <p className="coin__field__content">
                {transformLargeNumberInReadableNumber(coin.circulating_supply)}&nbsp;{coin.symbol.toUpperCase()}
            </p>
        </div>
        {userID !== 0 && <div className="coin__field coin__field--portfolio">
            <p className="coin__field__content coin__field__content--portfolio coin__field__content--portfolio--positive"
               onClick={async () => {
                   dispatch(addCoinToPortfolio([{ id: coin.id, amount: coinAmountForPortfolio }]))
                   const token = await getAccessTokenSilently()
                   const response = await axios.post('http://localhost:4000/addPortfolioCoin',
                       { coinID: coin.id, userID, amount: coinAmountForPortfolio },
                       {
                           headers: { authorization: `Bearer ${token}` }
                       })
                   response.status === 200 && navigate('/userDashboard')
               }}>
                +
            </p>
            <input className="coin__field--input" type="text" placeholder="Amount"
                   value={coinAmountForPortfolio === 0 ? '' : coinAmountForPortfolio}
                   onChange={e => setCoinAmountForPortfolio(Number(e.target.value))}/>
        </div>}
    </div>
}