import React, { Component } from "react";
import MovieBox from "./MovieBox";
import "../css/SearchResults.css";

class SearchResults extends Component {
  render() {
    return (
      <div className="films--outer container">
        <ul className="films">
          {this.props.films.map((item) => (
            <MovieBox key={item.id} film={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
