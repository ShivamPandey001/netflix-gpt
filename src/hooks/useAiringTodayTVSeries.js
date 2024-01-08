import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { API_OPTIONS } from "../constants";
import {addAiringTodayTVSeries} from "../utils/movieSlice"

const useAiringTodayTVSeries = () =>{
        // fetch data from TMDB api and update the store
        const dispatch = useDispatch();
        const airingTodayTVSeries = useSelector((store)=> store.movies.airingTodayTVSeries)
        const getArrivingTodayTVSeries = async() =>{
            const data = await fetch('https://api.themoviedb.org/3/tv/airing_today', API_OPTIONS);
            
            const json = await data.json();
            dispatch(addAiringTodayTVSeries(json.results));
        }
        // we will call this inside useEffect so that it will call only once my component renders
        useEffect(() => {
          !airingTodayTVSeries && getArrivingTodayTVSeries();
        }, []);
}

export default useAiringTodayTVSeries;