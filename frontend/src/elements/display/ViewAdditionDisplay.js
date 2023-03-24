const ViewAdditionDisplay = (props) => {

    return (
        <>
            {props.addition != null ?
                <div className="viewGameBody">
                    <center>
                        <img src="/69piR5.jpg" width="80%" height="400px"  alt="Currently the image can't load"/>
                        <h1>{props.addition.name}</h1>
                        <p>{props.addition.description}</p>
                        <button>Add</button>
                        <form onSubmit={props.handleSubmit}>
                            <label htmlFor="review" className="review">Review</label><br/>
                            <input onChange={props.onChangeReview} name="review" type="number" className="Label"/><br/>
                            <button>Submit Review</button><br/><br/>
                        </form>
                    </center>
                </div> :
                <p>Loading...</p>}
        </>
    )
}
export default ViewAdditionDisplay;