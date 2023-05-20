import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ViewAdditionDisplay from "../display/ViewAdditionDisplay";
import '../css/ViewAddition.css';
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import {AdditionOrdersAPI} from "../API_access/AdditionOrdersAPI";
import {ReviewsAPI} from "../API_access/ReviewsAPI";
import {GamesAPI} from "../API_access/GamesAPI";

const ViewAddition = (loggedUser) => {
    const [addition, setAddition] = useState(null);
    const [review, setReview] = useState(null);
    const [units, setUnits] = useState(1);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [userId, setUserId] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [game, setGame] = useState(null);

    let params = useParams();
    const id = params.id;

    let navigate = useNavigate();

    useEffect(() => {
        getAddition();
        getUserId();
        getReviews();
    }, []);

    const getUserId = () => {
        const token_deserialized = JSON.parse(localStorage.getItem("token"));
        setUserId(token_deserialized.id);
    }

    const getAddition = () => {
        AdditionsAPI.getById(id, token).then(
            function (response) {
                setAddition(response.data);
                getGame(response.data.gameId);
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

    function addReview() {
        let data = {
            "reviewed_item_id": id,
            "user_id": userId,
            "text": review,
            "type_of_reviewed_item": "addition"
        }
        ReviewsAPI.create(data, token).then(
            function (response) {
                window.location.reload();
                //alert('Review successfully added!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    function getReviews() {
        ReviewsAPI.getById(id, "addition", token).then(
            function (response) {
                setReviews(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }
    function buyAddition(id) {
        if(units >= 1) {
            const token_deserialized = JSON.parse(localStorage.getItem("token"));

            let userId = token_deserialized.id;

            let data = {
                "addition": id,
                "user": userId,
                "units": units
            }
            AdditionOrdersAPI.create(data, token).then(
                function (response) {
                    navigate(`/additions`);
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

    function getGame(gameId) {
            GamesAPI.getById(gameId, token).then(
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
            <ViewAdditionDisplay review={review} addition={addition} onChangeReview={onChangeReview}
                                 addition={addition} units={units} onChangeUnits={onChangeUnits} buyAddition={buyAddition}
                                 addReview={addReview} reviews={reviews} token={token} game={game}/>
            : <p>Loading...</p>}
        </>
    )
}
export default ViewAddition;