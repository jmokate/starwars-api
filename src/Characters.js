import React from "react";
import { Row, Col, Table } from "react-bootstrap";

function Characters(props) {
  const haha = props.people.map(person => {
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

  // const species = [props.species];
  // console.log(species);

  // props.species.map(species => {
  //   return (
  //     <Row>
  //       <th>{species.name}</th>
  //     </Row>
  //   );
  // });

  // const homeworld = props.people.forEach(homeworld, index => {
  //   // return <tr><th>{homeworld[index].species}</th></tr>
  //   console.log(homeworld, index);
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

        {haha}
      </tbody>
    </Table>
  );
}

export default Characters;
