import {useNavigate} from "react-router-dom";
import {NewsAPI} from "../API_access/NewsAPI";
import {useState} from "react";

const NewsArticleCardAdmin = (newsArticle) => {

    let navigate = useNavigate();

    function deleteNewsArticle(id) {
        NewsAPI.delete(id).then(
            function (response) {
                alert('News article successfully deleted!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="newsArticleCard">
            <div>
                <img src="69piR5.jpg" height="300px" width="450px" alt=""/>
            </div>
            <div>
                <h1>{newsArticle.newsArticle.title}</h1>
                <p className="text">{newsArticle.newsArticle.text}</p>
                <button onClick={() => deleteNewsArticle(newsArticle.newsArticle.id) }>Remove</button> <button onClick={() => {
                navigate(`/updateNewsArticle/${newsArticle.newsArticle.id}`, {

                });
            }}>Update</button>
            </div>
        </div>
    )
}
export default NewsArticleCardAdmin;