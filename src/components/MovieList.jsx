import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
// import MovieCard from "./MovieCard;";

// fetch in parent (MovieList) so more components can have access
const MovieList = () => {
  const [movies, setMovies] = useState([]); // house all the data
  const [pageNum, setPageNum] = useState(1); // stores current page #, starting @ 1
  const [allPages, setAllPages] = useState(null); // stores amount of pages within database
  const [searchQuery, setSearchQuery] = useState(""); // stores current text in search bar, then changes depending on user input
  const [message, setMessage] = useState(""); // stores message user sees from search request
  const [isSearch, setIsSearch] = useState(false); // boolean to monitor switching state

  function loading() {
    setPageNum((prevNum) => prevNum + 1);
  }
  // console.log(movies.map((m) => m.id)); // debugging page #

  // API request sent
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchClick = async () => {
    console.log(searchQuery); // debugging

    if (!searchQuery) {
      setMessage("Search a term.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: `${import.meta.env.VITE_API_KEY}`,
            query: searchQuery,
          },
        }
      );

      const movies = response.data.results;

      if (movies.length > 0) {
        setMovies(movies);
        setMessage("");
        setPageNum(1); // stylistic choice: paging reset
      } else {
        setMovies([]);
        setMessage("No movies found.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  // reload
  useEffect(() => {
    if (isSearch) return; // if search is ongoing don't reload normal page

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
    console.log([pageNum]); // debugging

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, isSearch]); // re render when pageNum changes or user searches (onClick)

  // mode changes
  useEffect(() => {
    setMovies([]);
    setMessage("");
    setPageNum(1);
    setAllPages(null);
    setSearchQuery("");
  }, [isSearch]);

  return (
    <>
      <div id="switching">
        <button onClick={() => setIsSearch(false)} disabled={!isSearch}>
          Now Playing
        </button>
        <button onClick={() => setIsSearch(true)} disabled={isSearch}>
          Search
        </button>
      </div>

      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          onKeyDown={(enter) => {
            if (enter.key === "Enter") searchClick(); // allows user to hit enter to search
          }}
        />
        <button onClick={searchClick}>Search</button>
      </div>
      {message}

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
