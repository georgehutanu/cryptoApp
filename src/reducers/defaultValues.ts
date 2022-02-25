import { IUser } from "../shared/interfaces";
import { IPortfolioCoin } from "../components/PortfolioCoin/interfaces";

export const marketCapDefaultValues = {
    marketCapPercentage24h: 0,
    marketCap: 0,
    cryptos: 0
}

export const loadedCoin = 'bitcoin'

export const userDefault: IUser = {
    email: "", firstName: "", lastName: "", portfolio: { amount: 0, coinID: "" }, userID: 0, watchlist: []

}

export const portfolio: IPortfolioCoin[] = [{
    amount: 0, id: ''
}]