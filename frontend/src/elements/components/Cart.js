import {useState, useEffect} from "react";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";
import {AdditionOrdersAPI} from "../API_access/AdditionOrdersAPI";
import {useParams} from "react-router-dom";
import CartItemGame from "./CartItemGame";
import CartItemAddition from "./CartItemAddition";
import '../css/Cart.css';

const Cart = () => {
    const [gameOrders, setGameOrders] = useState([]);
    const [additionOrders, setAdditionOrders] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        GameOrdersAPI.getGameCartItems(id, token).then(
            function (response) {
                setGameOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })

        AdditionOrdersAPI.getAdditionCartItems(id, token).then(
            function (response) {
                setAdditionOrders(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };

    return (
        <div className="mainBody">
            <center>
                <br/>
                <h1 className="titleCart">CART</h1><br/>

                <div className="listOfCartItems">
                {gameOrders.map((gameOrder) => (
                    <CartItemGame gameOrder={gameOrder}/>
                ))}
                {additionOrders.map((additionOrder) => (
                    <CartItemAddition additionOrder={additionOrder}/>
                ))}
                </div>
                <br/><br/>
                        <div className="displayFinalPrice">
                            Final price: {Math.round(7 * 100)/100}$
                        </div>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <button className="normalButton" onClick={() => {

                }}>Order</button>
                <br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </center>
        </div>
    )
}
export default Cart;