import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../constants";
import {addTopRatedTVSeries} from "../utils/movieSlice"

const useTopRatedTVSeries = () =>{
        // fetch data from TMDB api and update the store
        const dispatch = useDispatch();
        const getTopRatedTVSeries = async() =>{
            const data = await fetch('https://api.themoviedb.org/3/tv/top_rated', API_OPTIONS);
            
            const json = await data.json();
            dispatch(addTopRatedTVSeries(json.results));
        }
        // we will call this inside useEffect so that it will call only once my component renders
        useEffect(() => {
          getTopRatedTVSeries();
        }, []);
}

export default useTopRatedTVSeries;