import {useNavigate} from "react-router-dom";
import '../css/NewsArticleCard.css';
import {useEffect, useState} from "react";
import {GamesAPI} from "../API_access/GamesAPI";

const NewsArticleCard = (newsArticle) => {
    const [game, setGame] = useState(null);
    const [general, setGeneral] = useState(false);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let navigate = useNavigate();

    useEffect(() => {
        getGame();
    }, []);

    const getGame = () => {
        if(newsArticle.newsArticle.gameId != 0) {
            GamesAPI.getById(newsArticle.newsArticle.gameId, token).then(
                function (response) {
                    setGame(response.data);
                }
            )
                .catch(function (error) {
                    console.log(error);
                })
        }
        else {
            setGeneral(true);
        }

    }
    return (
        <>
        {game != null || general == true ?
        <div className="newsArticleCard" onClick={() => {
            navigate(`/newsArticle/${newsArticle.newsArticle.id}`, {
            });
        }}>
            <div>
                <img src={newsArticle.newsArticle.image} height="300px" width="450px" alt=""/>
            </div>
            <div>
                <h1>{newsArticle.newsArticle.title}</h1>
                {general == false ?
                    <b><p>About {game.name}</p></b> :
                    <b><p>General</p></b>}
                {newsArticle.newsArticle.text.length > 125 ?
                    <p className="text">{newsArticle.newsArticle.text.substr(0, 125)}...</p> :
                <p className="text">{newsArticle.newsArticle.text}</p>}
            </div>
        </div> :
            <p>Loading...</p>}
        </>
    )
}
export default NewsArticleCard;