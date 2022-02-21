import { useEffect, useState } from "react"

import transformLargeNumberInReadableNumber from "../../utils/transformLargeNumberInReadableNumber"
import { ICoin, ICoinProps } from "./interfaces"


export default ({ coin }: ICoinProps<ICoin>) => {
    const [positivePriceChange, setPositivePriceChange] = useState(false)

    useEffect(() => {
        setPositivePriceChange(coin.price_change_percentage_24h > 0)
    }, [])

    return <div className="coin">
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
    </div>
}