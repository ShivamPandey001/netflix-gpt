import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestion = () => {
  const { movieResults, movieName } = useSelector((store) => store.gpt);
  if (!movieName) return null;
    console.log(movieName);
  return (
    <div className="p-4 m-4 bg-black bg-opacity-90 text-white">
      <div>
        {movieName.map((movie, index) => (
          <MovieList
            key={movie}
            title={movie}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestion;