import {useState, useEffect} from "react";
import '../css/AdditionOrderCard.css';
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import {GamesAPI} from "../API_access/GamesAPI";

const AdditionOrderCard = (props) => {
    const [additionId, setAdditionId] = useState(props.additionOrder.addition);
    const [addition, setAddition] = useState(null);
    //const [gameId, setGameId] = useState(0);
    const [game, setGame] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    useEffect(() => {
        getAddition();
        //getGame();
    }, []);
    const getAddition = () => {
        AdditionsAPI.getById(additionId, token).then(
            function (response) {
                setAddition(response.data);
                getGame(response.data.gameId);
                //setGameId(response.data.gameId);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }
    const getGame = (gameId) => {
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
            {addition != null && game != null ?
                <div className="additionOrderCard">
                    <div>
                        <img src="/69piR5.jpg" height="300px" width="450px" alt=""/>
                    </div>
                    <div>
                        <center>
                            <h1 className="orderTitle">{addition.name}</h1>
                            <p className="orderDescription">{addition.description}</p>
                            <p className="orderUnits">Units Ordered: {props.additionOrder.units}</p>
                            <p className="orderTotalPrice">Total Price: {addition.price * props.additionOrder.units}</p>
                            <p className="orderDate">Date: </p>
                            <p className="forGame">For Game: {game.name}</p>
                        </center>
                    </div>
                </div> :
                <p>Loading...</p>}
        </div>
    )
}
export default AdditionOrderCard;