import { useDispatch, useSelector } from "react-redux";
import lang from "./languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../constants";
import { addGptMovies } from "../utils/gptSlice";

const GPTSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
    const dispatch = useDispatch();
    // Search for the movies from TMDB api based on the gptMovies Result
    // TODO: ideally extract it in the hooks and use the same;
    const searchMoviesFromTMDB = async(movie) =>{
        const data = await fetch(
          "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
          API_OPTIONS
        );
        const json = await data.json();
        return json.results;
    }

    const searchText = useRef(null)
    const handleGptSearchButton = async()=>{
        console.log("searchText"+searchText.current.value);
         
        const gptQuery =
          "Act as a movie recommendation system and suggest some movies for the quer :" +
          searchText.current.value +
          ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Koi Mil Gaya, Jab tak hai Jaan";

         
        // Make an API call to get the movie results
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user',content: gptQuery }],
            model: 'gpt-3.5-turbo',
          });
          console.log(gptResults.choices)

          if (!gptQuery.choices) {
            // TODO: write error handling here
          } 
          // this will give us array of movies
          const gptMovies = gptResults.choices?.[0]?.message?.content?.split(",");

        //   ['Hera Pheri', ' Golmaal: Fun Unlimited', ' Andaz Apna Apna', ' Three Idiots', '  Chupke Chupke']
          const promiseArray = gptMovies.map(movie => searchMoviesFromTMDB(movie));
          const tmdbResults = await Promise.all(promiseArray);
          console.log(tmdbResults);
          dispatch(addGptMovies({movieName: gptMovies,movieResults :tmdbResults}));
    }

  return (
    <div className="pt-[20%] md:pt-[10%] flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}>
        <input
        ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 rounded-lg" onClick={handleGptSearchButton}>{lang[langKey].search}</button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
