import React, { Component } from 'react';
import SearchResults from '../components/SearchResults';
import axios from 'axios';
import Search from '../components/Search';

const API_KEY = '155afec55b203b455a7cea6a48882d69';
const BASE_URL = 'https://api.themoviedb.org/';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      searchTimeOut: null,
    };
    this.searchedFilms = this.searchedFilms.bind(this);
  }

  searchedFilms(query) {
    this.setState({
      films: [],
    });
    if (this.state.searchTimeOut) {
      clearTimeout(this.state.searchTimeOut);
    }
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.searchTimeOut = setTimeout(() => {
      this.getSearchFilm(query);
    }, 500);
  }

  async getSearchFilm(query) {
    try {
      const getFilms = await axios.get(
        `${BASE_URL}3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query='${query}'`
      );
      const getData = getFilms.data.results;

      this.setState(() => ({
        films: getData,
      }));
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <Search searchedFilms={this.searchedFilms} />
        <SearchResults films={this.state.films} />
      </div>
    );
  }
}

export default Home;
