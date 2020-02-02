import React from "react";
import axios from "axios";
import Characters from "./Characters";
import Pagination from "./Pagination";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      characters: [],
      currentPage: 1,
      charactersPerPage: 10,
      totalCharacters: 0
    };
    this.getCharacterData = this.getCharacterData.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    this.getCharacterData(this.state.currentPage);
  }

  getCharacterData(page) {
    const characterAPI = `https://swapi.co/api/people/?page=${page}`;
    this.setState({
      isLoading: true
    });

    axios
      .get(characterAPI)
      .then(response => {
        let characterData = response.data.results;
        let totalCharacters = response.data.count;

        for (let element of characterData) {
          axios.get(element.homeworld).then(homeworldData => {
            element.homeworld = homeworldData.data.name;
          });
          axios.get(element.species).then(speciesData => {
            element.species = speciesData.data.name;

            this.setState({
              characters: characterData,
              isLoading: false,
              totalCharacters: totalCharacters
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
    this.getCharacterData(pageNumber);
  }

  render() {
    const isLoading = this.state.isLoading;
    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        {isLoading}
        <Characters
          people={this.state.characters}
          species={this.state.species}
        />
        <Pagination
          charactersPerPage={this.state.charactersPerPage}
          totalCharacters={this.state.totalCharacters}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default App;
