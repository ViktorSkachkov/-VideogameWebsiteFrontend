import axios from "axios";
import {useState} from "react";
import Cookies from "universal-cookie";
import AddVideogameDisplay from "../display/AddVideogameDisplay";

const AddVideogame = (loggedUser) => {
    const [image, setImage] = useState("image");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState(false);

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
            "name": name,
            "price": price,
            "description": description,
            "featured": featured,
            "image": image,
        };
        axios.post(
            `http://localhost:8080/videogames`,
            bodyParams,
            config
        )
            .then(function (response) {
                alert('Videogame successfully added!');
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <AddVideogameDisplay handleSubmit={handleSubmit} onChangeName={onChangeName} onChangeImage={onChangeImage} onChangePrice={onChangePrice} onChangeDescription={onChangeDescription}
        image={image} name={name} price={price} description={description} featured={featured}/>
    )
}
export default AddVideogame;