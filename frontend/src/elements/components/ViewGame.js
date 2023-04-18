import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import '../css/ViewGame.css';
import ViewGameDisplay from "../display/ViewGameDisplay";
import {GamesAPI} from "../API_access/GamesAPI";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";

const ViewGame = (loggedUser) => {
    const [game, setGame] = useState(null);
    const [review, setReview] = useState(null);
    const [units, setUnits] = useState(1);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getVideogame();
    }, []);
    const handleSubmit = (e) => {

    };
    const getVideogame = () => {
        GamesAPI.getById(id, token).then(
            function (response) {
                setGame(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };
    const onChangeReview = event => {
        setReview(event.target.value);
    }
    const onChangeUnits = event => {
        if(event.target.value >= 1 || event.target.value == "") {
            setUnits(event.target.value);
        }
        else {
            alert('The number of products should be at least 1!');
        }
    }

    function buyGame(id) {
        if(units >= 1) {
            const token_deserialized = JSON.parse(localStorage.getItem("token"));
            //if(token_deserialized != null) {
            let userId = token_deserialized.id;
            //}

            let data = {
                "game": id,
                "user": userId,
                "units": units
            }
            GameOrdersAPI.create(data, token).then(
                function (response) {
                    alert('Order successfully made!');
                }
            )
                .catch(function (error) {
                    console.log(error);
                })
        }
        else {
            alert('The number of products should be at least 1!');
        }
    }
    return (
        <ViewGameDisplay handleSubmit={handleSubmit} onChangeReview={onChangeReview} review={review}
                         game={game} units={units} onChangeUnits={onChangeUnits} buyGame={buyGame}/>
    )
}
export default ViewGame;