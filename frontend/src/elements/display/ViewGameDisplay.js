import {GamesAPI} from "../API_access/GamesAPI";
import {GameOrdersAPI} from "../API_access/GameOrdersAPI";

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
                        <button onClick={() => props.buyGame(props.game.id) }>Buy</button>
                        <form onSubmit={props.handleSubmit}>
                            <label htmlFor="review" className="review">Review</label><br/>
                            <input onChange={props.onChangeReview} name="review" type="number" className="Label"/><br/>
                            <button>Submit Review</button><br/><br/>
                        </form>
                    </center>
                </div> :
                <p>Loading...</p>}
        </>
    )
}
export default ViewGameDisplay;