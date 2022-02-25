import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

import { RootState } from "../../reducers"
import { addCoinToWatchlist, removeCoinFromWatchlist } from "../../actions"


export default ({ coinID, stared }: { coinID: string, stared: boolean }) => {

    const userID = useSelector((state: RootState) => state.user.userID)

    const { getAccessTokenSilently } = useAuth0()
    const dispatch = useDispatch()



    return <svg className={`star star--${stared && 'active'}`}
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                onClick={() => {
                    !stared ? (async () => {
                            const token = await getAccessTokenSilently()
                            await axios.post('http://localhost:4000/addUpdateWatchList',
                                { userID, coinID },
                                { headers: { authorization: `Bearer ${token}` } })
                            dispatch(addCoinToWatchlist([coinID]))
                        })() :
                        (async () => {
                            const token = await getAccessTokenSilently()
                            await axios.post('http://localhost:4000/removeUpdateWatchList',
                                { userID, coinID },
                                { headers: { authorization: `Bearer ${token}` } })
                            dispatch(removeCoinFromWatchlist([coinID]))
                        })()
                }}>
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        <path xmlns="http://www.w3.org/2000/svg" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
    </svg>
}