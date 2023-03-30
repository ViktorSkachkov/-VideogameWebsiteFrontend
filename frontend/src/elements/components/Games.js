import {useEffect, useState} from "react";
import '../css/Games.css';
import GamesDisplay from "../display/GamesDisplay";
import {GamesAPI} from "../API_access/GamesAPI";

const Games = (props) => {
    const [videogames, setVideogames] = useState([]);
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    useEffect(() => {
        getRoles();
        getVideogames();
        //setToken(JSON.parse(localStorage.getItem("accessToken")));
    }, []);

    const getRoles = () => {
        console.log("props " + props.token);
        let token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
        }
    }
    const getVideogames = () => {
        GamesAPI.getAll(token).then(
            function (response) {
                setVideogames(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }
    return (
        <GamesDisplay roles={roles} videogames={videogames}/>
    )
}
export default Games;