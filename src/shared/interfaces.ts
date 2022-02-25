export interface Action<T> {
    type: string
    payload: T
}

export interface IUser {
    userID: number
    firstName: string
    lastName: string
    email: string
    portfolio: {
        coinID: string
        amount: number
    }
    watchlist: string[]
}
