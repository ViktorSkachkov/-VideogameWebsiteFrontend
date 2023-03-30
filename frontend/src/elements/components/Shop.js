import {useEffect, useState} from "react";
import '../css/Shop.css';
import ShopDisplay from "../display/ShopDisplay";
import {AdditionsAPI} from "../API_access/AdditionsAPI";

const Shop = () => {
    const [additions, setAdditions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    useEffect(() => {
        getRoles();
        getAdditions();
    }, []);

    const getRoles = () => {
        let token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
        }
    }

    const getAdditions = () => {
        AdditionsAPI.getAll(token).then(
            function (response) {
                setAdditions(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <ShopDisplay additions={additions} roles={roles}/>
    )
}
export default Shop;