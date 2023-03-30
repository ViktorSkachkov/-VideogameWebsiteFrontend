import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
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
                alert('Addition successfully updated!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    /*return (
        <>
            <center>
                <form onSubmit={handleSubmit}>
                    <br/><br/>
                    <label htmlFor="image" className="formLabelImage">Image</label><br/><br/>
                    <input type="file" name="image" onChange={onChangeImage} className="Label"/><br/><br/>
                    <label htmlFor="name" className="formLabelName">Name</label><br/>
                    <input type="text" name="name" onChange={onChangeName} value={name} className="Label" /><br/><br/>
                    <label htmlFor="username" className="formLabelDescription">Description</label><br/>
                    <textarea type="text" name="description" onChange={onChangeDescription} value={description} className="Label" /><br/><br/>
                    <label htmlFor="number" className="formLabelPrice">Price</label><br/>
                    <input type="number" name="price" onChange={onChangePrice} value={price} className="Label" /><br/><br/>
                    <button type="submit" className="normalButton">Submit</button>
                </form><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </center>
        </>
    )*/

    return (
        <UpdateAdditionDisplay handleSubmit={handleSubmit} onChangeName={onChangeName} onChangePrice={onChangePrice} onChangeDescription={onChangeDescription} onChangeImage={onChangeImage}
                               name={name} price={price} description={description}/>
    )
}

export default UpdateAddition;