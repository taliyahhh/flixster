import PropTypes from "prop-types"; // import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as regularHeart,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";

const MovieCard = ({
  id,
  title,
  img,
  avg,
  onClick,
  isFav,
  isWatched,
  handleFav,
  handleWatched,
}) => {
  // const [modalOpen, setModal] = useState(false);
  // function handleModal() {
  //   setModal(true);
  // }
  // const fallbackImage = `/assets/no-image.jpg`;
  // const imageUrl = movie.poster_path ? `https://image....${}` : fallbackImage;

  return (
    <>
      <div className="card" onClick={onClick}>
        <img src={`https://image.tmdb.org/t/p/w200${img}`} alt="Movie Poster" />
        <div id="interactivity">
          <FontAwesomeIcon
            icon={isFav ? solidHeart : regularHeart}
            onClick={(e) => {
              e.stopPropagation();
              handleFav(id);
            }}
            className={`heart ${isFav ? "solid" : "regular"}`}
            style={{ color: isFav ? "red" : "black" }}
          />
          <FontAwesomeIcon
            icon={isWatched ? faEye : faEyeSlash}
            id="eye"
            onClick={(e) => {
              e.stopPropagation();
              handleWatched(id);
            }}
          />
        </div>

        {/* <FontAwesomeIcon icon={faEyeSlash} /> */}

        <span className="cardInfo">
          <strong>{title} </strong>| {avg.toFixed(1)}
        </span>
      </div>
      {/* <Modal isOpen={modalOpen} onClose={() => setModal(false)}>
        HELLO
      </Modal> */}
    </>
  );
};

// prop validation syntax -> ___.PropType { ___.prop-type.isRequired}
MovieCard.propTypes = {
  //id: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  avg: PropTypes.number.isRequired,
  onClick: PropTypes.any.isRequired,
  isFav: PropTypes.bool.isRequired,
  isWatched: PropTypes.bool.isRequired,
  handleFav: PropTypes.any.isRequired,
  handleWatched: PropTypes.any.isRequired,
};

export default MovieCard;
