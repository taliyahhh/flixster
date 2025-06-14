import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
// import MovieCard from "./MovieCard;";

const MovieList = () => {
  const [movies, setMovies] = useState([]); // house all the data

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // fetch('???')
        // .then(res => res.json()) //formats the data so its readable
        // .then(data => setMovies(data))

        // const options = {
        //   method: "GET",
        //   url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        //   headers: {
        //     accept: "application/json",
        //     Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        //   },
        // };

        // axios
        //   .request(options)
        //   .then((res) => setMovies(res.data.results))
        //   .catch((err) => console.error(err));

        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
    // fetch in parent so more components can have access
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
        />
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
      <button onClick=""></button>
    </>
  );
};

export default MovieList;
