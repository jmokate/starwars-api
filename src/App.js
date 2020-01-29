import React from "react";
import axios from "axios";
import Characters from "./Characters";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      species: []
    };
  }

  componentDidMount() {
    const peopleAPI = "https://swapi.co/api/people";

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
              characters: characterData
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

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
    return (
      <div>
        <Characters
          people={this.state.characters}
          species={this.state.species}
        />
      </div>
    ); //<img src={this.state.img} alt='dog' />;
  }
}

export default App;
