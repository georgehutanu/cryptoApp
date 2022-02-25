import { useSelector } from "react-redux"

import { RootState } from "../../reducers"
import transformLargeNumberInReadableNumber from "../../utils/transformLargeNumberInReadableNumber";


export default () => {
    const marketCapPercentage = useSelector((state: RootState) => state.marketCapPercentage)

    return <div className="title-section">
        <div className="title-section__title">
            <h1 className="title-section__title--content">
                <a className="title-section__title--content--link" href="http://localhost:3000">CryptoMarketCap</a>
            </h1>
            <h4 className="title-section__title--subtitle">
                The global crypto market cap is ${transformLargeNumberInReadableNumber(marketCapPercentage.marketCap)},
                a {marketCapPercentage.marketCapPercentage24h.toFixed(2)}% {`${marketCapPercentage.marketCapPercentage24h < 0 ? 'decrease' : 'increase'}`} over
                the last day.
            </h4>
        </div>
    </div>
}