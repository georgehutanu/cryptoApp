import { combineReducers } from "@reduxjs/toolkit"

import marketCapReducer from "./marketCapReducer"
import loadCoinReducer from "./coinReducer"
import userReducer from "./userReducer"
import watchlistReducer from "./watchlistReducer"
import portfolioReducer from "./portfolioReducer"


export const rootReducer = combineReducers({
    marketCapPercentage: marketCapReducer,
    loadedCoin: loadCoinReducer,
    user: userReducer,
    watchlist: watchlistReducer,
    portfolio: portfolioReducer
})

export type RootState = ReturnType<typeof rootReducer>