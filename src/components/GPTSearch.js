import GPTMovieSuggestion from "./GPTMovieSuggestionBar";
import GPTSearchBar from "./GPTSearchBar";
import { BGIMAGE } from "../constants";
const GPTSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        {/* // TODO: make it compatible for smaller devices */}
        {/* <img className="h-screen object-cover" src={BGIMAGE} alt="backGroundImage" /> */}
        <img src={BGIMAGE} alt="backGroundImage" />
      </div>
      <div className="pt-[30%] md:p-0">
        <GPTSearchBar />
        <GPTMovieSuggestion />
      </div>
    </>
  );
};

export default GPTSearch;
