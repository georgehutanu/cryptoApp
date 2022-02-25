import { Actions } from "./types"
import { IMarketCapActionPayload } from "../reducers/interfaces"
import { IUser } from "../shared/interfaces"
import { IPortfolioCoin } from "../components/PortfolioCoin/interfaces";


export const saveMarketCapPercentage24h = (marketCap: IMarketCapActionPayload) => ({
    type: Actions.SAVE_VALUE,
    payload: marketCap
})

export const loadCoin = (coinID: string) => ({
    type: Actions.LOAD_COIN,
    payload: coinID
})

export const loadUser = (user: IUser) => ({
    type: Actions.LOAD_USER,
    payload: user
})

export const loadWatchlist = (watchlist: string[]) => ({
    type: Actions.LOAD_WATCHLIST,
    payload: watchlist
})

export const addCoinToWatchlist = (coinID: string[]) => ({
    type: Actions.ADD_COIN_TO_WATCHLIST,
    payload: coinID
})

export const removeCoinFromWatchlist = (coinID: string[]) => ({
    type: Actions.REMOVE_COIN_FROM_WATCHLIST,
    payload: coinID
})

export const loadPortfolio = (portfolio: {name: string, amount: number[]}) => ({
    type: Actions.LOAD_PORTFOLIO,
    payload: portfolio
})

export const addCoinToPortfolio = (coin: IPortfolioCoin[]) => ({
    type: Actions.ADD_COIN_TO_PORTFOLIO,
    payload: coin
})

export const removeCoinFromPortfolio = (coin: IPortfolioCoin[]) => ({
    type: Actions.REMOVE_COIN_FROM_PORTFOLIO,
    payload: coin
})