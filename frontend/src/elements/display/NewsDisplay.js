import NewsArticleCardAdmin from "../API_access/NewsArticleCardAdmin";
import NewsArticleCard from "../API_access/NewsArticleCard";
import {useNavigate} from "react-router-dom";

const NewsDisplay = (props) => {
    let navigate = useNavigate();

    return (
        <>
            <center>
                <h1 className="title">NEWS</h1>
                <h3 className="title">Filters</h3>
                {props.roles.some(r => r == "EMPLOYEE") ?
                    <> <div className="listOfNewsArticles">
                        {props.newsArticles.map((newsArticle) => (
                            <NewsArticleCardAdmin newsArticle={newsArticle} />
                        ))}
                    </div>
                        <button onClick={() => {
                            navigate(`/addNewsArticle`, {
                            });
                        }}>Add News Article</button>
                    </> : props.roles.some(r => r == "CUSTOMER") ?
                        <div className="listOfNewsArticles">
                            {props.newsArticles.map((newsArticle) => (
                                <NewsArticleCard newsArticle={newsArticle} />
                            ))}
                        </div> : <></>
                }
            </center><br/>
        </>
    )
}
export default NewsDisplay;