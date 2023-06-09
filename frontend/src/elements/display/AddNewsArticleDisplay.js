import {useState, useEffect} from "react";
import {GamesAPI} from "../API_access/GamesAPI";
import {useNavigate} from "react-router-dom";

const AddNewsArticleDisplay = (props) => {
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
        <div className="addNewsBody">
            <button className="buyGameButton" onClick={() => {
                navigate(`/news`, {
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
                        <option value={0}>General</option>
                        {videogames.map((videogame) => (
                            <option value={videogame.id}>{videogame.name}</option>
                        ))}
                    </select><br/><br/>
                    <label htmlFor="name" className="formLabelName">Title</label><br/>
                    <input type="text" name="title" onChange={props.onChangeTitle} value={props.title} className="Label" /><br/><br/>
                    <label htmlFor="text" className="formLabelText">Text</label><br/>
                    <textarea type="text"  className="AddTextArea" name="text" onChange={props.onChangeText} value={props.text}/><br/><br/>
                    <button type="submit" className="normalButton">Submit</button>
                </form><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </center>
        </div>
    )
}
export default AddNewsArticleDisplay;