import {useNavigate} from "react-router-dom";
import {NewsAPI} from "../API_access/NewsAPI";
import {useEffect, useState} from "react";
import {GamesAPI} from "../API_access/GamesAPI";

const NewsArticleCardAdmin = (newsArticle) => {
    const [game, setGame] = useState(null);
    const [general, setGeneral] = useState(false);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let navigate = useNavigate();

    useEffect(() => {
        setGeneral(false);
        getGame();
    }, [newsArticle.handleChangeVideogame]);

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

    function deleteNewsArticle(id) {
        NewsAPI.delete(id, token).then(
            function (response) {
                alert('News article successfully deleted!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            {game != null || general == true ?
                <div className="newsArticleCard">
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
                        <button onClick={() => deleteNewsArticle(newsArticle.newsArticle.id) }>Remove</button> <button onClick={() => {
                        navigate(`/updateNewsArticle/${newsArticle.newsArticle.id}`, {

                        });
                    }}>Update</button>
                    </div>
                </div> :
                <p>Loading...</p>}
        </>
    )
}
export default NewsArticleCardAdmin;
