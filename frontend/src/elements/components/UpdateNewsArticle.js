import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UpdateNewsArticleDisplay from "../display/UpdateNewsArticleDisplay";
import {NewsAPI} from "../API_access/NewsAPI";
import "../css/UpdateNewsArticle.css"
import jwtDecode from "jwt-decode";

const UpdateNewsArticle = (props) => {
    const [gameId, setGameId] = useState();
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [initialTitle, setInitialTitle] = useState();
    const [text, setText] = useState();
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    let navigate = useNavigate();

    useEffect(() => {
        getNewsArticle();
        checkIfTokenHasExpired()
    }, []);

    const checkIfTokenHasExpired = () => {
        if(token != null) {
            const decode = jwtDecode(token);
            const exp = decode.exp;

            if (exp) {
                const currentTime = new Date().getTime() / 1000;

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
                let {text, title, image, gameId} = response.data;
                setTitle(title);
                setInitialTitle(title);
                setInitialTitle(title);
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

        if(initialTitle != title) {
            NewsAPI.validate(title, token).then(
                function (response) {
                    if (response.data.confirm == true) {
                        alert("News title already exists!");
                        return false;
                    } else {
                        let data = {
                            "id": id,
                            "gameId": gameId,
                            "image": image,
                            "text": text,
                            "title": title,
                        };
                        NewsAPI.update(data, token).then(
                            function (response) {
                                navigate(`/news`);
                                alert('News article successfully updated!');
                            }
                        )
                            .catch(function (error) {
                                console.log(error);
                            })
                    }
                }
            )
        }
        else {
            let data = {
                "id": id,
                "gameId": gameId,
                "image": image,
                "text": text,
                "title": title,
            };
            NewsAPI.update(data, token).then(
                function (response) {
                    navigate(`/news`);
                    alert('News article successfully updated!');
                }
            )
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    return (
        <UpdateNewsArticleDisplay  handleSubmit={handleSubmit} onChangeTitle={onChangeTitle} onChangeImage={onChangeImage} onChangeText={onChangeText}
                                   image={image} title={title} text={text}/>
    )
}

export default UpdateNewsArticle;