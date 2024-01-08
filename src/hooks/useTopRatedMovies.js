import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import {addTopRatedMovies} from "../utils/movieSlice"

const useTopRatedMovies = () =>{
        // fetch data from TMDB api and update the store
        const dispatch = useDispatch();
        const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)
        const getTopRatedMovies = async() =>{
            const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', API_OPTIONS);
            
            const json = await data.json();
            dispatch(addTopRatedMovies(json.results));
        }
        // we will call this inside useEffect so that it will call only once my component renders
        useEffect(() => {
          !topRatedMovies && getTopRatedMovies();
        }, []);
}

export default useTopRatedMovies;