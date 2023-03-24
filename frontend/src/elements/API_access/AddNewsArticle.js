import axios from "axios";
import {useState} from "react";
import Cookies from "universal-cookie";
import AddNewsArticleDisplay from "../display/AddNewsArticleDisplay";

const AddNewsArticle = (loggedUser) => {
    const [gameId, setGameId] = useState(1);
    const [image, setImage] = useState("image");
    const [title, setTitle] = useState();
    const [text, setText] = useState();

    const cookies = new Cookies();
    const token = cookies.get("accessToken");

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
            "id": 1,
            "gameId": gameId,
            "image": image,
            "text": text,
            "title": title,
        };
        axios.post(
            `http://localhost:8080/news`,
            bodyParams,
            config
        )
            .then(function (response) {
                /*let mealName = response.data.mealName;
                navigate(`/successfullyUpdatedMeal/${mealName}`);*/
                alert('News article successfully added!');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <AddNewsArticleDisplay handleSubmit={handleSubmit} onChangeTitle={onChangeTitle} onChangeImage={onChangeImage} onChangeText={onChangeText}
        image={image} title={title} text={text}/>
    )
}
export default AddNewsArticle;