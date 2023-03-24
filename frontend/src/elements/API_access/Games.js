import {useEffect, useState} from "react";
import axios from "axios";
import '../css/Games.css';
import Cookies from "universal-cookie";
import GamesDisplay from "../display/GamesDisplay";

const Games = (loggedUser) => {
    const [videogames, setVideogames] = useState([]);
    const [roles, setRoles] = useState([]);

    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    useEffect(() => {
        getRoles();
        getVideogames();
    }, []);

    const getRoles = () => {
        let token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
        }
    }
    const getVideogames = () => {
        var config = {
            method: "get",
            url: `http://localhost:8080/videogames`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        axios(config)
            .then(function (response) {
                setVideogames(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <GamesDisplay roles={roles} videogames={videogames}/>
    )
}
export default Games;