import '../css/ViewAdditionDisplay.css';
import ReviewCard from "../components/ReviewCard";

const ViewAdditionDisplay = (props) => {

    return (
        <>
            {props.addition != null ?
                <div className="viewAdditionBody">
                    <center>
                        <img src={props.addition.image} width="400px" height="400px" alt="Currently the image can't load"/>
                        <h1>{props.addition.name}</h1>
                        <b><p>Price: {props.addition.price}</p></b>
                        <b><p>For {props.game.name}</p></b>
                        <p>{props.addition.description}</p>
                        <label htmlFor="units" className="formLabelUnits">Number</label><br/>
                        <input type="number" name="units" value={props.units} onChange={props.onChangeUnits} className="Label"/>
                        <button onClick={() => props.buyAddition(props.addition.id) }>Buy</button><br/><br/>

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
export default ViewAdditionDisplay;