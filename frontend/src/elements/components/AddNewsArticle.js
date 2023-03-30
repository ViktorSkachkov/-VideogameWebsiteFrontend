import {useState} from "react";
import AddNewsArticleDisplay from "../display/AddNewsArticleDisplay";
import {NewsAPI} from "../API_access/NewsAPI";

const AddNewsArticle = (loggedUser) => {
    const [gameId, setGameId] = useState(1);
    const [image, setImage] = useState("image");
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

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
            "id": 1,
            "gameId": gameId,
            "image": image,
            "text": text,
            "title": title,
        }
        NewsAPI.create(data, token).then(
            function (response) {
                alert('News article successfully added!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <AddNewsArticleDisplay handleSubmit={handleSubmit} onChangeTitle={onChangeTitle} onChangeImage={onChangeImage} onChangeText={onChangeText}
        image={image} title={title} text={text}/>
    )
}
export default AddNewsArticle;