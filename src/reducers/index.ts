import { combineReducers } from "@reduxjs/toolkit"
import marketCapReducer from "./marketCapReducer";


export const rootReducer = combineReducers({
    marketCapPercentage: marketCapReducer
})

export type RootState = ReturnType<typeof rootReducer>