import {useState, useEffect} from "react";
import {GamesAPI} from "../API_access/GamesAPI";
import '../css/GameOrderCard.css';

const GameOrderCard = (props) => {
    const [gameId, setGameId] = useState(props.gameOrder.game);
    const [game, setGame] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    useEffect(() => {
        getVideogame();
    }, []);
    const getVideogame = () => {
        GamesAPI.getById(gameId, token).then(
            function (response) {
                setGame(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div>
            {game != null ?
    <div className="gameOrderCard">
        <div>
            <img src={game.image} height="300px" width="450px" alt=""/>
        </div>
        <div>
            <center>
            <h1 className="orderTitle">{game.name}</h1>
            <p className="orderDescription">{game.description}</p>
            <p className="orderUnits">Units Ordered: {props.gameOrder.units}</p>
            <p className="orderTotalPrice">Total Price: {game.price * props.gameOrder.units}</p>
            <p className="orderDate">Date: </p>
            </center>
        </div>
    </div> :
    <p>Loading...</p>}
        </div>
    )
}
export default GameOrderCard;