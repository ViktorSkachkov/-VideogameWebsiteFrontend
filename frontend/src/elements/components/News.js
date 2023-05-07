import {useState, useEffect} from "react";
import '../css/News.css';
import {NewsAPI} from "../API_access/NewsAPI";
import {useNavigate} from "react-router-dom";
import NewsDisplay from "../display/NewsDisplay";
import {GamesAPI} from "../API_access/GamesAPI";

const News = (props) => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [gameId, setGameId] = useState(-1);
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [videogames, setVideogames] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        getRoles();
        getNews();
        getVideogames()
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

    const handleChangeVideogame = (e) => {
        e.preventDefault();
        /*let result = counter + 1;
        setCounter(result)
        if(result == 1) {

        }*/

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
        GamesAPI.getAll(token).then(
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