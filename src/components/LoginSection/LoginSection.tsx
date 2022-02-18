export default () => {
    return <div className="login-section">
        <form className="login-section__form">
            <div className="login-section__form--group">
                <input type="text" name='email' placeholder='Email' id='email' className="login-section__form--group--input"/>
                <label htmlFor="email" className="login-section__form--group--label">Email </label>
            </div>
            <div className="login-section__form--group">
                <input type="password" placeholder="Password" name='password' id='password' className="login-section__form--group--input"/>
                <label htmlFor="password" className="login-section__form--group--label">Password </label>
            </div>
            <button type="submit" className="login-section__form--button">Login</button>
        </form>
    </div>
}