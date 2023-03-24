const ViewNewsArticleDisplay = (props) => {

    return (
        <>
            {props.newsArticle != null ?
                <div className="viewGameBody">
                    <center>
                        <img src="/69piR5.jpg" width="80%" height="400px"  alt="Currently the image can't load"/>
                        <h1>{props.newsArticle.title}</h1>
                        <p>{props.newsArticle.text}</p>
                    </center>
                </div> :
                <p>Loading...</p>}
        </>
    )
}
export default ViewNewsArticleDisplay;