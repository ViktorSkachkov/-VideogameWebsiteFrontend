import {useState, useEffect} from "react";
import '../css/CartItem.css';
import {GamesAPI} from "../API_access/GamesAPI";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";

const CartItemGame = (props) => {
    const [increase, setIncrease] = useState("+");
    const [decrease, setDecrease] = useState("-");

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
                //increaseFinalPrice(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    function increaseNumber(id) {
        GameOrdersAPI.increaseGameOrderUnits(props.gameOrder.id, token).then(
            function (response) {
                window.location.reload();
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    function decreaseNumber(id) {
        if(props.gameOrder.units > 1) {
        GameOrdersAPI.decreaseGameOrderUnits(props.gameOrder.id, token).then(
            function (response) {
                window.location.reload();
            }
        )
            .catch(function (error) {
                console.log(error);
            })
        }
        else {
            alert('You cannot order 0 units!');
        }
    }

    function deleteCartItem(id) {
        GameOrdersAPI.delete(props.gameOrder.id, token).then(
            function (response) {
                window.location.reload();
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div>
            {game != null ?
            <div className="cartItem">
                <div>
                    <img src={game.image} height="60px" width="60px" alt=""/>
                </div>

                <div className="cartTitle"><b>{game.name}</b></div>

                <div>
                    <button className="arrowCartButton" onClick={() => {
                        decreaseNumber(props.gameOrder.id)
                    }}>{decrease}</button>
                    <input type="text" className="displayCartUnits" value={props.gameOrder.units} />
                    <button className="arrowCartButton" onClick={() => {
                        increaseNumber(props.gameOrder.id)
                    }}>{increase}</button>
                </div>
                <div className="cartPrice"><b>{game.price * props.gameOrder.units}</b></div>
                <div className="deleteCartText" onClick={() => {
                    deleteCartItem(props.gameOrder.id)
                    }}>Delete
                </div>
            </div>
                :
                <p>Loading...</p>}
            <br/>
        </div>
    )
}
export default CartItemGame;