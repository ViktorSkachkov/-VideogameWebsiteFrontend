import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ViewNewsArticleDisplay from "../display/ViewNewsArticleDisplay";
import {NewsAPI} from "../API_access/NewsAPI";


const ViewNewsArticle = (loggedUser) => {
    const [newsArticle, setNewsArticle] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getNewsArticle();
    }, []);
    const getNewsArticle = () => {
        NewsAPI.getById(id, token).then(
            function (response) {
                setNewsArticle(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };

    return (
        <ViewNewsArticleDisplay newsArticle={newsArticle}/>
    )
}
export default ViewNewsArticle;