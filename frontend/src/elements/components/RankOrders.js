import Register from "./Register";
import {useEffect, useState} from "react";
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";
import {AdditionOrdersAPI} from "../API_access/AdditionOrdersAPI";

const RankOrders = () => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [gameOrders, setGameOrders] = useState([]);
    const [additionOrders, setAdditionOrders] = useState([]);

    useEffect(() => {
        getRankingOrders();
    }, []);

    const getRankingOrders = () => {
        GameOrdersAPI.getRanking(token).then(
            function (response) {
                setGameOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })

        AdditionOrdersAPI.getRanking(token).then(
            function (response) {
                setAdditionOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <center>
        <h1 className="orderH1Title">Game Orders</h1>
        <div>
            <table>
                <tr>
                    <th>
                        Name of product
                    </th>
                    <th>
                        Units Sold
                    </th>
                    <th>
                        Total Income
                    </th>
                </tr>
                {gameOrders.map((gameOrder) => (
                    <tr>
                        <td>
                            {gameOrder.name}
                        </td>
                        <td>
                            {gameOrder.numberOfTimesBought}
                        </td>
                        <td>
                            {gameOrder.numberOfTimesBought * gameOrder.price}
                        </td>
                    </tr>
                ))}
            </table>

            <h1 className="orderH1Title">Addition Orders</h1>
            <table>
                <tr>
                    <th>
                        Name of product
                    </th>
                    <th>
                        Units Sold
                    </th>
                    <th>
                        Total Income
                    </th>
                </tr>
                {additionOrders.map((additionOrder) => (
                    <tr>
                        <td>
                            {additionOrder.name}
                        </td>
                        <td>
                            {additionOrder.numberOfTimesBought}
                        </td>
                        <td>
                            {additionOrder.numberOfTimesBought * additionOrder.price}
                        </td>
                    </tr>
                ))}
            </table>
        </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </center>
    )
}
export default RankOrders;