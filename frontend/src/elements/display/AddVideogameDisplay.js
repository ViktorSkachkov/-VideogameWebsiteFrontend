import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddVideogameDisplay = (props) => {
    const [returnSign, setReturnSign] = useState("<");
    let navigate = useNavigate();

    const handleChangeFeatured = (e) => {
        e.preventDefault();

        props.setFeatured(e.target.value);
    }

    return (
        <div className="addGameBody">
            <button className="buyGameButton" onClick={() => {
                navigate(`/games`, {
                });
            }}>{returnSign}</button>
            <center>
                <form className="formBackground" onSubmit={props.handleSubmit}>
                    <br/><br/>
                    <label htmlFor="image" className="formLabelImage">Image</label><br/><br/>
                    <input type="file" name="image" onChange={(e) => {
                        props.onChangeImage(e);
                    }} required={true} accept="image/*" className="Label"/><br/><br/>
                    <label htmlFor="name" className="formLabelFeatured">Featured</label><br/>
                    <select value={props.featured} onChange={handleChangeFeatured}>
                            <option value={true}>Featured</option>
                            <option value={false}>Not Featured</option>
                    </select><br/><br/>
                    <label htmlFor="name" className="formLabelName">Name</label><br/>
                    <input type="text" name="name" onChange={props.onChangeName} value={props.name} className="Label" /><br/><br/>
                    <label htmlFor="username" className="formLabelDescription">Description</label><br/>
                    <textarea type="text" name="description" onChange={props.onChangeDescription} value={props.description} className="AddTextArea" /><br/><br/>
                    <label htmlFor="number" className="formLabelPrice">Price</label><br/>
                    <input type="number" name="price" onChange={props.onChangePrice} value={props.price} className="Label" /><br/><br/>
                    <button type="submit" className="normalButton">Submit</button>
                </form><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </center>
        </div>
    )
}
export default AddVideogameDisplay;