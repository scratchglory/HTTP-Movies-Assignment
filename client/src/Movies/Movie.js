// Must add UPDATE button
// Must add DELETE button
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props, { addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    console.log("FETCHMOVIE PROPS", props);
    console.log("FETCHMOVIE ID", id);
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log("FETCH MOVIE ERR", err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        // console.log("DELETE RES:", res);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  console.log("MOVIE props", props);
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      {/* UPDATE BUTTON */}
      <Link
        className="update-button"
        // onClick={() => props.history.push(`/update-movie/${movie.id}`)}
        to={`/update-movie/${props.match.params.id}`}
      >
        UPDATE
      </Link>
      <button
        className="delete-button"
        onClick={() => deleteMovie(props.match.params.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Movie;
