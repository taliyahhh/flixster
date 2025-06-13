// import { useState, useEffect } from "react";
// import axios from "axios";

import "./App.css";
import MovieList from "./components/MovieList";
const App = () => {
  return (
    <>
      {/* <button onClick={() => setMovies()}>SET MOVIES</button> */}
      <div className="App">
        <MovieList />
      </div>
    </>
  );
};

export default App;
