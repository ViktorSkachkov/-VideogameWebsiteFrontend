import {useState, useEffect} from "react";
import AddVideogameDisplay from "../display/AddVideogameDisplay";
import {GamesAPI} from "../API_access/GamesAPI";
import "../css/AddVideogame.css"
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";

const AddVideogame = (props) => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [image, setImage] = useState("image");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState(false);

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
            "name": name,
            "price": price,
            "description": description,
            "featured": featured,
            "image": image,
        }
        GamesAPI.create(data, token).then(
            function (response) {
                navigate(`/games`);
                alert('Videogame successfully added!');
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
        <AddVideogameDisplay handleSubmit={handleSubmit} onChangeName={onChangeName} onChangeImage={onChangeImage} onChangePrice={onChangePrice} onChangeDescription={onChangeDescription}
        image={image} name={name} price={price} description={description} featured={featured} setFeatured={setFeatured}/>
    )
}
export default AddVideogame;