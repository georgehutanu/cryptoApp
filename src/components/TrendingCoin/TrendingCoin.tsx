import { ICoinProps } from "../Coin/interfaces"
import { ITrendingCoin } from "./interfaces"


export default ({ coin }: ICoinProps<{ item: ITrendingCoin }>) => {
    return <div className="trending-coin">
        <div className="trending-coin__field">
            <p className="trending-coin__field--score">{coin.item.score + 1}</p>
            <div className="trending-coin__field__image">
                <img className="trending-coin__field__image--content" src={coin.item.small} alt="coin"/>
            </div>
            <a href={`http://localhost:3000/coin/${coin.item.symbol}`}
               className="trending-coin__field__content">{coin.item.name}&nbsp;{coin.item.symbol}</a>
        </div>
    </div>
}
