import usePopularMovie from "../hooks/usePopularMovie";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedTVSeries from "../hooks/useTopRatedTVSeries";
import useAiringTodayTVSeries from "../hooks/useAiringTodayTVSeries";

const Browse = () => {  
    useNowPlayingMovies();  
    usePopularMovie();
    useTopRatedMovies();
    useUpcomingMovies();
    useTopRatedTVSeries();
    useAiringTodayTVSeries();
    return <div> 
        <Header/>
        <MainContainer/>
    </div>
}

export default Browse;