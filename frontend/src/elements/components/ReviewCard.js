import {UsersAPI} from "../API_access/UsersAPI";
import {useState, useEffect} from "react";
import '../css/ReviewCard.css';
import {ReviewsAPI} from "../API_access/ReviewsAPI";

const ReviewCard = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getItem();
    }, []);

    function deleteReview(reviewId) {
        ReviewsAPI.delete(reviewId, props.token).then(
            function (response) {
                window.location.reload();
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    const getItem = () => {
        UsersAPI.getById(props.review.user_id, props.token).then(
            function (response) {
                setUser(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };
    return (
        <div className="reviewOuter">
        {user != null ?
        <div className="reviewCard">
            <div className="reviewUsername">
                <img src="/userIcon.jpg" alt="" width="75px" height="75px"/>
                <p>{user.username}</p>
            </div>
            <div className="reviewText">
                <div>{props.review.text}</div>
            </div>
            <div className="reviewDelete">
                <button className="deleteButton" onClick={() => deleteReview(props.review.id) } >Delete</button>
            </div>
        </div>
                :
                <p>Loading...</p>}
        </div>
    )
}
export default ReviewCard;