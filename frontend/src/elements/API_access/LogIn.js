import {useState} from "react";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
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
        const cookies = new Cookies();
        var data = JSON.stringify({
            "username": username,
            "password": pwd
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8080/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };


        axios(config)
            .then(function (response) {
                cookies.set("accessToken", response.data.accessToken, { path: '/' });
                updateUser.updateUser();
                navigate("/");
                //window.location.reload();
            })
            .catch(function (error) {
                alert("Incorrect login details");
            });
    }

    return (
        <LoginDisplay handleSubmit={handleSubmit} onChangeUsername={onChangeUsername} onChangePwd={onChangePwd}/>
    )
}
export default LogIn;