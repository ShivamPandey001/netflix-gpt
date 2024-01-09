import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import {addNowPlayingMovies} from "../utils/movieSlice"

const useNowPlayingMovies = () =>{
        // fetch data from TMDB api and update the store
        const dispatch = useDispatch();
        const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)
        const getNowPlayingMovie = async() =>{
            const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        
            const json = await data.json();
            dispatch(addNowPlayingMovies(json.results));
        }
        // we will call this inside useEffect so that it will call only once my component renders
        useEffect(() => {
          !nowPlayingMovies && getNowPlayingMovie();
        }, []);
}

export default useNowPlayingMovies;