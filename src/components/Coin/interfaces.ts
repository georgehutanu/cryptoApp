export interface ICoinProps<T> {
    coin: T
}

export interface ICoin {
    id: string
    name: string
    current_price: number
    price_change_percentage_24h: number
    market_cap: number
    image: string
    circulating_supply: number
    symbol: string
    market_cap_rank: number
    categories?: string[]
    description?: {
        en: string
    }
    developer_score?: number
    community_score?: number
}




