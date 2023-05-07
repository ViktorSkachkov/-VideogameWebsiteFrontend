import {useNavigate} from "react-router-dom";
import '../css/VideogameCardAdmin.css';
import {GamesAPI} from "../API_access/GamesAPI";
import {useState} from "react";

const VideogameCardAdmin = (videogame) => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let navigate = useNavigate();

    function deleteGame(id) {
        GamesAPI.delete(id, token).then(
            function (response) {
                alert('Videogame successfully deleted!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="videogameArticleCard">
            <div className="videogameArticleCardImage">
                <img src={videogame.videogame.image} height="300px" width="450px" alt=""/>
            </div>
            <div className="videogameArticleCardEncompassingContainer">

            <div className="videogameArticleCardContents">
                <h1>{videogame.videogame.name}</h1>
                <b><p>Price: {videogame.videogame.price}</p></b>
                {videogame.videogame.description.length > 125 ?
                    <p className="text">{videogame.videogame.description.substr(0, 125)}...</p> :
                <p className="text">{videogame.videogame.description}</p>}
                <button onClick={() => deleteGame(videogame.videogame.id) }>Remove</button> <button onClick={() => {
                navigate(`/updateVideogame/${videogame.videogame.id}`, {

                });
            }}>Update</button>
            </div>

            </div>
        </div>
    )
}
export default VideogameCardAdmin;