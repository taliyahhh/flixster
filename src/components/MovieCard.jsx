import PropTypes from "prop-types";

const MovieCard = ({ title, img, avg }) => {
  return (
    <>
      <div className="card">
        <img src= {`https://image.tmdb.org/t/p/w200${img}`} alt = "Movie Poster"/>
        <p>Title = {title}</p>
        <p>Vote Average = {avg}</p>
      </div>
    </>
  );
};

// prop validation -> ___.PropType { ___.prop-type.isRequired}
MovieCard.propTypes = {
  //id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  avg: PropTypes.number.isRequired,
};

export default MovieCard;
