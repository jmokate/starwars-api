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
          <th>NAME</th>
          <th>BIRTH DATE</th>
          <th>HEIGHT</th>
          <th>MASS</th>
          <th>HOMEWORLD</th>
          <th>SPECIES</th>
        </tr>

        {characters}
        {/* {species} */}
      </tbody>
    </Table>
  );
}

export default Characters;
