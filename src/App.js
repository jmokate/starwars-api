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
      postsPerPage: 10,
      totalCharacters: 87
    };
  }

  componentDidMount() {
    this.getCharacterData(this.state.currentPage);
  }

  getCharacterData = page => {
    const peopleAPI = `https://swapi.co/api/people/?page=${page}`;
    this.setState({
      isLoading: true
    });

    axios
      .get(peopleAPI)
      .then(response => {
        let characterData = response.data.results;
        console.log(characterData);

        for (let element of characterData) {
          axios.get(element.homeworld).then(homeworldData => {
            element.homeworld = homeworldData.data.name;
          });
          axios.get(element.species).then(speciesData => {
            element.species = speciesData.data.name;

            console.log(speciesData.data.name);

            this.setState({
              characters: characterData,
              isLoading: false
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.characters);
    // const updatedCharacters = this.state.characters;
    // if (prevState.characters !== this.state.characters) {
    //   this.setState({
    //     characters: updatedCharacters
    //   });
    // }
    //new api call based on clicked link?
    // try to use url + page? like -
    //https://characters/$page=' + {page} ?
    // const updatePage = "https://swapi.co/api/people/?page=" + {page}
    // const
    // this.setState({

    console.log("something changed");
  }

  render() {
    const isLoading = this.state.isLoading;
    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    //get current posts
    // const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    // console.log(indexOfLastPost);
    // const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    // console.log(indexOfFirstPost);
    // const currentPosts = this.state.characters.slice(
    //   indexOfFirstPost,
    //   indexOfLastPost
    // );
    // console.log(currentPosts);

    //change page
    const paginate = pageNumber => {
      this.setState({ currentPage: pageNumber });
      this.getCharacterData(pageNumber);
    };

    return (
      <div>
        {isLoading}
        <Characters
          people={this.state.characters}
          species={this.state.species}
        />
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalCharacters={this.state.totalCharacters}
          paginate={paginate}
        />
      </div>
    );
  }
}

export default App;
