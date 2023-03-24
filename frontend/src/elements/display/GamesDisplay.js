import VideogameCard from "../API_access/VideogameCard";
import VideogameCardAdmin from "../API_access/VideogameCardAdmin";
import {useNavigate} from "react-router-dom";

const GamesDisplay = (props) => {
    let navigate = useNavigate();

    return (
        <>
            <center>
                <img src="/69piR5.jpg" width="80%" height="400px"  alt="Currently the image can't load"/>
                <h1 className="title">GAMES</h1>
                <h3 className="title">Filters</h3>
            </center>
            {props.roles.some(r => r == "EMPLOYEE") ?
                <center>
                    <div className="listOfGamesAdmin">
                        {props.videogames.map((videogame) => (
                            <VideogameCardAdmin videogame={videogame} />
                        ))}
                    </div>
                    <button onClick={() => {
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