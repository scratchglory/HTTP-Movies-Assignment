import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";

import UpdateForm from "./Movies/UpdateForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      {console.log("APP MOVIELIST", movieList)}
      <SavedList list={savedList} />
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      {/* Must render Movie with props in order fo UPDATE button to work */}
      <Route
        path="/movies/:id"
        render={props => (
          <Movie {...props} movies={movieList} updateMovies={setMovieList} />
        )}
      >
        {/* <Movie addToSavedList={addToSavedList} /> */}
      </Route>

      {/* Add a route at the path /update-movie/:id */}
      <Route
        path="/update-movie/:id"
        render={props => (
          <UpdateForm {...props} movie={movieList} updateMovie={setMovieList} />
        )}
      />
    </>
  );
};

export default App;
