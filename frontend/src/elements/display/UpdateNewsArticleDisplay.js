const UpdateNewsArticleDisplay = (props) => {

    return (
        <>
            <center>
                <img src={props.image} height="300px" width="300px" alt=""/>
                <form onSubmit={props.handleSubmit}>
                    <br/><br/>
                    <label htmlFor="image" className="formLabelImage">New Image</label><br/><br/>
                    <input type="file" name="image" onChange={props.onChangeImage} className="UpdateLabel"/><br/><br/>
                    <label htmlFor="name" className="formLabelName">Title</label><br/>
                    <input type="text" name="title" onChange={props.onChangeTitle} value={props.title} className="UpdateLabel" /><br/><br/>
                    <label htmlFor="text" className="formLabelText">Text</label><br/>
                    <textarea type="text" name="text" onChange={props.onChangeText} value={props.text} className="UpdateTextArea" /><br/><br/>
                    <button type="submit" className="normalButton">Submit</button>
                </form><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </center>
        </>
    )
}
export default UpdateNewsArticleDisplay;