import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import ViewNewsArticleDisplay from "../display/ViewNewsArticleDisplay";


const ViewNewsArticle = (loggedUser) => {
    const [newsArticle, setNewsArticle] = useState(null);
    let params = useParams();
    const id = params.id;

    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    useEffect(() => {
        getNewsArticle();
    }, []);
    const getNewsArticle = () => {
        var config = {
            method: "get",
            url: `http://localhost:8080/news/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        axios(config)
            .then(function (response) {
                setNewsArticle(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <ViewNewsArticleDisplay newsArticle={newsArticle}/>
    )
}
export default ViewNewsArticle;