import React from "react";
import axios from "axios";
import Characters from "./Components/Characters";
import Pagination from "./Components/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			characters: [],
			homeworlds: [],
			species: [],
			currentPage: 1,
			charactersPerPage: 10,
			totalCharacters: 0,
		};
		this.getCharacterData = this.getCharacterData.bind(this);
		this.paginate = this.paginate.bind(this);
	}

	componentDidMount() {
		this.getCharacterData(this.state.currentPage);
	}

	async getCharacterData(page) {
		const characterAPI = `https://swapi.dev/api/people?page=${page}`;
		this.setState({
			isLoading: true,
		});

		const response = await axios.get(characterAPI);
		console.log(response);
		const characterData = response.data.results;
		const totalCharacters = response.data.count;
		const cachedHomeWorlds = this.state.homeworlds.map(homeworld =>
			Object.assign({}, homeworld)
		);

		const cachedSpecies = this.state.species.map(species =>
			Object.assign({}, species)
		);

		for (let element of characterData) {
			const matchingHomeWorld = cachedHomeWorlds.filter(
				savedHomeWorld => savedHomeWorld.url === element.homeworld
			);
			if (matchingHomeWorld.length > 0) {
				element.homeworld = matchingHomeWorld[0].name;
			} else {
				const homeWorldResponse = await axios.get(
					element.homeworld.replace("http", "https")
				);

				cachedHomeWorlds.push({
					url: element.homeworld,
					name: homeWorldResponse.data.name,
				});
				element.homeworld = homeWorldResponse.data.name;
			}
			const matchingSpecies = cachedSpecies.filter(
				savedSpecies => savedSpecies.url === element.species[0]
			);
			if (matchingSpecies.length > 0) {
				element.species = matchingSpecies[0].name;
			} else {
				const speciesResponse = await axios.get(element.species);

				cachedSpecies.push({
					url: element.species[0],
					name: speciesResponse.data.name,
				});
				element.species = speciesResponse.data.name;
			}
		}

		this.setState({
			characters: characterData,
			isLoading: false,
			totalCharacters: totalCharacters,
			homeworlds: cachedHomeWorlds,
			species: cachedSpecies,
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
					currentPage={this.state.currentPage}
					paginate={this.paginate}
				/>
			</div>
		);
	}
}

export default App;
