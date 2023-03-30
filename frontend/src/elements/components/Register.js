import {useState} from "react";
import '../css/Register.css';
import RegisterDisplay from "../display/RegisterDisplay";

const Register = () => {
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [repeatPwd, setRepeatPwd] = useState("");
    const [email, setEmail] = useState("");
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
    const handleSubmit = (e) => {

    }

    return (
        <RegisterDisplay handleSubmit={handleSubmit} onChangeEmail={onChangeEmail}
                         onChangeRepeatPwd={onChangeRepeatPwd} onChangePwd={onChangePwd} onChangeUsername={onChangeUsername}/>
    )
}
export default Register;