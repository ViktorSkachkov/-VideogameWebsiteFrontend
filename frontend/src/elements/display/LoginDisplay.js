
const LoginDisplay = (props) => {
    return (
        <>
            <center className="formBackground"><br/>
                <h1 className="loginText">
                    LOGIN
                </h1>
                <p className="loginText">Fill in your personal information</p><br/>
                <form onSubmit={props.handleSubmit}>
                    <label htmlFor="username" className="formLoginLabelUsername">Username</label><br/>
                    <input type="text" name="username" onChange={props.onChangeUsername} className="Label"/><br/><br/>
                    <label htmlFor="password" className="formLoginLabelPassword">Password</label><br/>
                    <input type="password" name="password" onChange={props.onChangePwd} className="Label"/>
                    <br/><br/>
                    <button type="submit" className="normalButton">Submit</button>
                </form>
            </center><br/><br/><br/><br/>
        </>
    )
}
export default LoginDisplay;