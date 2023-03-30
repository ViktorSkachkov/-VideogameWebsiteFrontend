import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import UpdateNewsArticleDisplay from "../display/UpdateNewsArticleDisplay";
import {NewsAPI} from "../API_access/NewsAPI";

const UpdateNewsArticle = (loggedUser) => {
    const [gameId, setGameId] = useState();
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getNewsArticle();
    }, []);

    const getNewsArticle = () => {
        NewsAPI.getById(id, token).then(
            function (response) {
                let {text, title, image, gameId} = response.data;
                setTitle(title);
                setImage(image);
                setText(text);
                setGameId(gameId);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };

    const onChangeText = event => {
        setText(event.target.value);
    }
    const onChangeImage = event => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setImage(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    const onChangeTitle = event => {
        setTitle(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            "id": id,
            "gameId": gameId,
            "image": image,
            "text": text,
            "title": title,
        };
        NewsAPI.update(data, token).then(
            function (response) {
                alert('News article successfully updated!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <UpdateNewsArticleDisplay  handleSubmit={handleSubmit} onChangeTitle={onChangeTitle} onChangeImage={onChangeImage} onChangeText={onChangeText}
                                   image={image} title={title} text={text}/>
    )
}

export default UpdateNewsArticle;