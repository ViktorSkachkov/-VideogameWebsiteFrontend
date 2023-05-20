import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "universal-cookie";
import UpdateAdditionDisplay from "../display/UpdateAdditionDisplay";
import {AdditionsAPI} from "../API_access/AdditionsAPI";

const UpdateAddition = (loggedUser) => {
    const [gameId, setGameId] = useState();
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    let navigate = useNavigate();

    useEffect(() => {
        getAddition();
    }, []);

    const getAddition = () => {
        AdditionsAPI.getById(id, token).then(
            function (response) {
                let {description, price, name, image, gameId} = response.data;
                setName(name);
                setImage(image);
                setPrice(price);
                setDescription(description);
                setGameId(gameId);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };
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

        let data = {
            "id": id,
            "gameId": gameId,
            "image": image,
            "description": description,
            "price": price,
            "name": name,
        }
        AdditionsAPI.update(data, token).then(
            function (response) {
                navigate(`/additions`);
                alert('Addition successfully updated!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <UpdateAdditionDisplay handleSubmit={handleSubmit} onChangeName={onChangeName} onChangePrice={onChangePrice} onChangeDescription={onChangeDescription} onChangeImage={onChangeImage}
                               name={name} price={price} description={description} image={image}/>
    )
}

export default UpdateAddition;