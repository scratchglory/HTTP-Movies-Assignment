import React, { useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

const MovieCard = props => {
  //   console.log("MOVIECARD PROPS", props.movie);
  //   const [movie, setMovie] = useState(null);
  //   const match = useRouteMatch();

  //   const deleteMovie = id => {
  //     console.log("ID", id);
  //     axios
  //       .delete(`http://localhost:5000/api/movies/${id}`)
  //       //   reroute to the front page after delete
  //       .then(res => console.log("DELETE RES", res))
  //       .catch(err => console.log("DELETE ERR", err));
  //   };

  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>
      {console.log("STARS", stars)}
      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}

      {/* <button className="delete-button" onClick={deleteMovie(props.movie.id)}>
        DELETE
      </button> */}
    </div>
  );
};

export default MovieCard;
