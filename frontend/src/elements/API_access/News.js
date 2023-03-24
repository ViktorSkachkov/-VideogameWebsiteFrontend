import {useState, useEffect} from "react";
import '../css/News.css';
import axios from "axios";
import Cookies from "universal-cookie";
import NewsDisplay from "../display/NewsDisplay";

const News = (loggedUser) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [roles, setRoles] = useState([]);

    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    useEffect(() => {
        getRoles();
        getVideogames();
    }, []);

    const getRoles = () => {
        let token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
        }
    }

    const getVideogames = () => {
        var config = {
            method: "get",
            url: `http://localhost:8080/news`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        axios(config)
            .then(function (response) {
                setNewsArticles(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    return (
        <NewsDisplay newsArticles={newsArticles} roles={roles}/>
    )
}
export default News;