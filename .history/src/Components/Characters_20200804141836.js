import React from "react";
import { Table } from "react-bootstrap";
import "../App.css";

function Characters(props) {
	const characters = props.people.map(person => {
		return (
			<tr key={person.name}>
				<th>{person.name}</th>
				<th>{person.birth_year}</th>
				<th>{person.height}</th>
				<th>{person.mass}</th>
				<th>{person.homeworld}</th>
				<th>{person.species}</th>
			</tr>
		);
	});

	return (
		<Table striped bordered>
			<tbody>
				<tr>
					<th>NAME</th>
					<th>BIRTH DATE</th>
					<th>HEIGHT</th>
					<th>MASS</th>
					<th>HOMEWORLD</th>
					<th>SPECIES</th>
				</tr>

				{characters}
			</tbody>
		</Table>
	);
}

export default Characters;
