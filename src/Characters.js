import React from "react";
import { Row, Col, Table } from "react-bootstrap";

function Characters(props) {
  // const species = props.species.map(species => {
  //   return <th>{species.name}</th>;
  // });
  const characters = props.people.map(person => {
    return (
      <tr>
        <th>{person.name}</th>
        <th>{person.birth_year}</th>
        <th>{person.height}</th>
        <th>{person.mass}</th>
        <th>{person.homeworld}</th>
        <th>{person.species}</th>
      </tr>
    );
  });
  // const species = props.species.map(species => {
  //   return <th>{species.name}</th>;
  // });

  return (
    <Table striped bordered>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Birth Date</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Homeworld</th>
          <th>Species</th>
        </tr>

        {characters}
        {/* {species} */}
      </tbody>
    </Table>
  );
}

export default Characters;
