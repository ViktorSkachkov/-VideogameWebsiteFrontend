
const LoginDisplay = (props) => {
    return (
        <>
            <center><br/><br/>
                <h1>
                    LOGIN
                </h1>
                <p>Fill in your personal information</p><br/>
                <form onSubmit={props.handleSubmit}>
                    <label htmlFor="username" className="formLabelUsername">Username</label><br/>
                    <input type="text" name="username" onChange={props.onChangeUsername} className="Label"/><br/><br/>
                    <label htmlFor="password" className="formLabelPassword">Password</label><br/>
                    <input type="password" name="password" onChange={props.onChangePwd} className="Label"/>
                    <br/><br/>
                    <button type="submit" className="normalButton">Submit</button><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </form>
            </center>
        </>
    )
}
export default LoginDisplay;