import VideogameCard from "../components/VideogameCard";
import VideogameCardAdmin from "../components/VideogameCardAdmin";
import {useNavigate} from "react-router-dom";

const GamesDisplay = (props) => {
    let navigate = useNavigate();

    return (
        <>
            <center>
                <h1 className="titleGames">GAMES</h1>
            </center>
            {props.roles.some(r => r == "EMPLOYEE") ?
                <center>
                    <div className="listOfGamesAdmin">
                        {props.videogames.map((videogame) => (
                            <VideogameCardAdmin videogame={videogame} />
                        ))}
                    </div>
                    <button className="gameButton" onClick={() => {
                        navigate(`/addVideogame`, {
                        });
                    }}>Add Game</button>
                </center> :  props.roles.some(r => r == "CUSTOMER") ?
                    <div className="listOfGames">
                        {props.videogames.map((videogame) => (
                            <VideogameCard videogame={videogame} />
                        ))}
                    </div> : <></>}
            <br/>
        </>
    )
}
export default GamesDisplay;