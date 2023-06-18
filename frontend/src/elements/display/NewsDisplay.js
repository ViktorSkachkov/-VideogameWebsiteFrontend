import NewsArticleCardAdmin from "../components/NewsArticleCardAdmin";
import NewsArticleCard from "../components/NewsArticleCard";
import {useNavigate} from "react-router-dom";

const NewsDisplay = (props) => {
    let navigate = useNavigate();

    return (
        <div>
            <center>
                <h1 className="titleNews">NEWS</h1>
                <h4 className="titleShop">Filter on topic:</h4>
                <select className="filter" value={props.gameId} onChange={props.handleChangeVideogame}>
                    <option value={-1}>All</option>
                    <option value={0}>General</option>
                    {props.videogames.map((videogame) => (
                        <option value={videogame.id}>{videogame.name}</option>
                    ))}
                </select><br/><br/>

                {props.roles.some(r => r == "EMPLOYEE") ?
                    <>
                        <button className="newsButton" onClick={() => {
                            navigate(`/addNewsArticle`, {
                            });
                        }}>Add News Article</button><br/><br/>
                        <div className="listOfNewsArticles">
                        {props.newsArticles.map((newsArticle) => (
                            <NewsArticleCardAdmin newsArticle={newsArticle} handleChangeVideogame={props.handleChangeVideogame}
                            gameId={props.gameId}/>
                        ))}
                    </div>
                    </> : props.roles.some(r => r == "CUSTOMER") ?
                        <div className="listOfNewsArticles">
                            {props.newsArticles.map((newsArticle) => (
                                <NewsArticleCard newsArticle={newsArticle} handleChangeVideogame={props.handleChangeVideogame}
                                                 gameId={props.gameId}/>
                            ))}
                        </div> : <></>
                }
            </center><br/><br/><br/>
        </div>
    )
}
export default NewsDisplay;