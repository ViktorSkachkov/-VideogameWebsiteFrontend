import '../css/AdditionCard.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {GamesAPI} from "../API_access/GamesAPI";

const AdditionCard = (addition) => {
    const [game, setGame] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let navigate = useNavigate();

    useEffect(() => {
        getGame();
    }, [addition.handleChangeVideogame]);

    const getGame = () => {
        GamesAPI.getById(addition.addition.gameId, token).then(
            function (response) {
                setGame(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            {game != null ?
        <div className="additionCard"  onClick={() => {
            navigate(`/addition/${addition.addition.id}`, {
            });
        }}>
            <div>
                <img src={addition.addition.image} height="400px" width="450px" alt=""/>
            </div>
            <div className="">
                <center>
                    <h1>{addition.addition.name}</h1>
                </center>
            </div>
            <div className="lowerPart">
                <b><p className="price">Price: {addition.addition.price}€</p></b>
                <b><p>For {game.name}</p></b>
                {addition.addition.description.length > 125 ?
                    <p className="additionDescription">{addition.addition.description.substr(0, 125)}...</p> :
                <p className="additionDescription">{addition.addition.description}</p>}
            </div>
        </div> :
                <p>Loading...</p>}
        </>
    )
}
export default AdditionCard;