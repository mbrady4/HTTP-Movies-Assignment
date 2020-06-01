import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
  return (
    <div className="movie-list">
      {
        props.movies.map(movie => (
          <div>
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <MovieCard movie={movie} delete={props.delete}/>
            </Link>
            <button onClick={() => props.delete(movie.id)}>Delete Movie</button>
          </div>
        ))
      }
    </div>
  );
}

export default MovieList;
