import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "universal-cookie";
import ProfileDisplay from "../display/ProfileDisplay";


const Profile = (updateUser=updateUser, removeUser=removeUser) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [repeatPwd, setRepeatPwd] = useState("");
    const [email, setEmail] = useState("");
    const [bankAccount, setBankAccount] = useState("");

    let params = useParams();
    const id = params.id;

    let navigate = useNavigate();

    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    useEffect(() => {
        getUser();
    }, []);
    const updateProfile = (e) => {
        e.preventDefault();
        if(pwd != repeatPwd) {
            alert('The password and the repeated password are different!');
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParams = {
            "id": id,
            "username": username,
            "pwd": pwd,
            "email": email,
            "bankAccount": bankAccount,
            "userRoles": user.userRoles,
        };
        axios.put(
            `http://localhost:8080/users`,
            bodyParams,
            config
        )
            .then(function (response) {
                setUser(response.data);
                cookies.set("accessToken", response.data.accessToken, { path: '/' });
                updateUser.updateUser();
                //changeSession(username, pwd);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    function deleteProfile(userId) {
        var config = {
            method: "delete",
            url: `http://localhost:8080/users/${userId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        axios(config)
            .then(function (response) {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getUser = () => {
        var config = {
            method: "get",
            url: `http://localhost:8080/users/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        axios(config)
            .then(function (response) {
                let {username, pwd, email, bankAccount} = response.data;
                setRepeatPwd(pwd);
                setPwd(pwd);
                setUsername(username);
                setEmail(email);
                setBankAccount(bankAccount);
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

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
    const onBankAccount = event => {
        setBankAccount(event.target.value);
    }

    return (
        <ProfileDisplay updateProfile={updateProfile} deleteProfile={deleteProfile}
                        onChangeUsername={onChangeUsername} onChangePwd={onChangePwd} onChangeRepeatPwd={onChangeRepeatPwd} onChangeEmail={onChangeEmail} onBankAccount={onBankAccount}
                        id={id} user={user} username={username} pwd={pwd} repeatPwd={repeatPwd} email={email} bankAccount={bankAccount}/>
    )
}
export default Profile;