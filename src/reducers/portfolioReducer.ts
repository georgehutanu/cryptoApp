import { Action } from "../shared/interfaces"
import { Actions } from "../actions/types"
import { IPortfolioCoin } from "../components/PortfolioCoin/interfaces"
import { portfolio } from "./defaultValues"


export default (state: IPortfolioCoin[] = portfolio, action: Action<IPortfolioCoin[]>) => {
    const { type, payload } = action
    switch (type) {
        case Actions.LOAD_PORTFOLIO:
            return payload
        case Actions.ADD_COIN_TO_PORTFOLIO:
            return state.map((portfolioCoin: IPortfolioCoin) =>
                portfolioCoin.id === payload[0].id ?
                    portfolioCoin.amount && payload[0].amount &&
                    { ...payload[0], amount: payload[0].amount + portfolioCoin.amount } :
                    portfolioCoin
            )
        case Actions.REMOVE_COIN_FROM_PORTFOLIO:
            const filteredPortfolio = state.filter(portfolioCoin =>
                portfolioCoin.amount && payload[0].amount &&
                !(portfolioCoin.id === payload[0].id && portfolioCoin.amount <= payload[0].amount))
            return payload[0].amount === 0 ?
                state.filter(portfolioCoin => portfolioCoin.id !== payload[0].id) :
                (
                    filteredPortfolio.map((portfolioCoin) =>
                        portfolioCoin.amount && payload[0].amount &&
                        portfolioCoin.id === payload[0].id ?
                            { id: payload[0].id, amount: portfolioCoin.amount - payload[0].amount } :
                            portfolioCoin)
                )
        default:
            return state
    }
}