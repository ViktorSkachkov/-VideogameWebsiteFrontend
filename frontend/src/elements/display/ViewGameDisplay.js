import '../css/ViewGameDisplay.css';
import ReviewCard from "../components/ReviewCard";

const ViewGameDisplay = (props) => {

    return (
        <>
            {props.game != null ?
                <div className="viewGameBody">
                    <center>
                        <img src="/69piR5.jpg" width="80%" height="400px"  alt="Currently the image can't load"/>
                        <h1>{props.game.name}</h1>
                        <p>{props.game.description}</p>
                        <label htmlFor="units" className="formLabelUnits">Number</label><br/>
                        <input type="number" name="units" value={props.units} onChange={props.onChangeUnits} className="Label"/>
                        <button onClick={() => props.buyGame(props.game.id) }>Buy</button><br/><br/>

                        {props.reviews.map((review) => (
                            <ReviewCard review={review} token={props.token}/>
                        ))}

                        <label htmlFor="review" className="review">Review</label><br/>
                        <textarea className="reviewTextArea" onChange={props.onChangeReview} name="review" type="text"/><br/>
                        <button onClick={() => props.addReview() } className="submitButton">Submit Review</button><br/><br/>
                    </center>
                </div> :
                <p>Loading...</p>}
        </>
    )
}
export default ViewGameDisplay;