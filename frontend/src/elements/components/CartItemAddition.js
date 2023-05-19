import {useEffect, useState} from "react";
import {AdditionsAPI} from "../API_access/AdditionsAPI";

const CartItemAddition = (props) => {
    const [increase, setIncrease] = useState("+");
    const [decrease, setDecrease] = useState("-");

    const [additionId, setAdditionId] = useState(props.additionOrder.addition);
    const [addition, setAddition] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    useEffect(() => {
        getAddition();
    }, []);
    const getAddition = () => {
        AdditionsAPI.getById(additionId, token).then(
            function (response) {
                setAddition(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    function increaseNumber(id) {

    }

    function decreaseNumber(id) {

    }

    function deleteCartItem(id) {

    }

    /*return (
        <div>
            {addition != null ?
                <div className="cartItem">
                    <div>
                        <img src={addition.image} height="60px" width="60px" alt=""/>
                    </div>
                    {addition.name.length <= 7 ?
                    <div className="cartTitle"><b>{addition.name}</b></div>
                        :
                        <div className="cartTitle"><b>{addition.name.substr(0, 6)}<br/>
                            {addition.name.substr(7, addition.name.length - 1)}
                        </b></div>}
                    <div>
                        <button className="arrowCartButton" onClick={() => {
                            decreaseNumber(props.additionOrder.id)
                        }}>{decrease}</button>
                        <input type="text" className="displayCartUnits" value={props.additionOrder.units} />
                        <button className="arrowCartButton" onClick={() => {
                            increaseNumber(props.additionOrder.id)
                        }}>{increase}</button>
                    </div>
                    <div className="cartPrice"><b>{addition.price * props.additionOrder.units}</b></div>
                    <div className="deleteCartText" onClick={() => {
                        deleteCartItem(props.additionOrder.id)
                    }}>Delete
                    </div>
                </div>
                :
                <p>Loading...</p>}
            <br/>
        </div>
    )*/

    return (
        <div>
            {addition != null ?
                <div className="cartItem">
                    <div>
                        <img src={addition.image} height="60px" width="60px" alt=""/>
                    </div>
                        <div className="cartTitle"><b>{addition.name}</b></div>
                    <div>
                        <button className="arrowCartButton" onClick={() => {
                            decreaseNumber(props.additionOrder.id)
                        }}>{decrease}</button>
                        <input type="text" className="displayCartUnits" value={props.additionOrder.units} />
                        <button className="arrowCartButton" onClick={() => {
                            increaseNumber(props.additionOrder.id)
                        }}>{increase}</button>
                    </div>
                    <div className="cartPrice"><b>{addition.price * props.additionOrder.units}</b></div>
                    <div className="deleteCartText" onClick={() => {
                        deleteCartItem(props.additionOrder.id)
                    }}>Delete
                    </div>
                </div>
                :
                <p>Loading...</p>}
            <br/>
        </div>
    )
}
export default CartItemAddition;