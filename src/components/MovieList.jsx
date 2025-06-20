import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
// import FlixsterLogo from ".../assets/Flixster.png";

// fetch in parent (MovieList) so more components can have access
const MovieList = () => {
  const [movies, setMovies] = useState([]); // house all the data
  const [pageNum, setPageNum] = useState(1); // stores current page #, starting @ 1
  const [allPages, setAllPages] = useState(null); // stores amount of pages within database
  const [searchQuery, setSearchQuery] = useState(""); // stores current text in search bar, then changes depending on user input
  const [message, setMessage] = useState(""); // stores message user sees from search request
  const [isSearch, setIsSearch] = useState(false); // boolean to monitor switching state + clear button
  const [prevQuery, setPrevQuery] = useState("");
  const [sorting, setSort] = useState("Sort By"); // sort functionality
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [textComment, setComment] = useState(false); // custom text comment
  const [videoKey, setVideoKey] = useState(null); // trailer

  //  const fallbackImage = `/assets/no-image.jpg`;
  // const imageUrl = selectedMovie.poster_path ? `https://image....${img}` : fallbackImage;

  // favorited and watched items are saved to their individual arrays
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [watched, setWatched] = useState(() => {
    try {
      const saved = localStorage.getItem("watched");
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  // when page reloads, favorites and watched stays in local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // helper functions
  function loadMore() {
    if (allPages && pageNum >= allPages) return; // will not load past max # of pages
    setPageNum((prevNum) => prevNum + 1);
    // console.log(movies.map((m) => m.id)); // debugging page #
  }

  // API request sent
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // when user hits enter or search button
  const searchClick = async (page = 1) => {
    setSort("Sort By");
    setIsSearch(true);
    console.log(searchQuery); // debugging

    // adjusted from below axios to above, to account for new searchQuery results so they don't append to the bottom of a previous query

    if (searchQuery !== prevQuery) {
      setPageNum(1);
      setPrevQuery(searchQuery);
    }

    setPrevQuery(searchQuery);

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: `${import.meta.env.VITE_API_KEY}`,
          query: searchQuery,
          page: pageNum,
          //adults: false,
        },
      }
    );

    const movieData = response.data.results;

    if (movieData.length > 0) {
      setMessage("");
      setAllPages(response.data.total_pages);
      if (page === 1) {
        setMovies(movieData);
      } else {
        // search load functionality...
        setMovies((prev) => {
          // adds new to prev movies
          const add = [...prev, ...movieData];

          // filter duplicates by id, to avoid removing React.StrictMode from main.jsx
          const uniqueMovies = add.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          );

          // const filter = data.results.filer(movie =>
          //movie.title && movie.overview && movie.image_path)
          return uniqueMovies;
        });
      }
    } else {
      setMessage("No movies found.");
      setMovies([]);
    }
  };

  const fetchNowPlayingMovies = async (page) => {
    console.log("testing fetchNowPlayingMovies");

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US
        &page=${page}
        &api_key=${import.meta.env.VITE_API_KEY}`
    );

    setAllPages(data.total_pages);

    if (page === 1) {
      setMovies(data.results);
    } else {
      setMovies((prev) => {
        // adds new to prev movies
        const add = [...prev, ...data.results];

        // filter duplicates by id, to avoid removing React.StrictMode from main.jsx
        const uniqueMovies = add.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );

        // const filter = data.results.filer(movie =>
        //movie.title && movie.overview && movie.image_path)

        return uniqueMovies;
      });
    }
  };
  // const fetchMovies = async (page) => {
  //   if (isSearch) {
  //     searchClick();
  //   } else {
  //     fetchNowPlayingMovies(page);
  //   }
  // };

  // clear button
  function clear() {
    console.log("testing clear button");
    setIsSearch(false);
    setSearchQuery("");
    setMessage("");
    setPageNum(1);
    setMovies([]);
    fetchNowPlayingMovies(pageNum);
  }

  // sort logic
  const handleSort = (event) => {
    setSort(event.target.value);

    if (event.target.value === "alphabet") {
      // alphabetically
      setMovies(movies.sort((a, b) => a.title.localeCompare(b.title)));
      console.log("sorting alphabetically", movies);
    } else if (event.target.value === "date") {
      // date
      setMovies(
        movies.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        )
      );
      console.log("sorting by date", movies);
    } else {
      // vote avg
      setMovies(movies.sort((a, b) => b.vote_average - a.vote_average));
      console.log("sorting by vote", movies);
    }
  };

  // modal closing
  const handleClose = () => {
    setShowModal(false);
    setSelectedMovie(null);
    setVideoKey(null);
  };

  // modal clicking
  const handleCardClick = async (id) => {
    // console.log("Hi");
    setShowModal(true);
    setSelectedMovie(null);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: {
            api_key: `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      setSelectedMovie(data);

      // trailer addition to modal
      const { data: videoKey } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          params: {
            api_key: `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const trailer = videoKey.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setVideoKey(trailer.key);
      } else {
        setVideoKey(null);
      }
    } catch (error) {
      console.log(`Error fetching ${id}`, error);
    }
  };

  // favorites
  function handleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  // watched
  function handleWatched(id) {
    setWatched((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  // with reload, create animation where boxes behind are moved from bottom -> top, then load images above

  // reload
  useEffect(() => {
    try {
      if (!isSearch) {
        fetchNowPlayingMovies(pageNum);
      }
      console.log(pageNum); // debugging
    } catch (error) {
      console.log(error);
    }
  }, [pageNum, isSearch]);

  // re render when page # changes
  return (
    <>
      <div id="header">
        <section id="logo">
          <img
            src={new URL("../assets/Flixster.png", import.meta.url).href}
            alt="Flixster Logo"
          />
        </section>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setComment(true)}
          onBlur={() => setComment(false)}
          placeholder={
            textComment && searchQuery === ""
              ? "Whatcha looking for?"
              : "Search"
          }
          onKeyDown={(enter) => {
            if (enter.key === "Enter") searchClick();
          }}
        />
        <button onClick={searchClick}>Search</button>
        <button id="clear" onClick={clear}>
          Clear
        </button>
        <select id="sort" value={sorting} onChange={handleSort}>
          {sorting === "Sort By" && <option>Sort By</option>}
          <option value="alphabet">A-Z</option>
          <option value="date">Release Date</option>
          <option value="vote">Vote Average</option>
        </select>
      </div>
      {message}

      <div id="info">
        <div id="cardz">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              img={movie.poster_path}
              avg={movie.vote_average}
              onClick={() => handleCardClick(movie.id)}
              isFav={(favorites ?? []).includes(movie.id)}
              isWatched={(watched ?? []).includes(movie.id)}
              handleFav={handleFavorite}
              handleWatched={handleWatched}
            />
          ))}
        </div>
        {/* {showModal && ( */}
        <div id="modals">
          <Modal
            show={showModal}
            onClose={handleClose}
            movie={selectedMovie}
            videoKey={videoKey}
          />
        </div>
        {/* )} */}
        <button
          id="loadMore"
          onClick={loadMore}
          disabled={allPages != null && pageNum >= allPages}
        >
          Load More
        </button>
      </div>
      <div id="footer">2025 Flixster. All rights reserved</div>
    </>
  );
};
export default MovieList;
