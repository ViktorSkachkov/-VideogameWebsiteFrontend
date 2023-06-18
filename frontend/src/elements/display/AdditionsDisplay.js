import {useNavigate} from "react-router-dom";
import AdditionCardAdmin from "../components/AdditionCardAdmin";
import AdditionCard from "../components/AdditionCard";

const AdditionsDisplay = (props) => {
    let navigate = useNavigate();

    return (
        <>
            <center>
                <h1 className="titleShop">ADDITIONS</h1>
                <h4 className="titleShop">Filter on videogame:</h4>
                <select className="filter" value={props.gameId} onChange={props.handleChangeVideogame}>
                    <option value={-1}>All</option>
                    {props.videogames.map((videogame) => (
                        <option value={videogame.id}>{videogame.name}</option>
                    ))}
                </select><br/><br/>

                {props.roles.some(r => r == "EMPLOYEE") ?
                    <>
                        <button className="shopButton" onClick={() => {
                            navigate(`/addAddition`, {
                            });
                        }}>Add Addition</button><br/><br/>
                        <div className="listOfAdditionsAdmin">
                        {
                            props.additions.map((addition) => (
                                <AdditionCardAdmin addition={addition} handleChangeVideogame={props.handleChangeVideogame}
                                                   gameId={props.gameId}/>
                            ))
                        }
                    </div>
                    </>
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