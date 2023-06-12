import VideogameCard from "../components/VideogameCard";

const HomeDisplay = (props) => {

    return (
        <>
            <center>
                <img src="/69piR5.jpg" width="80%" height="400px"  alt="Currently the image can't load"/>
            </center>
            {props.roles.some(r => r == "CUSTOMER") ? <>
                <h1 className="title">Featured Games</h1>
                <div className="listOfGames">
                    {props.featuredVideogames.map((videogame) => (
                        <VideogameCard videogame={videogame} />
                    ))}
                </div>
            </> : <>
                {props.roles.some(r => r == "EMPLOYEE") ? <>
                    <center>
                        <h1 className="title">Welcome to the admin panel!</h1>
                        <h3 className="title"><i>From here you can add, remove and update videogames, additions and news articles and view statistics for different products and how much they sell!</i></h3>
                    </center>
                        <br/><br/><br/><br/><br/><br/><br/>
                </> : <>
                    <center>
                        <h1 className="title">Welcome to Red Scar!</h1>
                        <h3 className="title"><i>The best videogame creator! Please, log in before proceeding!</i></h3>
                    </center>
                        <br/><br/><br/><br/><br/><br/><br/>
                </>}
            </>}
        </>
    )
}
export default HomeDisplay;