import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Games from "./Games";
import Shop from "./Shop";
import News from "./News";
import Support from "./Support";
import Footer from "./Footer";
import {useState} from "react";
import ViewGame from "./ViewGame";
import ViewNewsArticle from "./ViewNewsArticle";
import Register from "./Register";
import LogIn from "./LogIn";
import ViewAddition from "./ViewAddition";
import UpdateVideogame from "./UpdateVideogame";
import UpdateAddition from "./UpdateAddition";
import UpdateNewsArticle from "./UpdateNewsArticle";
import AddVideogame from "./AddVideogame";
import AddAddition from "./AddAddition";
import AddNewsArticle from "./AddNewsArticle";
//import Cookies from "universal-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Profile from "./Profile";
import {UsersAPI} from "../API_access/UsersAPI";
import ViewOrders from "./ViewOrders";

function App() {
    const [token, setToken] = useState("");
    const [loggedUser, setLoggedUser] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);

    const updateUser = (/*accessToken*/) => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        setToken(accessToken);
        console.log("token " + accessToken);
        var decode = jwtDecode(accessToken);
        console.log("decode " + decode);
        const userID = decode.userId;
        console.log("userID " + userID);

        UsersAPI.getById(userID, accessToken).then(
            function (response) {
                //const token = JSON.parse(localStorage.getItem("accessToken"));
                console.log("token2 " + userID);
                var decode = jwtDecode(accessToken);
                console.log("decode2 " + userID);
                setExpirationDate(decode.exp);
                setLoggedUser(response.data);
                let token_serialized = JSON.stringify(response.data);
                console.log("token_serialized " + token_serialized);
                localStorage.setItem("token", token_serialized);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };

    const restoreToken = () => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        setToken(accessToken);
    }
    const removeUser = () => {
        setLoggedUser(null);
        setExpirationDate(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
    };

    /*const checkTokenExpiration = () => {
        if (expirationDate) {
            const currentTime = new Date().getTime() / 1000;
            if (currentTime > expirationDate) {
                removeUser();
            }
        }
    };*/


return (
    <html>
    <head>
        <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'self';
            connect-src http://localhost:8080/;"
        />
    </head>
    <body>
    <Router>
        <Navigation
            removeUser={removeUser}
            loggedUser={loggedUser}
        />
        <Routes>
            <Route path="/" element={<Home loggedUser={loggedUser} updateUser={updateUser} />}/>
            <Route path="/games" element={<Games loggedUser={loggedUser} token={token} restoreToken={restoreToken}  />}/>
            <Route path="/shop" element={<Shop loggedUser={loggedUser} token={token}  />}/>
            <Route path="/news" element={<News loggedUser={loggedUser} token={token} />}/>
            <Route path="/support" element={<Support loggedUser={loggedUser} token={token} />}/>
            <Route path="/register" element={<Register updateUser={updateUser} token={token} />}/>
            <Route path="/logIn" element={<LogIn updateUser={updateUser} token={token} />}/>
            <Route path="/game/:id" element={<ViewGame loggedUser={loggedUser} token={token} />}/>
            <Route path="/addition/:id" element={<ViewAddition loggedUser={loggedUser} token={token} />}/>
            <Route path="/newsArticle/:id" element={<ViewNewsArticle loggedUser={loggedUser} token={token} />}/>
            <Route path="/orders/:id" element={<ViewOrders loggedUser={loggedUser} token={token} />}/>
            <Route path="/profile/:id" element={<Profile removeUser={removeUser} updateUser={updateUser} token={token} />}/>
            <Route path="/updateVideogame/:id" element={<UpdateVideogame loggedUser={loggedUser} token={token} />}/>
            <Route path="/updateAddition/:id" element={<UpdateAddition loggedUser={loggedUser} token={token} />}/>
            <Route path="/updateNewsArticle/:id" element={<UpdateNewsArticle loggedUser={loggedUser} token={token} />}/>
            <Route path="/addVideogame" element={<AddVideogame loggedUser={loggedUser} token={token} />}/>
            <Route path="/addAddition" element={<AddAddition loggedUser={loggedUser} token={token} />}/>
            <Route path="/addNewsArticle" element={<AddNewsArticle loggedUser={loggedUser} token={token} />}/>
        </Routes>
    </Router>
    <Footer/>
    </body>
    </html>
)
}
export default App;