import Register from "./Register";
import {useEffect, useState} from "react";
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";
import {AdditionOrdersAPI} from "../API_access/AdditionOrdersAPI";
import '../css/RankOrders.css';

const RankOrders = () => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [gameOrders, setGameOrders] = useState([]);
    const [additionOrders, setAdditionOrders] = useState([]);
    const [period, setPeriod] = useState(0);

    useEffect(() => {
        getRankingOrders();
    }, []);

    const handleChangePeriod = (e) => {
        e.preventDefault();

        setPeriod(e.target.value);

        GameOrdersAPI.getRanking(e.target.value, token).then(
            function (response) {
                setGameOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })

        AdditionOrdersAPI.getRanking(e.target.value, token).then(
            function (response) {
                setAdditionOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    const getRankingOrders = () => {
        GameOrdersAPI.getRanking(0, token).then(
            function (response) {
                setGameOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })

        AdditionOrdersAPI.getRanking(0, token).then(
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
            <div className="formBackground"><br/>
                <select value={period} onChange={handleChangePeriod}>
                    <option value={0}>In General</option>
                    <option value={1}>One Month</option>
                    <option value={6}>Six Months</option>
                    <option value={12}>One Year</option>
                </select>
            <h1>Sorted By Income</h1>
                <div className="displayStatistics">
                    <div className="displayStatisticsGames">
        <h2 className="">Game Orders</h2>
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
                    </div>

                    <div className="displayStatisticsAdditions">
            <h2 className="">Addition Orders</h2>
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
            </div>
            </div>    </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </center>
    )
}
export default RankOrders;