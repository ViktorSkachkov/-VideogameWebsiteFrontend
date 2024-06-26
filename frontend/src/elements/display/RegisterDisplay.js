const RegisterDisplay = (props) => {
    return (
        <>
            <center className="formBackground"><br/><br/>
                <h1>
                    REGISTER
                </h1>
                <p>Fill in your personal information</p><br/>
                <form onSubmit={props.handleSubmit}>
                    <label htmlFor="username" className="formLabelUsername">Username</label><br/>
                    <input type="text" onChange={props.onChangeUsername} className="Label"/><br/><br/>

                    <label htmlFor="password" className="formLabelPassword">Password</label><br/>
                    <input type="password" onChange={props.onChangePwd} className="Label"/><br/><br/>

                    <label htmlFor="repeatPassword" className="formLabelRepeatPassword">Repeat Password</label><br/>
                    <input type="password" onChange={props.onChangeRepeatPwd} className="Label"/><br/><br/>

                    <label htmlFor="email" className="formLabelEmail">Email</label><br/>
                    <input type="email" onChange={props.onChangeEmail} className="Label"/><br/><br/>

                    <label htmlFor="bankAccount" className="formLabelBankAccount">Bank Account</label><br/>
                    <input type="bankAccount" onChange={props.onChangeBankAccount} className="Label"/><br/><br/>

                    <button type="submit" className="normalButton">Submit</button>
                </form>
            </center><br/><br/><br/><br/>
        </>
    )
}
export default RegisterDisplay;