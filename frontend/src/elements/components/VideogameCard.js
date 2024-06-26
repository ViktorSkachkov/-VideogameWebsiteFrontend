import '../css/VideogameCard.css';
import {useNavigate} from "react-router-dom";
const VideogameCard = (videogame) => {
    let navigate = useNavigate();

    return (
        <div className="videogameCard"  onClick={() => {
                navigate(`/game/${videogame.videogame.id}`, {
            });
        }}>
            <div>
                <img src={videogame.videogame.image} height="300px" width="450px" alt=""/>
            </div>
            <div className="">
                <center>
                    {videogame.videogame.name.length > 28 ?
                        <h1>{videogame.videogame.name.substr(0, 28)}...</h1> :
                        <h1>{videogame.videogame.name}</h1>}
                </center>
            </div>
            <div className="lowerPart">
                <b><p className="price">Price: {videogame.videogame.price}€</p></b>
                {videogame.videogame.description.length > 125 ?
                <p className="videogameDescription">{videogame.videogame.description.substr(0, 125)}...</p> :
                    <p className="videogameDescription">{videogame.videogame.description}</p>}
            </div>
        </div>
    )
}
export default VideogameCard;