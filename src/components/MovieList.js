import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-7">
      <h1 className="py-2 text-lg md:text-3xl text-white">{title}</h1>

      <div className="flex">
        <div className="flex overflow-x-scroll">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
