import { Action } from "../shared/interfaces"
import { Actions } from "../actions/types"


export default (state: string[] = [], action: Action<string[]>) => {
    const { type, payload } = action
    switch (type) {
        case Actions.LOAD_WATCHLIST:
            return payload;
        case Actions.ADD_COIN_TO_WATCHLIST:
            return [...state, payload[0] ]
        case Actions.REMOVE_COIN_FROM_WATCHLIST:
            return state.filter((coinID: string) => coinID !== payload[0])
        default:
            return state
    }
}