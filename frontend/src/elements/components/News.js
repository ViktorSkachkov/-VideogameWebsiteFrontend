import {useState, useEffect} from "react";
import '../css/News.css';
import {NewsAPI} from "../API_access/NewsAPI";
import {useNavigate} from "react-router-dom";
import NewsDisplay from "../display/NewsDisplay";

const News = (props) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    useEffect(() => {
        getRoles();
        getNews();
    }, []);

    const getRoles = () => {
        let token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
        }
    }

    const getNews = () => {
        NewsAPI.getAll(token).then(
            function (response) {
                setNewsArticles(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }
    
    return (
        <NewsDisplay newsArticles={newsArticles} roles={roles}/>
    )
}
export default News;