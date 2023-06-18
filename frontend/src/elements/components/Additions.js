import {useEffect, useState} from "react";
import '../css/Additions.css';
import AdditionsDisplay from "../display/AdditionsDisplay";
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import {GamesAPI} from "../API_access/GamesAPI";
import jwtDecode from "jwt-decode";

const Additions = (props) => {
    const [additions, setAdditions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [videogames, setVideogames] = useState([]);
    const [gameId, setGameId] = useState(-1);

    useEffect(() => {
        getRoles();
        getAdditions();
        getVideogames();
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

    const handleChangeVideogame = (e) => {
        e.preventDefault();

        setGameId(e.target.value);

        AdditionsAPI.getByGame(e.target.value, token).then(
            function (response) {
                setAdditions(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    const getVideogames = () => {
        GamesAPI.getForAdditionsFilter(token).then(
            function (response) {
                setVideogames(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <AdditionsDisplay additions={additions} roles={roles} handleChangeVideogame={handleChangeVideogame}
                          gameId={gameId} videogames={videogames}/>
    )
}
export default Additions;