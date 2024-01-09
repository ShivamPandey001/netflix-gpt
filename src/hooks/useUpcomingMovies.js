import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import {addUpComingMovies} from "../utils/movieSlice"

const useUpcomingMovies = () =>{
        // fetch data from TMDB api and update the store
        const dispatch = useDispatch();
        const upComingMovies = useSelector((store)=> store.movies.upComingMovies)
        const getUpcomingMovies = async() =>{
            const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', API_OPTIONS);
            
            const json = await data.json();
            dispatch(addUpComingMovies(json.results));
        }
        // we will call this inside useEffect so that it will call only once my component renders
        useEffect(() => {
          !upComingMovies && getUpcomingMovies();
        }, []);
}

export default useUpcomingMovies;