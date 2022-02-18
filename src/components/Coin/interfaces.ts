export interface ICoinProps<T> {
    coin: T
    index: number
}

export interface ICoin {
    name: string
    current_price: number
    price_change_percentage_24h: number
    market_cap: number
    image: string
    circulating_supply: number
    symbol: string
    market_cap_rank: number
}



