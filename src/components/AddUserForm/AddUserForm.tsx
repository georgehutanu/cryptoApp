import { useEffect, useState } from "react"

import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

import ApiMessages from "../../utils/constants/apiMessages"


export default () => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const { userID } = useParams()

    const { user, getAccessTokenSilently } = useAuth0()

    const navigate = useNavigate()

    useEffect(() => {
        message === ApiMessages.SUCCESS && navigate('/userDashboard')
    }, [message])

    return user ? <div className="add-user">
        <p className='add-user__title'>Last changes</p>
        <form className="add-user__form" onSubmit={e => {
            e.preventDefault()
        }}>
            <div className="add-user__form__group">
                <input className="add-user__form__group__input" type="text"
                       id="firstName" name="firstName"
                       value={firstName}
                       placeholder="First Name"
                       onChange={({ target }) => setFirstName(target.value)}/>
                <label htmlFor="firstName" className="add-user__form__group__label">First Name</label>
            </div>
            <div className="add-user__form__group">
                <input className="add-user__form__group__input" type="text"
                       id="lastName" name="lastName"
                       value={lastName}
                       placeholder="Last Name"
                       onChange={({ target }) => setLastName(target.value)}/>
                <label htmlFor="lastName" className="add-user__form__group__label">Last Name</label>
            </div>
            <div className="add-user__form__group">
                <input className="add-user__form__group__input" type="email"
                       id="email" name="email"
                       value={email}
                       placeholder={user && user.email}
                       onChange={({ target }) => setEmail(target.value)}/>
                <label htmlFor="email" className="add-user__form__group__label">Email</label>
            </div>
            <button onClick={async (e) => {
                e.preventDefault()
                const token = await getAccessTokenSilently()
                const userData = { userID, firstName, lastName, email : email || user.email }
                const response = await axios.post('http://localhost:4000/addUser', userData,
                    { headers: { authorization: `Bearer ${token}` } })
                response && setMessage(response.data.message)
            }} type="submit"
                    className={`add-user__form__button add-user__form__button${firstName && lastName && (email || user.email) && '--inactive'}`}>Save
                changes
            </button>
        </form>
        <p className="add-user__message">
            {message}
        </p>
    </div> : <></>
}