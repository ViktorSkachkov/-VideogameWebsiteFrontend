import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import ViewAdditionDisplay from "../display/ViewAdditionDisplay";

const ViewAddition = (loggedUser) => {
    const [addition, setAddition] = useState(null);
    const [review, setReview] = useState(null);
    let params = useParams();
    const id = params.id;

    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    useEffect(() => {
        getAddition();
    }, []);
    const handleSubmit = (e) => {

    };
    const getAddition = () => {
        var config = {
            method: "get",
            url: `http://localhost:8080/additions/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        axios(config)
            .then(function (response) {
                setAddition(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const onChangeReview = event => {
        setReview(event.target.value);
    }

    return (
        <ViewAdditionDisplay handleSubmit={handleSubmit} review={review} addition={addition} onChangeReview={onChangeReview}/>
    )
}
export default ViewAddition;