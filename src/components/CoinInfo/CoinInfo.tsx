import { useEffect } from "react"
import transformLargeNumberInReadableNumber from "../../utils/transformLargeNumberInReadableNumber";


export default ({ coin }: { coin: any }) => {
    useEffect(() => {

    }, [])

    return <div className="coin-info">
        <div className="coin-info__main-data">
            <div className="coin-info__main-data__name">
                <div className="coin-info__main-data__name__additional-info">
                    <div className="coin-info__main-data__name__additional-info__rank">
                        <p className="coin-info__main-data__name__additional-info__rank--content">{coin.market_cap_rank}</p>
                    </div>
                    <div className="coin-info__main-data__name__additional-info__symbol">
                        <p className="coin-info__main-data__name__additional-info__symbol--content">{coin.symbol.toUpperCase()}</p>
                    </div>
                </div>
                <div className="coin-info__main-data__name__image">
                    <img className="coin-info__main-data__name__image--content" src={coin.image.large} alt="coinImage"/>
                </div>
                <div className="coin-info__main-data__name">
                    <div className="coin-info__main-data__name--content">
                        {coin.name}
                    </div>
                </div>
            </div>
            <div className="coin-info__main-data__price">
                <p className="coin-info__main-data__price--content">Price&nbsp; {transformLargeNumberInReadableNumber(coin.market_data.current_price.usd)}</p>
            </div>
            <div className="coin-info__main-data__ath">
                <p className="coin-info__main-data__ath--content">ATH&nbsp; {transformLargeNumberInReadableNumber(coin.market_data.ath.usd)}</p>
            </div>
            <div className="coin-info__main-data__ath--date">
                <p className="coin-info__main-data__ath--date--content">
                    ATH date &nbsp;{new Date(coin.market_data.ath_date.usd).getDate()}&nbsp;{new Date(coin.market_data.ath_date.usd).getUTCMonth()}&nbsp;{new Date(coin.market_data.ath_date.usd).getFullYear()}
                </p>
            </div>

        </div>
        <div className="coin-info__secondary-data">
            <div className="coin-info__secondary-data__scores">
                <div className="coin-info__secondary-data__scores--developer">
                    <p className="coin-info__secondary-data__scores--developer--content">Developer
                        score&nbsp;{coin.developer_score.toFixed(2)}</p>
                </div>
                <div className="coin-info__secondary-data__scores--community">
                    <p className="coin-info__secondary-data__scores--community--content">Community
                        score&nbsp;{coin.community_score.toFixed(2)}</p>
                </div>
            </div>
            <div className="coin-info__secondary-data__market-info">
                <div className="coin-info__secondary-data__market-info__market-cap">
                    <div className="coin-info__secondary-data__market-info__market-cap--quantum">
                        <p className="coin-info__secondary-data__market-info__market-cap--quantum--content">
                            Market
                            cap {transformLargeNumberInReadableNumber(coin.market_data.market_cap.usd)} {coin.symbol.toUpperCase()}
                        </p>
                    </div>
                    <div className="coin-info__secondary-data__market-info__market-cap-24h--quantum">
                        <p className="coin-info__secondary-data__market-info__market-cap-24h--quantum--content">
                            {coin.market_data.market_cap_change_percentage_24h.toFixed(2)} %
                        </p>
                    </div>
                </div>
                <div className="coin-info__secondary-data__market-info__supply">
                    <div className="coin-info__secondary-data__market-info__supply--quantum">
                        <p className="coin-info__secondary-data__market-info__supply--quantum--content">
                            Total
                            supply {transformLargeNumberInReadableNumber(coin.market_data.max_supply)} {coin.symbol.toUpperCase()}
                        </p>
                    </div>
                    <div className="coin-info__secondary-data__market-info__supply-total--quantum">
                        <p className="coin-info__secondary-data__market-info__supply-total--quantum--content">
                            Max
                            supply {transformLargeNumberInReadableNumber(coin.market_data.total_supply)} {coin.symbol.toUpperCase()}
                        </p>
                    </div>
                    <div className="coin-info__secondary-data__market-info__circulating-supply--quantum">
                        <p className="coin-info__secondary-data__market-info__circulating-supply--quantum--content">
                            Circulating
                            supply {transformLargeNumberInReadableNumber(coin.market_data.circulating_supply)} {coin.symbol.toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}