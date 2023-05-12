import {useNavigate} from "react-router-dom";
import '../css/AdditionCardAdmin.css';
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import {useState, useEffect} from "react";
import {GamesAPI} from "../API_access/GamesAPI";

const AdditionCardAdmin = (addition) => {
    let navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    function deleteAddition(id) {
        AdditionsAPI.delete(id, token).then(
            function (response) {
                alert('Addition successfully deleted!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        getGame();
    }, [addition.handleChangeVideogame]);

    const getGame = () => {
            GamesAPI.getById(addition.addition.gameId, token).then(
                function (response) {
                    setGame(response.data);
                }
            )
                .catch(function (error) {
                    console.log(error);
                })
    }

    return (
        <>
        {game != null ?
        <div className="additionArticleCard">
            <div>
                <img src={addition.addition.image} height="300px" width="450px" alt=""/>
            </div>
            <div>
                <h1>{addition.addition.name}</h1>
                <b><p>Price: {addition.addition.price}</p></b>
                    <b><p>For {game.name}</p></b>
                {addition.addition.description.length > 125 ?
                    <p className="text">{addition.addition.description.substr(0, 125)}...</p> :
                <p className="text">{addition.addition.description}</p>}
                <button className="shopButton" onClick={() => deleteAddition(addition.addition.id) }>Remove</button> <button className="shopButton" onClick={() => {
                navigate(`/updateAddition/${addition.addition.id}`, {

                });
            }}>Update</button>
            </div>
        </div> :
            <p>Loading...</p>}
        </>
    )
}
export default AdditionCardAdmin;