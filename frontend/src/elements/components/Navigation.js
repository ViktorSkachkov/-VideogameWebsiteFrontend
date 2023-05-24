import {Link, useNavigate} from "react-router-dom";
import '../css/Navigation.css';
import {useState, useEffect} from "react";
import {CheckAPI} from "../API_access/CheckAPI";
import jwtDecode from "jwt-decode";

const Navigation = (props) => {
    const [roles, setRoles] = useState([]);
    const [id, setId] = useState(0);
    const [check, setCheck] = useState(0);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let navigate = useNavigate();

    useEffect(() => {
        getRoles();
        //checkIfTokenHasExpired();
    }, [props.loggedUser]);

    const getRoles = () => {
        const token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
            setId(token_deserialized.id);
        }
    }

    /*const checkIfTokenHasExpired = () => {
        if(!props.checkTokenExpiration()) {
            logOut();
        }
    }*/

    function logOut() {
        props.removeUser();
        window.location.reload();
    }

    return (
        <nav className="navBar">
            <div className="imageContainer">
                <img  onClick={() => {
                    navigate(`/`, {
                    });
                }} src="/logo.png" alt=""/>
            </div>
            {roles.length == 0 ?
                <>
                    <div className='navLinks'>
                        <Link to="/">Home</Link>
                        <Link to="/logIn">LogIn</Link>
                        <Link to="/register">Register</Link>
                    </div>
                    <div>

                    </div>
                </> : <>
                <div className='navLinks'>
                <Link to="/">Home</Link>
                <Link to="/games">Games</Link>
                <Link to="/additions">Additions</Link>
                <Link to="/news">News</Link>
            </div>
            {roles.some(r => r == "EMPLOYEE") ?
            <div>
                <Link to="/chat">Chat</Link>
                <Link to="/rankOrders">Ranked Orders</Link>
                <Link to={`/profile/${id}`}>Profile</Link>
                <Link to="/" onClick={props.removeUser}>LogOut</Link>
            </div> : <div>
                    <Link to="/chat">Chat</Link>
                    <Link to={`/profile/${id}`}>Profile</Link>
                    <Link to={`/cart/${id}`}>Cart</Link>
                    <Link to="/" onClick={logOut}>LogOut</Link>
                </div>}
                </>}
        </nav>
    )
};

export default Navigation;