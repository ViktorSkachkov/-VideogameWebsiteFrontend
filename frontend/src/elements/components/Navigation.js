import {Link, useNavigate} from "react-router-dom";
import '../css/Navigation.css';
import {useState, useEffect} from "react";

const Navigation = (props) => {
    const [roles, setRoles] = useState([]);
    const [id, setId] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        getRoles();
    }, [props.loggedUser]);

    const getRoles = () => {
        const token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
            setId(token_deserialized.id);
        }
        console.log(token_deserialized);
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
                <Link to="/shop">Shop</Link>
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
                    <Link to="/" onClick={props.removeUser}>LogOut</Link>
                </div>}
                </>}
        </nav>
    )
};

export default Navigation;