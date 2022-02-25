import { Dispatch, SetStateAction } from "react";

export interface IPortfolioCoin {
    name?: string
    amount?: number
    price?: number
    id?: string
    setTotal?: Dispatch<SetStateAction<number>>
    symbol?: string
    image?: string
}
