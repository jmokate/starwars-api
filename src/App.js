import React from "react";
import axios from "axios";
import Characters from "./Characters";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      characters: [],
      currentPage: 1,
      postsPerPage: 10
    };
  }

  componentDidMount() {
    const peopleAPI = "https://swapi.co/api/people";
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
  }

  componentDidUpdate() {}

  // axios
  //   .get("https://dog.ceo/api/breeds/image/random")
  //   .then(response => {
  //     console.log(response.data);
  //     this.setState({ img: response.data.message });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  render() {
    const isLoading = this.state.isLoading;
    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    //get current posts
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    console.log(indexOfLastPost);
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    console.log(indexOfFirstPost);
    const currentPosts = this.state.characters.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    console.log(currentPosts);

    return (
      <div>
        {isLoading}
        <Characters people={currentPosts} species={this.state.species} />
      </div>
    ); //<img src={this.state.img} alt='dog' />;
  }
}

export default App;
