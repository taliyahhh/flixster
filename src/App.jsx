import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
const App = () => {
  const [movies, setMovies] = useState(null); // house all the data

  console.log("movies", movies);

  useEffect(() => {
    try {
      // fetch('???')
      // .then(res => res.json()) //formats the data so its readable
      // .then(data => setMovies(data))

      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      axios
        .request(options)
        .then((res) => setMovies(res.data.results))
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
    // fetch in parent so more components can have access

    // do i need a  [] ???
    // what is diffence between useEffect and useState
  });

  return (
    <>
      <button onClick={() => setMovies()}>SET MOVIES</button>
      <div className="App">{JSON.stringify(movies)}</div>
    </>
  );
};

export default App;
