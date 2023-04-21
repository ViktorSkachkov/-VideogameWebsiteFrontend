import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {LoginAPI} from "../API_access/LoginAPI";
import LoginDisplay from "../display/LoginDisplay";

const LogIn = (updateUser) => {
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");

    let navigate = useNavigate();

    const onChangeUsername = event => {
        setUsername(event.target.value);
    }
    const onChangePwd = event => {
        setPwd(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let sendData = {
            "username": username,
            "password": pwd
        };

        LoginAPI.logIn(sendData).then(
            function (response) {
                localStorage.removeItem("token");
                localStorage.removeItem("accessToken");

                localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
                updateUser.updateUser(/*response.data.accessToken*/);
                navigate("/");
            }
        )
            .catch(function (error) {
                alert("Incorrect login details");
            })
    }

    return (
        <LoginDisplay handleSubmit={handleSubmit} onChangeUsername={onChangeUsername} onChangePwd={onChangePwd}/>
    )
}
export default LogIn;