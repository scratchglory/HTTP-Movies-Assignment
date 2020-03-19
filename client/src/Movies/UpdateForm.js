// Create a component with a form to update the chosen movie
import React, { useEffect, useState } from "react";
import axios from "axios";

const initialState = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

// props == movies={movieList}, updateMovie={setMovieList}
const UpdateForm = props => {
  const [movie, setMovie] = useState(initialState);

  useEffect(() => {
    console.log("UPDATEFORM PROPS", props.updateMovie);

    // use the find method to find the data of the selected movie
    const selectedMovie = props.movie.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });
    console.log("SELECTED MOVIE", selectedMovie);
    // if 'true', set the data in the useState
    if (selectedMovie) {
      setMovie(selectedMovie);
    }
  }, [props.movie, props.match.params.id]);

  // CHANGE HANDLERS
  const changeHandler = e => {
    let value = e.target.value;
    if (e.target.name === "stars") {
      setMovie({ ...movie, stars: e.target.value.split(",") });
    } else {
      setMovie({ ...movie, [e.target.name]: value });
    }
  };

  // FORM SUBMIT
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log("UPDATEFORM:", res);
        props.updateMovie(res.data);
      })
      .catch(err => console.log("UF ERROR:", err));
    window.location.href = `/movies/${movie.id}`;
  };

  // returning the input values
  return (
    <div>
      <h2>UPDATE MOVIE</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          onChange={changeHandler}
          placeholder="ID"
          value={movie.id}
        />

        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />
        <button>UPDATE!</button>
      </form>
    </div>
  );
};

export default UpdateForm;
