import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Games from "./Games";
import Additions from "./Additions";
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
import jwtDecode from "jwt-decode";
import Profile from "./Profile";
import {UsersAPI} from "../API_access/UsersAPI";
import ViewOrders from "./ViewOrders";
import PrivateRoute from "./PrivateRoute";
import '../css/App.css';
import RankOrders from "./RankOrders";
import Cart from "./Cart";

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
        setExpirationDate(decode.exp);
        const userID = decode.userId;
        setID(decode.userId);
        console.log("userID " + userID);

        UsersAPI.getById(userID, accessToken).then(
            function (response) {
                const token = JSON.parse(localStorage.getItem("accessToken"));
                console.log("token2 " + userID);
                //var decode = jwtDecode(accessToken);
                console.log("decode2 " + userID);
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
        setToken(null);
        setExpirationDate(null);
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        window.location.reload();
    };


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
    <body className="applicationBackground">
    <Router>
        <Navigation
            removeUser={removeUser}
            updateUser={updateUser}
            loggedUser={loggedUser}
            setLoggedUser={setLoggedUser}
            setToken={setToken}
        />
        <Routes>
            <Route path="/" element={<Home loggedUser={loggedUser} updateUser={updateUser}
                                           removeUser={removeUser} />}/>
            <Route path="/games" element={
                <PrivateRoute>
                    <Games loggedUser={loggedUser} token={token} restoreToken={restoreToken}
                           removeUser={removeUser}/>
                </PrivateRoute>}/>
            <Route path="/additions" element={
                <PrivateRoute>
                    <Additions loggedUser={loggedUser} token={token}
                               removeUser={removeUser}/>
                </PrivateRoute>}/>
            <Route path="/news" element={
                <PrivateRoute>
                    <News loggedUser={loggedUser} token={token}
                          removeUser={removeUser} expirationDate={expirationDate}/>
            </PrivateRoute>}/>
            <Route path="/chat" element={
                <PrivateRoute>
                    <ChatRoom loggedUser={loggedUser} token={token} id={id}
                              removeUser={removeUser}/>
                </PrivateRoute>}/>
                    <Route path="/register" element={<Register updateUser={updateUser} token={token} />}/>
            <Route path="/logIn" element={<LogIn updateUser={updateUser} token={token} />}/>
            <Route path="/game/:id" element={
                    <PrivateRoute>
                        <ViewGame loggedUser={loggedUser} token={token}
                                  removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/addition/:id" element={
                    <PrivateRoute>
                        <ViewAddition loggedUser={loggedUser} token={token}
                                      removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/newsArticle/:id" element={
                    <PrivateRoute>
                            <ViewNewsArticle loggedUser={loggedUser} token={token}
                                             removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/orders/:id" element={
                    <PrivateRoute>
                            <ViewOrders loggedUser={loggedUser} token={token}
                                        removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/profile/:id" element={
                    <PrivateRoute>
                            <Profile removeUser={removeUser} updateUser={updateUser} token={token} />
                    </PrivateRoute>}/>
            <Route path="/updateVideogame/:id" element={
                    <PrivateRoute>
                            <UpdateVideogame loggedUser={loggedUser} token={token}
                                             removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/updateAddition/:id" element={
                    <PrivateRoute>
                            <UpdateAddition loggedUser={loggedUser} token={token}
                                            removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/updateNewsArticle/:id" element={
                    <PrivateRoute>
                            <UpdateNewsArticle loggedUser={loggedUser} token={token}
                                               removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/addVideogame" element={
                    <PrivateRoute>
                            <AddVideogame loggedUser={loggedUser} token={token}
                                          removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/addAddition" element={
                    <PrivateRoute>
                            <AddAddition loggedUser={loggedUser} token={token}
                                         removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/addNewsArticle" element={
                    <PrivateRoute>
                            <AddNewsArticle loggedUser={loggedUser} token={token}
                                            removeUser={removeUser}/>
                    </PrivateRoute>}/>
            <Route path="/rankOrders" element={
                <PrivateRoute>
                    <RankOrders loggedUser={loggedUser} token={token}
                                removeUser={removeUser}/>
                </PrivateRoute>}/>
            <Route path="/cart/:id" element={
                <PrivateRoute>
                    <Cart loggedUser={loggedUser} token={token}
                          removeUser={removeUser}/>
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