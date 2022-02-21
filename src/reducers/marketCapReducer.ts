import { Action } from "../shared/interfaces"
import { Actions } from "../actions/types"
import { IMarketCapActionPayload } from './interfaces'
import { marketCapDefaultValues } from "./defaultValues"


export default (state: IMarketCapActionPayload = marketCapDefaultValues, action: Action<IMarketCapActionPayload>) => {
    const { type, payload } = action
    switch (type) {
        case Actions.SAVE_VALUE:
            return { ...payload }
        default:
            return state
    }
}