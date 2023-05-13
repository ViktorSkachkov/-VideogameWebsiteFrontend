const UpdateVideogameDisplay = (props) => {

    return (
        <>
            <center className="formBackground"><br/>
                <img src={props.image} width="400px" height="400px" alt=""/>
                <form onSubmit={props.handleSubmit}>
                    <br/><br/>
                    <label htmlFor="image" className="formLabelImage">Image</label><br/><br/>
                    <input type="file" name="image" onChange={props.onChangeImage} className="Label"/><br/><br/>
                    <label htmlFor="name" className="formLabelName">Name</label><br/>
                    <input type="text" name="name" onChange={props.onChangeName} value={props.name} className="Label" /><br/><br/>
                    <label htmlFor="username" className="formLabelDescription">Description</label><br/>
                    <textarea type="text" name="description" onChange={props.onChangeDescription} value={props.description} className="UpdateTextArea" /><br/><br/>
                    <label htmlFor="number" className="formLabelPrice">Price</label><br/>
                    <input type="number" name="price" onChange={props.onChangePrice} value={props.price} className="Label" /><br/><br/>
                    <button type="submit" className="normalButton">Submit</button>
                </form>
            </center><br/><br/><br/><br/>
        </>
    )
}
export default UpdateVideogameDisplay;