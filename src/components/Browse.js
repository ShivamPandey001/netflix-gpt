import usePopularMovie from "../hooks/usePopularMovie";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedTVSeries from "../hooks/useTopRatedTVSeries";
import useAiringTodayTVSeries from "../hooks/useAiringTodayTVSeries";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  useNowPlayingMovies();
  usePopularMovie();
  useTopRatedMovies();
  useUpcomingMovies();
  useTopRatedTVSeries();
  useAiringTodayTVSeries();
  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
