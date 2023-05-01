import React, { Component } from 'react';
import '../css/MovieBox.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

class MovieBox extends Component {
  render() {
    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w200/';
    const { original_title, poster_path, vote_average, id } = this.props.film;
    const newTitle =
      original_title.length > 24
        ? `${original_title.slice(0, 20)}...`
        : original_title;
    const newAverage =
      vote_average.toString().length < 3 ? `${vote_average}.0` : vote_average;
    let newPosterPath;
    if (poster_path) {
      newPosterPath = BASE_IMAGE_URL + poster_path;
    } else {
      newPosterPath =
        'https://media.istockphoto.com/vectors/writing-black-question-mark-icon-isolated-on-white-background-vector-id1078408586';
    }
    return (
      <li key={original_title} className="film">
        <Link exact="true" to={`/movie/${id}`}>
          <div className="film__image--outer">
            <LazyLoadImage
              effect="blur"
              className="film__image"
              src={`${newPosterPath}`}
            />
          </div>
          <span className="film__vote">
            {newAverage}
            <i className="fas fa-star"></i>
          </span>
          <p className="film__title">{newTitle}</p>
        </Link>
      </li>
    );
  }
}

export default MovieBox;
