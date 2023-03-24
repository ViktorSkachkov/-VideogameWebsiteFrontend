
const ProfileDisplay = (props) => {

    return (
        <>
            {props.user != null ? <>
                <center><br/><br/>
                    <h1>
                        Your Profile! Welcome {props.username}
                    </h1>
                    <h3>Fill in your personal information</h3>
                    <p>Due to security measures you will not be able to see your password.</p><br/>

                    <form onSubmit={props.updateProfile}>
                        <label htmlFor="username" className="formLabelUsername">Username</label><br/>
                        <input type="text" value={props.username} onChange={props.onChangeUsername} className="Label"/><br/><br/>

                        <label htmlFor="password" className="formLabelPassword">Password</label><br/>
                        <input type="password" value={props.pwd} onChange={props.onChangePwd} className="Label"/><br/><br/>

                        <label htmlFor="repeatPassword" className="formLabelRepeatPassword">Repeat Password</label><br/>
                        <input type="password" value={props.repeatPwd} onChange={props.onChangeRepeatPwd} className="Label"/><br/><br/>

                        <label htmlFor="email" className="formLabelEmail">Email</label><br/>
                        <input type="email" value={props.email} onChange={props.onChangeEmail} className="Label"/><br/><br/>

                        <label htmlFor="bankAccount" className="formLabelBankAccount">Bank Account</label><br/>
                        <input type="bankAccount" value={props.bankAccount} onChange={props.onBankAccount} className="Label"/><br/><br/>

                        <button type="submit" className="normalButton">Update Account<br/> Information</button><br/><br/>
                    </form>
                    <button onClick={() => props.deleteProfile(props.id)}>Delete Account</button><br/><br/><br/>
                </center>
            </> : <></>}
        </>
    )
}
export default ProfileDisplay;