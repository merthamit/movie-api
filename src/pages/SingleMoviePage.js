import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router";
import "../css/SingleMoviePage.css";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ActorBox from "../components/ActorBox";
import { Link } from "react-router-dom";

const API_KEY = "155afec55b203b455a7cea6a48882d69";
const BASE_URL = "https://api.themoviedb.org/";
const YOUTUBE_BASE_URL = "https://www.youtube.com/watch?v=";

function SingleMoviePage() {
  const { film } = useParams();
  const [filmData, setFilmData] = useState([]);
  const [actorData, setActorData] = useState([]);
  const [videoData, setVideoData] = useState([{ key: "123" }]);
  const BASE_IMAGE_URL = "https://www.themoviedb.org/t/p/original/";

  const getFilm = async (filmId) => {
    try {
      const getFilms = await axios.get(
        `${BASE_URL}3/movie/${filmId}?api_key=${API_KEY}&language=en-US`
      );
      if (getFilms.status !== 200) throw new Error("Böyle bir şey yok...");
      const getData = await getFilms.data;
      setFilmData(getData);
    } catch (error) {
      console.log(error);
    }
  };

  const getActors = async (filmId) => {
    try {
      const getActors = await axios.get(
        `${BASE_URL}3/movie/${filmId}/credits?api_key=${API_KEY}&language=en-US`
      );
      if (getActors.status !== 200) throw new Error("Böyle bir şey yok...");
      const getData = await getActors.data;
      setActorData(getData);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideo = async (filmId) => {
    try {
      const getVideo = await axios.get(
        `${BASE_URL}3/movie/${filmId}/videos?api_key=${API_KEY}&language=en-US`
      );
      if (getVideo.status !== 200) throw new Error("Böyle bir şey yok...");
      const getData = await getVideo.data.results;
      setVideoData([...getData, videoData]);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getActors(film);
    getVideo(film);
    getFilm(film);
  }, []);
  // movie__big--image
  // BASE_IMAGE_URL + filmData.backdrop_path

  return filmData.length !== 0 &&
    actorData.length !== 0 &&
    videoData.length !== 0 ? (
    <>
      <div className="movie">
        <div className="movie__item">
          <div
            className="movie__big--image"
            style={{
              backgroundImage: `url(${
                BASE_IMAGE_URL + filmData.backdrop_path
              })`,
            }}
          ></div>
          <div className="movie__color"></div>
          <div className="container">
            <div className="movie__info">
              <h1 className="movie__name">{filmData.original_title}</h1>
              <div className="movie__info--group">
                <p className="movie__release--date">
                  {filmData.release_date
                    ? filmData.release_date.slice(0, 4)
                    : "YYYY"}
                </p>
                <p className="movie__runtime">
                  {filmData.runtime === 0
                    ? "| ? minute"
                    : `| ${filmData.runtime} minute`}
                </p>
                <div className="movie__genres">
                  |{" "}
                  {filmData.genres.length > 0
                    ? filmData.genres[0].name
                    : "None"}
                </div>
              </div>
              <p className="movie__overview">
                {filmData.overview && filmData.overview.slice(0, 140)}...
              </p>
              <div className="movie__button--group">
                <button className="movie__button">Watch the Movie</button>
                <Link to="/" className="movie__back--button">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="join">
          <button className="join__button">Join Us</button>
          <p className="join__paragraph">Watch what ever you want.</p>
        </div>
        <div className="team">
          <h1 className="team__header">
            {filmData.original_title} <span>| Cast</span>
          </h1>
          <div className="actors">
            {actorData.cast.slice(0, 10).map((item) => (
              <ActorBox
                key={item.name}
                name={item.name}
                character={item.character}
                imgUrl={item.profile_path}
              />
            ))}
          </div>
        </div>
        <div className="trailer">
          <h1 className="trailer__header">
            {filmData.original_title} <span>| Trailer</span>
          </h1>
          <div className="trailer__video--outer">
            <iframe
              className="trailer__video"
              src={`https://www.youtube.com/embed/${videoData[0].key}`}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  ) : (
    "Burası boş..."
  );
}

export default SingleMoviePage;
