import '../css/ViewGameDisplay.css';
import ReviewCard from "../components/ReviewCard";

const ViewGameDisplay = (props) => {

    return (
        <>
            {props.game != null ?
                <div className="viewGameBody">
                    <center className="formBackground"><br/>
                        <img src={props.game.image} width="400px" height="400px" alt="Currently the image can't load"/>
                        <h1>{props.game.name}</h1>
                        <b><p>Price: {props.game.price}</p></b>
                        <p>{props.game.description}</p>
                        <label htmlFor="units" className="formLabelUnits">Number</label>
                        <input type="number" name="units" value={props.units} onChange={props.onChangeUnits} className="gameNumber"/>
                        <button className="buyGameButton" onClick={() => props.buyGame(props.game.id) }>Buy</button>
                        <h3>Reviews</h3>

                        {props.reviews.map((review) => (
                            <ReviewCard review={review} token={props.token}/>
                        ))}

                        <label htmlFor="review" className="review">Write Review</label><br/>
                        <textarea className="reviewGameTextArea" onChange={props.onChangeReview} name="review" type="text"/><br/><br/>
                        <button onClick={() => props.addReview() } className="submitGameOrderButton">Submit Review</button><br/><br/>
                    </center>
                </div> :
                <p>Loading...</p>}<br/><br/><br/><br/>
        </>
    )
}
export default ViewGameDisplay;