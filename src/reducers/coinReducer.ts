import { Action } from "../shared/interfaces"
import { Actions } from "../actions/types"
import { loadedCoin } from "./defaultValues"

export default (state: string = loadedCoin, action: Action<string>) => {
    const { type, payload } = action
    switch (type) {
        case Actions.LOAD_COIN:
            return payload
        default:
            return state
    }
}