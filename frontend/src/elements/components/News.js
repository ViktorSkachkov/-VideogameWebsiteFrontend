import {useState, useEffect} from "react";
import '../css/News.css';
import {NewsAPI} from "../API_access/NewsAPI";
import NewsDisplay from "../display/NewsDisplay";
import {GamesAPI} from "../API_access/GamesAPI";
import jwtDecode from "jwt-decode";

const News = (props) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [gameId, setGameId] = useState(-1);
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [videogames, setVideogames] = useState([]);

    useEffect(() => {
        getRoles();
        getNews();
        getVideogames();
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

    const handleChangeVideogame = (e) => {
        e.preventDefault();

        setGameId(e.target.value);

        NewsAPI.getByGame(e.target.value, token).then(
            function (response) {
                setNewsArticles(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    const getVideogames = () => {
        GamesAPI.getForNewsFilter(token).then(
            function (response) {
                setVideogames(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <NewsDisplay newsArticles={newsArticles} roles={roles} handleChangeVideogame={handleChangeVideogame}
                     gameId={gameId} videogames={videogames}/>
    )
}
export default News;