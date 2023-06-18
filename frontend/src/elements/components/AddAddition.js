import {useState, useEffect} from "react";
import AddAdditionDisplay from "../display/AddAdditionDisplay";
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import "../css/AddAddition.css"
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";

const AddAddition = (props) => {
    const [gameId, setGameId] = useState(1);
    const [image, setImage] = useState("image");
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let navigate = useNavigate();

    useEffect(() => {
        checkIfTokenHasExpired();
    }, []);

    const checkIfTokenHasExpired = () => {
        if(token != null) {
            const decode = jwtDecode(token);
            const exp = decode.exp;

            if (exp) {
                const currentTime = new Date().getTime() / 1000;

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

            AdditionsAPI.validate(name, token).then(
                function (response) {
                    if(response.data.confirm == true) {
                        alert("Addition name already exists!");
                        return false;
                    }
                    else {
                        let data = {
                            "gameId": gameId,
                            "image": image,
                            "description": description,
                            "price": price,
                            "name": name,
                        }
                        AdditionsAPI.create(data, token).then(
                            function (response) {
                                navigate(`/additions`);
                                alert('Addition successfully added!');
                            }
                        )
                            .catch(function (error) {
                                console.log(error);
                            })
                    }
                }
            )
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