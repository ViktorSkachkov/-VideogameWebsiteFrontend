import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UpdateAdditionDisplay from "../display/UpdateAdditionDisplay";
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import "../css/UpdateAddition.css";
import jwtDecode from "jwt-decode";

const UpdateAddition = (props) => {
    const [gameId, setGameId] = useState();
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [initialName, setInitialName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    let navigate = useNavigate();

    useEffect(() => {
        getAddition();
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

    const getAddition = () => {
        AdditionsAPI.getById(id, token).then(
            function (response) {
                let {description, price, name, image, gameId} = response.data;
                setName(name);
                setInitialName(name);
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

        if(initialName != name) {
        AdditionsAPI.validate(name, token).then(
            function (response) {
                if(response.data.confirm == true) {
                    alert("Addition name already exists!");
                    return false;
                }
                else {
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
            }
        )
    }
    else {
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
    }

    return (
        <UpdateAdditionDisplay handleSubmit={handleSubmit} onChangeName={onChangeName} onChangePrice={onChangePrice} onChangeDescription={onChangeDescription} onChangeImage={onChangeImage}
                               name={name} price={price} description={description} image={image}/>
    )
}

export default UpdateAddition;