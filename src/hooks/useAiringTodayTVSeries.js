import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../constants";
import {addAiringTodayTVSeries} from "../utils/movieSlice"

const useAiringTodayTVSeries = () =>{
        // fetch data from TMDB api and update the store
        const dispatch = useDispatch();
        const getArrivingTodayTVSeries = async() =>{
            const data = await fetch('https://api.themoviedb.org/3/tv/airing_today', API_OPTIONS);
            
            const json = await data.json();
            dispatch(addAiringTodayTVSeries(json.results));
        }
        // we will call this inside useEffect so that it will call only once my component renders
        useEffect(() => {
          getArrivingTodayTVSeries();
        }, []);
}

export default useAiringTodayTVSeries;