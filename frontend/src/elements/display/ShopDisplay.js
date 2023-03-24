import {useNavigate} from "react-router-dom";
import AdditionCardAdmin from "../API_access/AdditionCardAdmin";
import AdditionCard from "../API_access/AdditionCard";

const ShopDisplay = (props) => {
    let navigate = useNavigate();

    return (
        <>
            <center>
                <h1 className="title">ADDITIONS</h1>
                <h3 className="title">Filters</h3>
                {props.roles.some(r => r == "EMPLOYEE") ?
                    <> <div className="listOfAdditionsAdmin">
                        {
                            props.additions.map((addition) => (
                                <AdditionCardAdmin addition={addition}/>
                            ))
                        }
                    </div>
                        <button onClick={() => {
                            navigate(`/addAddition`, {
                            });
                        }}>Add Addition</button></>
                    : props.roles.some(r => r == "CUSTOMER") ?
                        <div className="listOfAdditions">
                            {
                                props.additions.map((addition) => (
                                    <AdditionCard addition={addition}/>
                                ))
                            }
                        </div> : <></>
                }
            </center><br/>
        </>
    )
}
export default ShopDisplay;