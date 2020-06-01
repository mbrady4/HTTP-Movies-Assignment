import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom"; 
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

import axios from 'axios';

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
  }, [movieList]);

  const deleteMovie = (id) => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  };

  return (
    <>
      <SavedList list={savedList} />

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie>Route is Working</UpdateMovie>
      </Route>

      <Route path='/add-movie/'>
        <AddMovie />
      </Route>

      <Route exact path="/">
        <MovieList movies={movieList} delete={deleteMovie} />
      </Route>
    </>
  );
};

export default App;
