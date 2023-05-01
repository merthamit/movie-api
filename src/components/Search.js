import React, { Component } from "react";
import "../css/Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    this.setState(
      (st) => ({
        [evt.target.name]: evt.target.value,
      }),
      () => this.props.searchedFilms(this.state.query)
    );
  }
  render() {
    return (
      <div className="search">
        <div className="search__box">
          <div className="search__group">
            <div className="search__logo">WATCH A MOVIE</div>
            <input
              className="search__input"
              placeholder="Search a film"
              name="query"
              type="text"
              onChange={this.handleChange}
              value={this.state.query}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
