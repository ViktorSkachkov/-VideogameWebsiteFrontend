import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import '../css/ViewGame.css';
import ViewGameDisplay from "../display/ViewGameDisplay";
import {GamesAPI} from "../API_access/GamesAPI";

const ViewGame = (loggedUser) => {
    const [game, setGame] = useState(null);
    const [review, setReview] = useState(null);
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

    /*return (
        <>
            {game != null ?
                <div className="viewGameBody">
                    <center>
                        <img src="/69piR5.jpg" width="80%" height="400px"  alt="Currently the image can't load"/>
                        <h1>{game.name}</h1>
                        <p>{game.description}</p>
                        <button>Buy</button>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="review" className="review">Review</label><br/>
                            <input onChange={onChangeReview} name="review" type="number" className="Label"/><br/>
                            <button>Submit Review</button><br/><br/>
                        </form>
                    </center>
                </div> :
                <p>Loading...</p>}
        </>
    )*/
    return (
        <ViewGameDisplay handleSubmit={handleSubmit} onChangeReview={onChangeReview} review={review} game={game}/>
    )
}
export default ViewGame;