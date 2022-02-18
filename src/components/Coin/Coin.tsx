import transformLargeNumberInReadableNumber from "../../utils/transformLargeNumberInReadableNumber"
import { ICoin, ICoinProps } from "./interfaces"


export default ({ coin, index }: ICoinProps<ICoin>) => {
    return <div className="coin" key={index}>
        <div className="coin__field">
            <p className="coin__field--rank">{coin.market_cap_rank}&nbsp;&nbsp;&nbsp;</p>
            <div className="coin__field--image">
                <img className="coin__field--image--content" src={coin.image} alt="coin"/>
            </div>
            <p className="coin__field__content">{coin.name}&nbsp;{coin.symbol.toUpperCase()}</p>
        </div>
        <div className="coin__field">
            <p className="coin__field__content">
                $&nbsp;{coin.current_price > 1000 ? transformLargeNumberInReadableNumber(coin.current_price) : coin.current_price}
            </p>
        </div>
        <div className="coin__field">
            <p className={`coin__field__content &nbsp; ${coin.price_change_percentage_24h > 0 ? "coin__field__content--change-24h--up" : "coin__field__content--change-24h--down"}`}>
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