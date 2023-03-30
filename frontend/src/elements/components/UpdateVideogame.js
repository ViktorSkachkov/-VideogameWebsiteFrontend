import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Cookies from "universal-cookie";
import UpdateVideogameDisplay from "../display/UpdateVideogameDisplay";
import {GamesAPI} from "../API_access/GamesAPI";

const UpdateVideogame = (loggedUser) => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [featured, setFeatured] = useState(true);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getVideogame();
    }, []);

    const getVideogame = () => {
        GamesAPI.getById(id, token).then(
            function (response) {
                let {description, price, name, image, featured} = response.data;
                setName(name);
                setImage(image);
                setPrice(price);
                setDescription(description);
                setFeatured(featured);
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
            "image": image,
            "description": description,
            "price": price,
            "name": name,
            "featured": featured,
        }
        GamesAPI.update(data, token).then(
            function (response) {
                alert('Videogame successfully updated!');
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
        <UpdateVideogameDisplay handleSubmit={handleSubmit} onChangeName={onChangeName} onChangeImage={onChangeImage} onChangePrice={onChangePrice} onChangeDescription={onChangeDescription}
                                image={image} name={name} price={price} description={description} featured={featured}/>
    )
}
export default UpdateVideogame;