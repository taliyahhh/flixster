// import React from "react";
import PropTypes from "prop-types";

function Modal({ show, onClose, movie, videoKey }) {
  if (!show) return null;
  if (!movie) {
    return (
      <div onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <p>Loading movie...</p>
        </div>
      </div>
    );
  }

  console.log("movie is: ", movie);

  return (
    <>
      <div id="modal-overlay" onClick={onClose}>
        <div id="modal" onClick={onClose}>
          <div onClick={(e) => e.stopPropagation()}>
            <div>
              <button onClick={onClose}>X</button>
            </div>
            <h1>{movie.title}</h1>
            <hr className="belowTitle" />
            <div className="modal-content">
              <div className="modal-text">
                <br />
                <span>
                  <strong>Release Date: </strong>
                  {movie.release_date}
                </span>
                <br />
                <span>{movie.runtime} minutes</span>
                <br />
                <hr className="modalLine" />
                <p className="desc">
                  <strong>Description: </strong>
                  {movie.overview}
                </p>
                <hr className="modalLine" />

                <p className="genres">
                  <strong>Genres</strong>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </p>
              </div>
              <img
                className="modalImg"
                src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`}
                alt="Movie Background Poster"
              />
            </div>
          </div>
          {videoKey ? (
            <iframe
              className="trailer"
              src={`https://www.youtube.com/embed/${videoKey}`}
              alt="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>This movie has no trailer.</p>
          )}
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  //id: PropTypes.number.isRequired,
  movie: PropTypes.any.isRequired,
  show: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired,
  videoKey: PropTypes.any,
};

export default Modal;
