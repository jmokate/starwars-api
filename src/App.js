import React from "react";
//import ReactDOM from "react-dom";
import axios from "axios";
import Characters from "./Characters";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: []
    };
  }

  componentDidMount() {
    axios
      .get("https://swapi.co/api/people")
      .then(response => {
        console.log(response.data.results[1].species);
        this.setState({
          characters: response.data.results
        });
        console.log(this.state.species);
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
        <Characters people={this.state.characters} />
      </div>
    ); //<img src={this.state.img} alt='dog' />;
  }
}

export default App;
