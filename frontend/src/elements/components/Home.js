import {useEffect, useState} from "react";
import '../css/Home.css';
import {GamesAPI} from "../API_access/GamesAPI";
import HomeDisplay from "../display/HomeDisplay";

const Home = (props) => {
    const [featuredVideogames, setFeaturedVideogames] = useState([]);
    const [upcomingVideogames, setUpcomingVideogames] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("accessToken")));
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken");
        if(accessToken != "undefined") {
            setToken(JSON.parse(localStorage.getItem("accessToken")));
        }
        getRoles();
        getVideogames();
    }, []);

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

        GamesAPI.getUpcoming(token).then(
            function (response) {
                setUpcomingVideogames(response.data);
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <HomeDisplay roles={roles} featuredVideogames={featuredVideogames} upcomingVideogames={upcomingVideogames}/>
    )
}
export default Home;