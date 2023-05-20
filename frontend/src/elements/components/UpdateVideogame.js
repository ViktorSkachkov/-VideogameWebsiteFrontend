import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "universal-cookie";
import UpdateVideogameDisplay from "../display/UpdateVideogameDisplay";
import {GamesAPI} from "../API_access/GamesAPI";

const UpdateVideogame = (loggedUser) => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [featured, setFeatured] = useState(false);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    let navigate = useNavigate();

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
                navigate(`/games`);
                alert('Videogame successfully updated!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <UpdateVideogameDisplay handleSubmit={handleSubmit} onChangeName={onChangeName} onChangeImage={onChangeImage} onChangePrice={onChangePrice} onChangeDescription={onChangeDescription}
                                image={image} name={name} price={price} description={description} featured={featured} setFeatured={setFeatured}/>
    )
}
export default UpdateVideogame;