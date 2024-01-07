import GPTMovieSuggestion from "./GPTMovieSuggestionBar";
import GPTSearchBar from "./GPTSearchBar";
import { BGIMAGE } from "../constants";
const GPTSearch = () =>{
    return <div>
        <div className="absolute -z-10">
        <img
          src={BGIMAGE}
          alt="backGroundImage"
        />
      </div>
        <GPTSearchBar/>
        <GPTMovieSuggestion/>
    </div>
}

export default GPTSearch;