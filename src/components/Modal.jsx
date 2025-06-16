// import React from "react";
import PropTypes from "prop-types";

function Modal({ show, onClose, movie }) {
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
      <div id="modal" onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <div>
            <button onClick={onClose}>X</button>
          </div>
          <h1> yo</h1>
          <h1>{movie.id}</h1>
          <span>{movie.background_path}</span>
          <span>{movie.release_date}</span>
          <span>{movie.overview}</span>
          {movie.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
          {/* <span>{movie.}</span> */}
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
};

export default Modal;
