import { combineReducers } from "@reduxjs/toolkit"

import marketCapReducer from "./marketCapReducer"
import loadCoinReducer from "./loadCoinReducer"


export const rootReducer = combineReducers({
    marketCapPercentage: marketCapReducer,
    loadedCoin: loadCoinReducer
})

export type RootState = ReturnType<typeof rootReducer>