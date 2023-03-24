import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import UpdateNewsArticleDisplay from "../display/UpdateNewsArticleDisplay";

const UpdateNewsArticle = (loggedUser) => {
    const [gameId, setGameId] = useState();
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [text, setText] = useState();
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
                let {text, title, image, gameId} = response.data;
                setTitle(title);
                setImage(image);
                setText(text);
                setGameId(gameId);
            })
            .catch(function (error) {
                console.log(error);
            });
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
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParams = {
            "id": id,
            "gameId": gameId,
            "image": image,
            "text": text,
            "title": title,
        };
        axios.put(
            `http://localhost:8080/news`,
            bodyParams,
            config
        )
            .then(function (response) {
                /*let mealName = response.data.mealName;
                navigate(`/successfullyUpdatedMeal/${mealName}`);*/
                alert('News article successfully updated!');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <UpdateNewsArticleDisplay  handleSubmit={handleSubmit} onChangeTitle={onChangeTitle} onChangeImage={onChangeImage} onChangeText={onChangeText}
                                   image={image} title={title} text={text}/>
    )
}

export default UpdateNewsArticle;