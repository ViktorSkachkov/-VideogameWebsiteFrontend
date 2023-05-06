import '../css/AdditionCard.css';
import {useNavigate} from "react-router-dom";

const AdditionCard = (addition) => {
    let navigate = useNavigate();

    return (
        <div className="additionCard"  onClick={() => {
            navigate(`/addition/${addition.addition.id}`, {
            });
        }}>
            <div>
                <img src={addition.addition.image} height="400px" width="450px" alt=""/>
            </div>
            <div className="">
                <center>
                    <h1>{addition.addition.name}</h1>
                </center>
            </div>
            <div className="lowerPart">
                <b><p className="price">Price: {addition.addition.price}</p></b>
                {addition.addition.description.length > 125 ?
                    <p className="description">{addition.addition.description.substr(0, 125)}...</p> :
                <p className="description">{addition.addition.description}</p>}
            </div>
        </div>
    )
}
export default AdditionCard;