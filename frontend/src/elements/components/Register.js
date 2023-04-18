import {useState} from "react";
import '../css/Register.css';
import RegisterDisplay from "../display/RegisterDisplay";
import {LoginAPI} from "../API_access/LoginAPI";
import {UsersAPI} from "../API_access/UsersAPI";
import {useNavigate} from "react-router-dom";

const Register = (updateUser) => {
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [repeatPwd, setRepeatPwd] = useState("");
    const [email, setEmail] = useState("");
    const [bankAccount, setBankAccount] = useState("");

    let navigate = useNavigate();

    const onChangeUsername = event => {
        setUsername(event.target.value);
    }
    const onChangePwd = event => {
        setPwd(event.target.value);
    }
    const onChangeRepeatPwd = event => {
        setRepeatPwd(event.target.value);
    }
    const onChangeEmail = event => {
        setEmail(event.target.value);
    }
    const onChangeBankAccount = event => {
        setBankAccount(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    if(pwd == repeatPwd) {
        let sendData = {
            "username": username,
            "pwd": pwd,
            "email": email,
            "bankAccount": bankAccount,
            "userRoles": [{"role": "CUSTOMER"}]
        };

        UsersAPI.create(sendData).then(
                function (response) {

                navigate("/logIn");
            }
        )
        .catch(function (error) {
            alert("Incorrect data");
        })
    }
    else {
        alert("The repeated password is different from the password that was input!")
    }
  }

    return (
        <RegisterDisplay handleSubmit={handleSubmit} onChangeEmail={onChangeEmail}
                         onChangeRepeatPwd={onChangeRepeatPwd} onChangePwd={onChangePwd} onChangeUsername={onChangeUsername}
                         onChangeBankAccount={onChangeBankAccount}/>
    )
}
export default Register;