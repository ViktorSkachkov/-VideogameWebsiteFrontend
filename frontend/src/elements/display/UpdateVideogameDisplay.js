import {useState} from "react";
import {useNavigate} from "react-router-dom";

const UpdateVideogameDisplay = (props) => {
    const [returnSign, setReturnSign] = useState("<");
    let navigate = useNavigate();

    const handleChangeFeatured = (e) => {
        e.preventDefault();

        props.setFeatured(e.target.value);
    }

    return (
        <div className="updateGameBody">
            <button className="buyGameButton" onClick={() => {
                navigate(`/games`, {
                });
            }}>{returnSign}</button>
            <center className="formBackground"><br/>
                <img src={props.image} width="400px" height="400px" alt=""/>
                <form onSubmit={props.handleSubmit}>
                    <br/><br/>
                    <label htmlFor="image" className="formLabelImage">Image</label><br/><br/>
                    <input type="file" name="image" onChange={props.onChangeImage} className="Label"/><br/><br/>
                    <select value={props.featured} onChange={handleChangeFeatured}>
                        <option value={true}>Featured</option>
                        <option value={false}>Not Featured</option>
                    </select><br/><br/>
                    <label htmlFor="name" className="formLabelName">Name</label><br/>
                    <input type="text" name="name" onChange={props.onChangeName} value={props.name} className="Label" /><br/><br/>
                    <label htmlFor="username" className="formLabelDescription">Description</label><br/>
                    <textarea type="text" name="description" onChange={props.onChangeDescription} value={props.description} className="UpdateTextArea" /><br/><br/>
                    <label htmlFor="number" className="formLabelPrice">Price</label><br/>
                    <input type="number" name="price" onChange={props.onChangePrice} value={props.price} className="Label" /><br/><br/>
                    <button type="submit" className="normalButton">Submit</button>
                </form>
            </center><br/><br/><br/><br/>
        </div>
    )
}
export default UpdateVideogameDisplay;