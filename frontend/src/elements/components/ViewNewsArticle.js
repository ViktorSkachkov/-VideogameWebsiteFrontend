import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ViewNewsArticleDisplay from "../display/ViewNewsArticleDisplay";
import {NewsAPI} from "../API_access/NewsAPI";
import jwtDecode from "jwt-decode";


const ViewNewsArticle = (props) => {
    const [newsArticle, setNewsArticle] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getNewsArticle();
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