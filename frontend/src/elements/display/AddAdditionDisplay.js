import {useEffect, useState} from "react";
import {GamesAPI} from "../API_access/GamesAPI";
import {useNavigate} from "react-router-dom";

const AddAdditionDisplay = (props) => {
    const [videogames, setVideogames] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [returnSign, setReturnSign] = useState("<");
    let navigate = useNavigate();

    useEffect(() => {
        getVideogames();
    }, []);

    const handleChangeVideogame = (e) => {
        e.preventDefault();

        props.setGameId(e.target.value);
    }

    const getVideogames = () => {
        GamesAPI.getAll(token).then(
            function (response) {
                setVideogames(response.data);
                props.setGameId(response.data.at(0).id);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="addAdditionBody">
            <button className="buyGameButton" onClick={() => {
                navigate(`/additions`, {
                });
            }}>{returnSign}</button>
            <center>
                <form className="formBackground" onSubmit={props.handleSubmit}>
                    <br/><br/>
                    <label htmlFor="image" className="formLabelImage">Image</label><br/><br/>
                    <input type="file" name="image" onChange={(e) => {
                        props.onChangeImage(e);
                    }} required={true} accept="image/*" className="Label"/><br/><br/>
                    <label htmlFor="name" className="formLabelVideogame">Videogame</label><br/>
                    <select value={props.gameId} onChange={handleChangeVideogame}>
                        {videogames.map((videogame) => (
                            <option value={videogame.id}>{videogame.name}</option>
                        ))}
                    </select><br/><br/>
                    <label htmlFor="name" className="formLabelName">Name</label><br/>
                    <input type="text" name="name" onChange={props.onChangeName} value={props.name} className="Label" /><br/><br/>
                    <label htmlFor="username" className="formLabelDescription">Description</label><br/>
                    <textarea type="text" name="description" onChange={props.onChangeDescription} value={props.description} className="AddTextArea" /><br/><br/>
                    <label htmlFor="number" className="formLabelPrice">Price</label><br/>
                    <input type="number" name="price" onChange={props.onChangePrice} value={props.price} className="Label" /><br/><br/>
                    <button type="submit" className="normalButton">Submit</button>
                </form><br/><br/><br/><br/>
            </center>
        </div>
    )
}
export default AddAdditionDisplay;