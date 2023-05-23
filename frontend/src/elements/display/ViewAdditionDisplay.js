import '../css/ViewAdditionDisplay.css';
import ReviewCard from "../components/ReviewCard";

const ViewAdditionDisplay = (props) => {

    return (
        <>
            {props.addition != null ?
                <div className="viewAdditionBody">
                    <center className="formBackground"><br/>
                        <img src={props.addition.image} width="400px" height="400px" alt="Currently the image can't load"/>
                        <h1>{props.addition.name}</h1>
                        <b><p>Price: {props.addition.price}</p></b>
                        <b><p>For {props.game.name}</p></b>
                        <p>{props.addition.description}</p>
                        <label htmlFor="units" className="formLabelUnits">Number</label>
                        <input type="number" name="units" value={props.units} onChange={props.onChangeUnits} className="additionNumber"/>
                        <button className="buyAdditionButton" onClick={() => props.buyAddition(props.addition.id) }>Buy</button><br/><br/><br/><br/>

                        <label htmlFor="review" className="review"><b>Write Review</b></label><br/>
                        <textarea className="reviewTextArea" onChange={props.onChangeReview} name="review" type="text"/><br/><br/>
                        <button onClick={() => props.addReview() } className="submitAdditionOrderButton">Submit Review</button><br/><br/>

                        <hr/>
                        <h3>Reviews</h3>
                        {props.reviews.map((review) => (
                            <ReviewCard review={review} token={props.token} userId={props.userId}/>
                        ))}
                    </center>
                </div> :
                <p>Loading...</p>}<br/><br/><br/><br/>
        </>
    )
}
export default ViewAdditionDisplay;