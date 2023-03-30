import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ViewAdditionDisplay from "../display/ViewAdditionDisplay";
import {AdditionsAPI} from "../API_access/AdditionsAPI";

const ViewAddition = (loggedUser) => {
    const [addition, setAddition] = useState(null);
    const [review, setReview] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    let params = useParams();
    const id = params.id;

    useEffect(() => {
        getAddition();
    }, []);
    const handleSubmit = (e) => {

    };
    const getAddition = () => {
        AdditionsAPI.getById(id, token).then(
            function (response) {
                setAddition(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };
    const onChangeReview = event => {
        setReview(event.target.value);
    }

    return (
        <ViewAdditionDisplay handleSubmit={handleSubmit} review={review} addition={addition} onChangeReview={onChangeReview}/>
    )
}
export default ViewAddition;