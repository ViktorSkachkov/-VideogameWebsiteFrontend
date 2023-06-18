import {useEffect, useState} from "react";
import '../css/Home.css';
import {GamesAPI} from "../API_access/GamesAPI";
import HomeDisplay from "../display/HomeDisplay";
import jwtDecode from "jwt-decode";

const Home = (props) => {
    const [featuredVideogames, setFeaturedVideogames] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken");
        if(accessToken != "undefined") {
            setToken(JSON.parse(localStorage.getItem("accessToken")));
        }
        getRoles();
        getVideogames();
        checkIfTokenHasExpired();
    }, []);

    const checkIfTokenHasExpired = () => {
        if(token != null) {
            const decode = jwtDecode(token);
            const exp = decode.exp;

            if (exp) {
                const currentTime = new Date().getTime() / 1000;

                if (currentTime > exp) {
                    props.removeUser();
                    window.location.reload();
                }
            }
        }
    }

    const getRoles = () => {
        let token_deserialized = JSON.parse(localStorage.getItem("token"));
        if(token_deserialized != null) {
            setRoles(token_deserialized.userRoles.map(element => element.role));
        }
    }

    const getVideogames = () => {
        GamesAPI.getFeatured(token).then(
            function (response) {
                setFeaturedVideogames(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <HomeDisplay roles={roles} featuredVideogames={featuredVideogames}/>
    )
}
export default Home;