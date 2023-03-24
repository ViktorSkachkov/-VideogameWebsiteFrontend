import axios from "axios";
import {useState} from "react";
import Cookies from "universal-cookie";
import AddAdditionDisplay from "../display/AddAdditionDisplay";

const AddAddition = (loggedUser) => {
    const [gameId, setGameId] = useState(1);
    const [image, setImage] = useState("image");
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();

    const cookies = new Cookies();
    const token = cookies.get("accessToken");

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
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParams = {
            "gameId": gameId,
            "image": image,
            "description": description,
            "price": price,
            "name": name,
        };
        axios.post(
            `http://localhost:8080/additions`,
            bodyParams,
            config
        )
            .then(function (response) {
                alert('Addition successfully added!');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <AddAdditionDisplay handleSubmit={handleSubmit} onChangeName={onChangeName} onChangePrice={onChangePrice} onChangeDescription={onChangeDescription} onChangeImage={onChangeImage}
        name={name} price={price} description={description}/>
    )
}
export default AddAddition;