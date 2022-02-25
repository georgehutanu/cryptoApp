export const coinGeckoURLs = {
    global: 'https://api.coingecko.com/api/v3/global',
    gwei: 'https://ethgasstation.info/api/ethgasAPI.json?',
    coins: (perPage: number, page: number) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`,
    trending: 'https://api.coingecko.com/api/v3/search/trending',
    coin: (coinID: string) => `https://api.coingecko.com/api/v3/search?query=${coinID}`,
    coinMarketHistory: (coinID: string, interval: number) => `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=${interval}`,
    coinInfo: (coinID: string) => `https://api.coingecko.com/api/v3/coins/${coinID}`
}