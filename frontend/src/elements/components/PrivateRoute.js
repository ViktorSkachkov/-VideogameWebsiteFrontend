import NewsArticleCardAdmin from "./NewsArticleCardAdmin";
import {useState} from "react";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    return token ? children : <Navigate to="/logIn" />
}
export default PrivateRoute;