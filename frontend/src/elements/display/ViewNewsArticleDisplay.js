import {useState} from "react";
import {useNavigate} from "react-router-dom";

const ViewNewsArticleDisplay = (props) => {
    const [returnSign, setReturnSign] = useState("<");
    let navigate = useNavigate();

    return (
        <>
            {props.newsArticle != null ?
                <div className="viewNewsBody">
                    <button className="buyGameButton" onClick={() => {
                        navigate(`/news`, {
                        });
                    }}>{returnSign}</button>
                    <center className="formBackground"><br/>
                        <img src={props.newsArticle.image} width="400px" height="400px" alt="Currently the image can't load"/>
                        <h1>{props.newsArticle.title}</h1>
                        <p>{props.newsArticle.text}</p>
                    </center><br/><br/>
                </div> :
                <p>Loading...</p>}
        </>
    )
}
export default ViewNewsArticleDisplay;

