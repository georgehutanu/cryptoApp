import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

import { IPortfolioCoin } from "./interfaces"
import transformLargeNumberInReadableNumber from "../../utils/transformLargeNumberInReadableNumber"
import { RootState } from "../../reducers"
import { addCoinToPortfolio, removeCoinFromPortfolio } from "../../actions"


export default ({ amount, name, price, setTotal, symbol, image, id }: IPortfolioCoin) => {
    const [coinAmountForPortfolio, setCoinAmountForPortfolio] = useState(0)

    const userPortfolio: IPortfolioCoin[] = useSelector((root: RootState) => root.portfolio)
    const userID = useSelector((root: RootState) => root.user.userID)

    const dispatch = useDispatch()
    const {getAccessTokenSilently} = useAuth0()

    useEffect(() => {
        setTotal && price && setTotal(prev => prev + price)
    }, [userPortfolio, price])


    return <div className="portfolio-coin">
        <a className="portfolio-coin__field" href={`http://localhost:3000/coin/${symbol}`}>
            <div className="portfolio-coin__field--image">
                <img className="portfolio-coin__field--image--content" src={image} alt="coinImage"/>
                <p className="portfolio-coin__field portfolio-coin__field--coin-name">{name}</p>
            </div>
        </a>
        <p className="portfolio-coin__field">{amount}&nbsp;{symbol?.toUpperCase()}</p>
        <p className="portfolio-coin__field">${price && transformLargeNumberInReadableNumber(price)}</p>
        <p className="coin__field__content coin__field__content--portfolio coin__field__content--portfolio--positive"
           onClick={async () => {
               const token = await getAccessTokenSilently()
               const response = await axios.post('http://localhost:4000/addPortfolioCoin',
                   { coinID: id, userID, amount: coinAmountForPortfolio },
                   {
                       headers: { authorization: `Bearer ${token}` }
                   })
               dispatch(addCoinToPortfolio([{ id: id, amount: coinAmountForPortfolio }]))
               response.status === 200 && setCoinAmountForPortfolio(0)
           }}>
            +
        </p>
        <p className="coin__field__content coin__field__content--portfolio coin__field__content--portfolio--negative"
           onClick={async () => {
               const token = await getAccessTokenSilently()
               const response = await axios.post('http://localhost:4000/removePortfolioCoin',
                   { coinID: id, userID, amount: coinAmountForPortfolio },
                   {
                       headers: { authorization: `Bearer ${token}` }
                   })
               dispatch(removeCoinFromPortfolio([{ id, amount: coinAmountForPortfolio }]))
               response.status === 200 && setCoinAmountForPortfolio(0)
           }}>
            -
        </p>
        <input className="coin__field--input" type="text" placeholder="Amount" value={coinAmountForPortfolio === 0 ? '' : coinAmountForPortfolio} onChange={e => setCoinAmountForPortfolio(Number(e.target.value))}/>
    </div>
}
