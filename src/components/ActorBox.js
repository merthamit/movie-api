import React, { Component } from "react";
import "../css/ActorBox.css";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w200/";
const fakeImg =
  "https://media.istockphoto.com/photos/question-mark-picture-id181283276";

class ActorBox extends Component {
  render() {
    return (
      <div className="actor">
        <div className="actor__image--outer">
          <img
            className="actor__image"
            src={`${
              this.props.imgUrl ? BASE_IMAGE_URL + this.props.imgUrl : fakeImg
            }`}
          />
        </div>
        <div className="actor__info">
          <p className="actor__name">{this.props.name}</p>
          <p className="actor__rollname">{this.props.character}</p>
        </div>
      </div>
    );
  }
}

export default ActorBox;
