import {useState, useEffect} from "react";
import AddNewsArticleDisplay from "../display/AddNewsArticleDisplay";
import {NewsAPI} from "../API_access/NewsAPI";
import "../css/AddNewsArticle.css"
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";

const AddNewsArticle = (props) => {
    const [gameId, setGameId] = useState(0);
    const [image, setImage] = useState("image");
    const [title, setTitle] = useState();
    const [text, setText] = useState("");
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let navigate = useNavigate();

    useEffect(() => {
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
        if(text.length > 125) {

            NewsAPI.validate(title, token).then(
                function (response) {
                    if(response.data == true) {
                        alert("News title already exists!");
                        return false;
                    }
                    else {
                        let data = {
                            "id": 1,
                            "gameId": gameId,
                            "image": image,
                            "text": text,
                            "title": title,
                        }
                        NewsAPI.create(data, token).then(
                            function (response) {
                                navigate(`/news`);
                                alert('News article successfully added!');
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
            alert('The text is too short!');
        }
    }

    return (
        <AddNewsArticleDisplay handleSubmit={handleSubmit} onChangeTitle={onChangeTitle} onChangeImage={onChangeImage} onChangeText={onChangeText}
        image={image} title={title} text={text} gameId={gameId} setGameId={setGameId}/>
    )
}
export default AddNewsArticle;