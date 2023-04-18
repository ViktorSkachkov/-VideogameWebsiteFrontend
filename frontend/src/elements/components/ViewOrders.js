import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";
import GameOrderCard from "./GameOrderCard";
import AdditionOrderCard from "./AdditionOrderCard";
import '../css/ViewOrders.css';


const ViewOrders = (loggedUser) => {
    const [gameOrders, setGameOrders] = useState([]);
    const [additionOrders, setAdditionOrders] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        GameOrdersAPI.getByUser(id, token).then(
            function (response) {
                setGameOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };
    /*return (
        <div>
            <center>
                <h1>Your Game Orders</h1>
                <div className="listOfOrders">
                    {gameOrders.map(gameOrder => (
                        <>
                            <p>{gameOrder.game}</p>
                            <p>{gameOrder.user}</p>
                            <p>{gameOrder.units}</p>
                        </>
                        )
                    )}
                </div>
            </center>
        </div>
    )*/
    return (
        <div>
            <center>
            <h1>Your Game Orders</h1>
                <div className="listOfOrders">
            {gameOrders.map(gameOrder => (
                    <GameOrderCard gameOrder={gameOrder}/>
                )
            )}
                </div>
            <h1>Your Addition Orders</h1>
                <div className="listOfOrders">
            {additionOrders.map(additionOrder => (
                    <AdditionOrderCard additionOrder={additionOrder}/>
                )
            )}
                </div>
            </center>
        </div>
    )
}
export default ViewOrders;