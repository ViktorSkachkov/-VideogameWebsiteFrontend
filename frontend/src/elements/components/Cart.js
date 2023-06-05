import {useState, useEffect} from "react";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";
import {AdditionOrdersAPI} from "../API_access/AdditionOrdersAPI";
import {useParams} from "react-router-dom";
import CartItemGame from "./CartItemGame";
import CartItemAddition from "./CartItemAddition";
import '../css/Cart.css';
import {forEach} from "react-bootstrap/ElementChildren";
import jwtDecode from "jwt-decode";

const Cart = (props) => {
    const [gameOrders, setGameOrders] = useState([]);
    const [additionOrders, setAdditionOrders] = useState([]);
    const [finalPriceGames, setFinalPriceGames] = useState(0);
    const [finalPriceAdditions, setFinalPriceAdditions] = useState(0);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

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
            console.log("Expiration " + exp);
            if (exp) {
                const currentTime = new Date().getTime() / 1000;
                console.log("Current  " + currentTime);
                if (currentTime > exp) {
                    props.removeUser();
                    window.location.reload();
                }
            }
        }
    }

    const getOrders = () => {
        let gameOrders2 = [];
        let additionOrders2 = [];
        GameOrdersAPI.getGameCartItems(id, token).then(
            function (response) {
                setGameOrders(response.data);
                calculateFinalPriceGames(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })

        AdditionOrdersAPI.getAdditionCartItems(id, token).then(
            function (response) {
                setAdditionOrders(response.data);
                calculateFinalPriceAdditions(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };

    const calculateFinalPriceGames = (elements) => {
        let price = 0;
        elements.forEach(element => price += element.totalPrice);
        setFinalPriceGames(price);
    }

    const calculateFinalPriceAdditions = (elements) => {
        let price = 0;
        elements.forEach(element => price += element.totalPrice);
        setFinalPriceAdditions(price);
    }

    function confirmOrder() {
        AdditionOrdersAPI.confirmAdditionOrders(id, token).then(
            function (response) {

            }
        )
            .catch(function (error) {
                console.log(error);
            })

        GameOrdersAPI.confirmGameOrders(id, token).then(
            function (response) {
                alert('Order completed!');
                window.location.reload();
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="mainBody">
            <center>
            <div className="formBackground"><br/>
                <h1 className="titleCart">CART</h1><br/>

                {additionOrders.length == 0 && gameOrders == 0 ? <>
                    <h2><i>There are currently no items in the cart to display</i></h2>
                </> : <>
                    <div className="listOfCartItems">
                        {gameOrders.map((gameOrder) => (
                            <CartItemGame gameOrder={gameOrder}/>
                        ))}
                        {additionOrders.map((additionOrder) => (
                            <CartItemAddition additionOrder={additionOrder} />
                        ))}
                    </div>
                    <div className="displayFinalPrice">
                        <b>Final price: {finalPriceGames + finalPriceAdditions}€</b>
                    </div>
                    <br/>
                    <button className="cartButton" onClick={() => {
                        confirmOrder();
                    }}>Confirm Order</button>
                </>}
            </div>
                {additionOrders.length == 0 && gameOrders == 0 ? <>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </> : <>
                    <br/><br/><br/><br/>
                </>}
            </center>
        </div>
    )
}
export default Cart;