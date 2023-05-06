import {useNavigate} from "react-router-dom";
import '../css/AdditionCardAdmin.css';
import {AdditionsAPI} from "../API_access/AdditionsAPI";
import {useState} from "react";

const AdditionCardAdmin = (addition) => {
    let navigate = useNavigate();
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));

    function deleteAddition(id) {
        AdditionsAPI.delete(id, token).then(
            function (response) {
                alert('Addition successfully deleted!');
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }
    return (
        <div className="additionArticleCard">
            <div>
                <img src={addition.addition.image} height="300px" width="450px" alt=""/>
            </div>
            <div>
                <h1>{addition.addition.name}</h1>
                {addition.addition.description.length > 125 ?
                    <p className="text">{addition.addition.description.substr(0, 125)}...</p> :
                <p className="text">{addition.addition.description}</p>}
                <button onClick={() => deleteAddition(addition.addition.id) }>Remove</button> <button onClick={() => {
                navigate(`/updateAddition/${addition.addition.id}`, {

                });
            }}>Update</button>
            </div>
        </div>
    )
}
export default AdditionCardAdmin;