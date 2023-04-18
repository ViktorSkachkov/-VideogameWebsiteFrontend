import {useState, useEffect} from "react";
import {GamesAPI} from "../API_access/GamesAPI";
import '../css/GameOrderCard.css';

const GameOrderCard = (props) => {
    const [gameId, setGameId] = useState(props.gameOrder.game);
    const [game, setGame] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getVideogame();
        calculate();
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
    const calculate = () => {
        if(game != null) {
            let price = game.price * props.gameOrder.units;
            setTotalPrice(price);
        }
    }
    return (
        <div>
            {game != null ?
    <div className="gameOrderCard">
        <div>
            <img src="69piR5.jpg" height="300px" width="450px" alt=""/>
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