import {useNavigate} from "react-router-dom";
import AdditionCardAdmin from "../components/AdditionCardAdmin";
import AdditionCard from "../components/AdditionCard";

const AdditionsDisplay = (props) => {
    let navigate = useNavigate();

    return (
        <>
            <center>
                <h1 className="titleShop">ADDITIONS</h1>
                <select className="filter" value={props.gameId} onChange={props.handleChangeVideogame}>
                    <option value={-1}>All</option>
                    {props.videogames.map((videogame) => (
                        <option value={videogame.id}>{videogame.name}</option>
                    ))}
                </select><br/><br/>

                {props.roles.some(r => r == "EMPLOYEE") ?
                    <> <div className="listOfAdditionsAdmin">
                        {
                            props.additions.map((addition) => (
                                <AdditionCardAdmin addition={addition} handleChangeVideogame={props.handleChangeVideogame}
                                                   gameId={props.gameId}/>
                            ))
                        }
                    </div>
                        <button className="shopButton" onClick={() => {
                            navigate(`/addAddition`, {
                            });
                        }}>Add Addition</button></>
                    : props.roles.some(r => r == "CUSTOMER") ?
                        <div className="listOfAdditions">
                            {
                                props.additions.map((addition) => (
                                    <AdditionCard addition={addition} handleChangeVideogame={props.handleChangeVideogame}
                                                  gameId={props.gameId}/>
                                ))
                            }
                        </div> : <></>
                }
            </center><br/><br/><br/>
        </>
    )
}
export default AdditionsDisplay;