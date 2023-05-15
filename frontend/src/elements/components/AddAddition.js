import {useState} from "react";
import AddAdditionDisplay from "../display/AddAdditionDisplay";
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import "../css/AddAddition.css"

const AddAddition = (loggedUser) => {
    const [gameId, setGameId] = useState(1);
    const [image, setImage] = useState("image");
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    const onChangeDescription = event => {
        setDescription(event.target.value);
    }
    const onChangePrice = event => {
        setPrice(event.target.value);
    }
    const onChangeImage = event => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setImage(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    const onChangeName = event => {
        setName(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(description.length > 125) {
        let data = {
            "gameId": gameId,
            "image": image,
            "description": description,
            "price": price,
            "name": name,
        }
        AdditionsAPI.create(data, token).then(
            function (response) {
                alert('Addition successfully added!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
        }
        else {
            alert('The description is too short!');
        }
    }

    return (
        <AddAdditionDisplay handleSubmit={handleSubmit} onChangeName={onChangeName} onChangePrice={onChangePrice} onChangeDescription={onChangeDescription} onChangeImage={onChangeImage}
        name={name} price={price} description={description} gameId={gameId} setGameId={setGameId}/>
    )
}
export default AddAddition;