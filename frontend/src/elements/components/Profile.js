import {useEffect, useState} from "react";
import '../css/Profile.css';
import {useNavigate, useParams} from "react-router-dom";
import ProfileDisplay from "../display/ProfileDisplay";
import {UsersAPI} from "../API_access/UsersAPI";
import jwtDecode from "jwt-decode";


const Profile = (props) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [initialUsername, setInitialUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [repeatPwd, setRepeatPwd] = useState("");
    const [email, setEmail] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getUser();
        getRoles();
        checkIfTokenHasExpired();
    }, []);

    const checkIfTokenHasExpired = () => {
        if(token != null) {
            const decode = jwtDecode(token);
            const exp = decode.exp;
            console.log("Expiration " + exp);
            if (exp) {
                const currentTime = new Date().getTime() / 1000;
                console.log("Current  " + currentTime);
                if (currentTime > exp) {
                    props.removeUser();
                    window.location.reload();
                }
            }
        }
    }

    const getRoles = () => {
        console.log("props " + props.token);
        let token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
        }
    }

    const updateProfile = (e) => {
        e.preventDefault();

            if(pwd != repeatPwd) {
                alert('The password and the repeated password are different!');
            }
        let data = {
            "id": id,
            "username": username,
            "pwd": pwd,
            "email": email,
            "bankAccount": bankAccount,
            "userRoles": user.userRoles,
        }



        UsersAPI.update(data, token).then(
            function (response) {
                setUser(response.data);
                localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
                props.updateUser();
            }
        )
            .catch(function (error) {
                console.log(error);
            })

    };

    function deleteProfile(userId, token) {
        UsersAPI.delete(userId, token).then(
            function (response) {
                props.removeUser();
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    const getUser = () => {
        UsersAPI.getById(id, token).then(
            function (response) {
                let {username, email, bankAccount} = response.data;
                setInitialUsername(username)
                setUsername(username);
                setInitialUsername(username);
                setEmail(email);
                setBankAccount(bankAccount);
                setUser(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
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
                        id={id} user={user} username={username} pwd={pwd} repeatPwd={repeatPwd} email={email} bankAccount={bankAccount}
        roles={roles} initialUsername={initialUsername}/>
    )
}
export default Profile;