import { Actions } from "./types"
import { IMarketCapActionPayload } from "../reducers/interfaces"


export const saveMarketCapPercentage24h = (marketCap: IMarketCapActionPayload) => ({
    type: Actions.SAVE_VALUE,
    payload: marketCap
})
