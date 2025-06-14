import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
// import MovieCard from "./MovieCard;";

// fetch in parent (MovieList) so more components can have access
const MovieList = () => {
  const [movies, setMovies] = useState([]); // house all the data
  const [pageNum, setPageNum] = useState(1); // stores current page #, starting @ 1
  const [allPages, setAllPages] = useState(null); // stores amount of pages within database

  function loading() {
    setPageNum((prevNum) => prevNum + 1);
  }
  // console.log(movies.map((m) => m.id)); // debugging page #

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US
          &page=${pageNum}
          &api_key=${import.meta.env.VITE_API_KEY}`
        );

        setAllPages(data.total_pages);
        setMovies((prev) => {
          // adds new to prev movies

          const add = [...prev, ...data.results];

          // filter duplicates by id, to avoid removing React.StrictMode from main.jsx
          const uniqueMovies = add.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          );

          return uniqueMovies;
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies(pageNum);

    console.log([pageNum]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]); // re render when pageNum changes (onClick)

  return (
    <>
      <div>
        {/* <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
        /> */}
      </div>
      <div id="cardz">
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            title={m.title}
            img={m.poster_path}
            avg={m.vote_average}
          />
        ))}
      </div>
      <button
        id="loadMore"
        onClick={loading}
        disabled={allPages != null && pageNum >= allPages}
      >
        Load More
      </button>
    </>
  );
};

export default MovieList;
