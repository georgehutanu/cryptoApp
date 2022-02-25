import { useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

import { RootState } from "../../reducers"
import { IPortfolioCoin } from "../PortfolioCoin/interfaces"
import PortfolioCoin from "../PortfolioCoin/PortfolioCoin"
import { coinGeckoURLs } from "../../utils/coinGeckoApiURLs"
import transformLargeNumberInReadableNumber from "../../utils/transformLargeNumberInReadableNumber"


export default () => {
    const [portfolioCoins, setPortfolioCoins] = useState<IPortfolioCoin[]>()
    const [total, setTotal] = useState<number>(0)

    const userPortfolio: IPortfolioCoin[] = useSelector((root: RootState) => root.portfolio)

    useEffect(() => {
        (async () => {
            const result = userPortfolio && await Promise.all(userPortfolio.map(({ id }: IPortfolioCoin) => axios.get(coinGeckoURLs.coinInfo(id!))))
            console.log(result)
            result && setPortfolioCoins(result.map(({ data }) => ({
                id: data.id,
                name: data.name,
                price: data.market_data?.current_price.usd,
                symbol: data.symbol,
                image: data.image?.small
            })))
        })()
    }, [userPortfolio])

    return portfolioCoins ? <div className="portfolio">
        <div className="portfolio__top-section">
            <p className="portfolio__top-section__title">Portfolio</p>
            <p className="portfolio__top-section__total">Total &nbsp;<span>${transformLargeNumberInReadableNumber(total) ?? 0}</span></p>
        </div>
        <div className="portfolio__header">
            <p className="portfolio__header__field">Name</p>
            <p className="portfolio__header__field">Amount</p>
            <p className="portfolio__header__field">Worth</p>
            <p className="portfolio__header__field">Change balance</p>
        </div>
        {portfolioCoins && portfolioCoins.map(({ id, name, price, symbol, image }: IPortfolioCoin, index: number) => {
            const coin: IPortfolioCoin | undefined = userPortfolio && userPortfolio.find((portfolioCoin: IPortfolioCoin) => portfolioCoin.id === id)
            const coinWorth = coin && coin.amount && coin.amount * Number(price)
            return <PortfolioCoin id={id} amount={coin?.amount} name={name} price={coinWorth} key={index} setTotal={setTotal} symbol={symbol} image={image}/>
        })}
    </div> : <></>
}