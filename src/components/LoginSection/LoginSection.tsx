import { useEffect, useState } from "react"

import { useAuth0 } from "@auth0/auth0-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import axios from "axios";
import apiMessages from "../../utils/constants/apiMessages";
import { loadPortfolio, loadUser, loadWatchlist } from "../../actions";
import { IUser } from "../../shared/interfaces";


export default () => {
    const { loginWithPopup, logout, isAuthenticated, getAccessTokenSilently, user } = useAuth0()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [responseUser, setResponseUser] = useState<IUser>()

    useEffect(() => {
        const userID = user?.sub?.split('|')[1];
        isAuthenticated && (async () => {
            const token = await getAccessTokenSilently()
            const response = await axios.get(`http://localhost:4000/userDashboard/${userID}`,
                { headers: { authorization: `Bearer ${token}` } })
            response.data.message === apiMessages.NO_USER && navigate(`/addUser/${userID}`)
            setResponseUser(response.data.data.user)
            dispatch(loadUser(response.data.data.user))
            response.data.data.user && dispatch(loadWatchlist(response.data.data.user.watchlist))
            response.data.data.user && dispatch(loadPortfolio(response.data.data.user.portfolio))
        })()
    }, [isAuthenticated])


    return <div className="login-section">
        {isAuthenticated && <p className='login-section__greet'>Hello <span>{responseUser?.firstName}!</span></p>}
        <div className="login-section__buttons">
            {isAuthenticated && window.location.href !== 'http://localhost:3000/userDashboard' &&
                <Link className="login-section__button" to="/userDashboard">User Dashboard</Link>}
            <button type="submit"
                    className={`login-section__button login-section__button--${isAuthenticated && 'logout'}`}
                    onClick={isAuthenticated ?
                        () => logout() :
                        () => loginWithPopup()
                    }>
                {isAuthenticated ? "Logout" : 'Login'}
            </button>
        </div>
    </div>
}