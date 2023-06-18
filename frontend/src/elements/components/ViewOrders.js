import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";
import GameOrderCard from "./GameOrderCard";
import AdditionOrderCard from "./AdditionOrderCard";
import '../css/ViewOrders.css';
import {AdditionOrdersAPI} from "../API_access/AdditionOrdersAPI";
import jwtDecode from "jwt-decode";


const ViewOrders = (props) => {
    const [gameOrders, setGameOrders] = useState([]);
    const [additionOrders, setAdditionOrders] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    const [returnSign, setReturnSign] = useState("<");
    let navigate = useNavigate();

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getOrders();
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

    const getOrders = () => {
        GameOrdersAPI.getByUser(id, token).then(
            function (response) {
                setGameOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })

        AdditionOrdersAPI.getByUser(id, token).then(
            function (response) {
                setAdditionOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };

    return (
        <div className="viewOrdersBody">
            <button className="buyGameButton" onClick={() => {
                navigate(`/profile/${id}`, {
                });
            }}>{returnSign}</button>
            <center>
                {gameOrders.length > 0 && additionOrders.length > 0 ?
                    <div>
                    <h1 className="orderH1Title">Your Game Orders</h1>
                    <div className="listOfOrders">
                        {gameOrders.map(gameOrder => (
                                <GameOrderCard gameOrder={gameOrder}/>
                            )
                        )}
                    </div>
                    <h1 className="orderH1Title">Your Addition Orders</h1>
                    <div className="listOfOrders">
                {additionOrders.map(additionOrder => (
                    <AdditionOrderCard additionOrder={additionOrder}/>
                    )
                    )}
                    </div>
                        </div> :
                    <div>
                        <div className="formBackground">
                        <h1 className="orderH1TitleB">You currently have no orders</h1>
                            <img src="/cart2.jpg" height="200px" width="200px" alt=""/>
                        </div>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                }
            </center>
        </div>
    )
}
export default ViewOrders;