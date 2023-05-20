import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import '../css/ViewGame.css';
import ViewGameDisplay from "../display/ViewGameDisplay";
import {GamesAPI} from "../API_access/GamesAPI";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";
import {ReviewsAPI} from "../API_access/ReviewsAPI";

const ViewGame = (loggedUser) => {
    const [game, setGame] = useState(null);
    const [review, setReview] = useState(null);
    const [units, setUnits] = useState(1);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [userId, setUserId] = useState(1);
    const [reviews, setReviews] = useState([]);

    let params = useParams();
    const id = params.id;

    let navigate = useNavigate();

    useEffect(() => {
        getVideogame();
        getUserId();
        getReviews();
    }, []);

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
    const getUserId = () => {
        const token_deserialized = JSON.parse(localStorage.getItem("token"));
        setUserId(token_deserialized.id);
    }
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
    function addReview() {
        let data = {
            "reviewed_item_id": id,
            "user_id": userId,
            "text": review,
            "type_of_reviewed_item": "game"
        }
        ReviewsAPI.create(data, token).then(
            function (response) {
                window.location.reload();
                //navigate(`/game/${id}`);
                //alert('Review successfully added!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    function getReviews() {
        ReviewsAPI.getById(id, "game", token).then(
            function (response) {
                setReviews(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    function buyGame(id) {
        if(units >= 1) {
            //const token_deserialized = JSON.parse(localStorage.getItem("token"));
            //if(token_deserialized != null) {
            //let userId = token_deserialized.id;
            //}

            let data = {
                "game": id,
                "user": userId,
                "units": units
            }
            GameOrdersAPI.create(data, token).then(
                function (response) {
                    alert('Product successfully added to cart!');
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
        <ViewGameDisplay onChangeReview={onChangeReview} review={review} game={game} units={units}
                         onChangeUnits={onChangeUnits} buyGame={buyGame} addReview={addReview} reviews={reviews}
        token={token}/>
    )
}
export default ViewGame;