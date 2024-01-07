import usePopularMovie from "../hooks/usePopularMovie";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

const Browse = () => {  
    useNowPlayingMovies();  
    usePopularMovie();
    useTopRatedMovies();
    return <div> 
        <Header/>
        <MainContainer/>
    </div>
}

export default Browse;