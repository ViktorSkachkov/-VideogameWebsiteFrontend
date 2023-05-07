import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Games from "./Games";
import Shop from "./Shop";
import News from "./News";
import ChatRoom from "./ChatRoom";
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
import {Navigate} from "react-router-dom";
//import Cookies from "universal-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Profile from "./Profile";
import {UsersAPI} from "../API_access/UsersAPI";
import ViewOrders from "./ViewOrders";
import PrivateRoute from "./PrivateRoute";

function App() {
    const [token, setToken] = useState("");
    const [loggedUser, setLoggedUser] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const [id, setID] = useState(0);

    const updateUser = (/*accessToken*/) => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        setToken(accessToken);
        console.log("token " + accessToken);
        var decode = jwtDecode(accessToken);
        console.log("decode " + decode);
        const userID = decode.userId;
        setID(decode.userId);
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
                window.location.reload();
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
            img-src 'self' blob: data:;
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
            <Route path="/games" element={
                <PrivateRoute>
                    <Games loggedUser={loggedUser} token={token} restoreToken={restoreToken}  />
                </PrivateRoute>}/>
            <Route path="/shop" element={
                <PrivateRoute>
                    <Shop loggedUser={loggedUser} token={token}  />
                </PrivateRoute>}/>
            <Route path="/news" element={
                <PrivateRoute>
                    <News loggedUser={loggedUser} token={token} />
            </PrivateRoute>}/>
            <Route path="/chat" element={
                <PrivateRoute>
                    <ChatRoom loggedUser={loggedUser} token={token} id={id} />
                </PrivateRoute>}/>
                    <Route path="/register" element={<Register updateUser={updateUser} token={token} />}/>
            <Route path="/logIn" element={<LogIn updateUser={updateUser} token={token} />}/>
            <Route path="/game/:id" element={
                    <PrivateRoute>
                        <ViewGame loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/addition/:id" element={
                    <PrivateRoute>
                        <ViewAddition loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/newsArticle/:id" element={
                    <PrivateRoute>
                            <ViewNewsArticle loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/orders/:id" element={
                    <PrivateRoute>
                            <ViewOrders loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/profile/:id" element={
                    <PrivateRoute>
                            <Profile removeUser={removeUser} updateUser={updateUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/updateVideogame/:id" element={
                    <PrivateRoute>
                            <UpdateVideogame loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/updateAddition/:id" element={
                    <PrivateRoute>
                            <UpdateAddition loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/updateNewsArticle/:id" element={
                    <PrivateRoute>
                            <UpdateNewsArticle loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/addVideogame" element={
                    <PrivateRoute>
                            <AddVideogame loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/addAddition" element={
                    <PrivateRoute>
                            <AddAddition loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/addNewsArticle" element={
                    <PrivateRoute>
                            <AddNewsArticle loggedUser={loggedUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
    </Router>
    <Footer/>
    </body>
    </html>
)
}
export default App;