import PropTypes from "prop-types";
// import Modal from "./Modal";
// import { useState } from "react";
// import { useState } from "react";

const MovieCard = ({ title, img, avg, onClick }) => {
  // const [modalOpen, setModal] = useState(false);

  // function handleModal() {
  //   setModal(true);
  // }

  return (
    <>
      <div className="card" onClick={onClick}>
        {/* onClick={setModal(true)} */}
        <img src={`https://image.tmdb.org/t/p/w200${img}`} alt="Movie Poster" />
        <p>Title = {title}</p>
        <p>Vote Average = {avg}</p>
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
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  avg: PropTypes.number.isRequired,
  onClick: PropTypes.any.isRequired,
};

export default MovieCard;
