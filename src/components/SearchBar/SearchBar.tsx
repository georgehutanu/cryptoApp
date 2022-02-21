import { useEffect, useState } from "react"

import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

import { loadCoin } from "../../actions"
import { RootState } from "../../reducers"
import useDebounce from "../../customHooks/useDebounce"
import { ISearchCoin } from "./interfaces"
import { coinGeckoURLs } from "../../utils/coinGeckoApiURLs"
import toCapitalize from "../../utils/toCapitalize"


export default () => {
    const [inputValue, setInputValue] = useState('')
    const [searchResults, setSearchResult] = useState([])

    const debounceValue = useDebounce(inputValue, 500)

    const dispatch = useDispatch()

    const loadedCoin = useSelector((state: RootState) => state.loadedCoin)

    useEffect(() => {
        dispatch(loadCoin(debounceValue))
    }, [debounceValue])

    useEffect(() => {
        (async () => {
            const response = inputValue && await axios.get(coinGeckoURLs.coin(loadedCoin))
            response && response.status === 200 && setSearchResult(response.data.coins.slice(0, 5))
        })()
    }, [loadedCoin])

    return <div className="search-bar">
        <div className="search-bar__input">
            <input className="search-bar__input--content" type="text" value={inputValue}
                   placeholder="Search a coin"
                   onChange={(e) => {
                       setInputValue(e.target.value)
                       setSearchResult([])
                   }}/>
        </div>
        {inputValue && <div className="search-bar__results">
            {inputValue && searchResults.map((coin: ISearchCoin) =>
                <a href={`http://localhost:3000/coin/${coin.symbol}`}
                   className="search-bar__results--result">
                    <p className="search-bar__results--result--content">{coin.market_cap_rank}</p>
                    <div className="search-bar__results--result--content">
                        <img src={coin.thumb} alt="" className="search-bar__results--result--image--content"/>
                    </div>
                    <p className="search-bar__results--result--content">
                        {coin.id.split('-').length > 1 ?
                            coin.id.split('-').map((word: string) => toCapitalize(word)).join(' ') :
                            toCapitalize(coin.id)}
                    </p>
                </a>)}
        </div>}
    </div>
}