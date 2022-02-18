import { ICoinProps } from "../Coin/interfaces"
import { ITrendingCoin } from "./interfaces"


export default ({coin, index}: ICoinProps<{item: ITrendingCoin}>) => {
    return <div className="trending-coin" key={index}>
        <div className="trending-coin__field">
            <p className="trending-coin__field--score">{coin.item.score + 1}</p>
            <div className="trending-coin__field__image">
                <img className="trending-coin__field__image--content" src={coin.item.small} alt="coin"/>
            </div>
            <p className="trending-coin__field__content">{coin.item.name}&nbsp;{coin.item.symbol}</p>
        </div>
    </div>
}
