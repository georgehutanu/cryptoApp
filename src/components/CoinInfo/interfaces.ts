export default interface ICoinInfo {
    id: string
    name: string
    market_cap_rank: number
    symbol: string
    image: {
        large: string
        small: string
    }
    market_data: {
        ath: {
            usd: number
        }
        ath_date: {
            usd: number
        }
        current_price: {
            usd: number
        }
        market_cap: {
            usd: number
        }
        market_cap_change_percentage_24h: number
        max_supply: number
        total_supply: number
        circulating_supply: number
        price_change_percentage_24h: number
    }
    developer_score: number
    community_score: number
}