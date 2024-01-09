import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import {addPopularMovies} from "../utils/movieSlice"

const usePopularMovie = () =>{
        // fetch data from TMDB api and update the store
        const dispatch = useDispatch();
        const popularMovies = useSelector((store) => store.movies.popularMovies)
        const getPopularMovies = async() =>{
            const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
            
            const json = await data.json();
            dispatch(addPopularMovies(json.results));
        }
        // we will call this inside useEffect so that it will call only once my component renders
        useEffect(() => {
          !popularMovies && getPopularMovies();
        }, []);
}

export default usePopularMovie;