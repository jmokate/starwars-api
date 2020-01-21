import React from "react";
import { Row, Col, Table } from "react-bootstrap";

function Characters() {
  return (
    <Table striped bordered>
      <tr>
        <th>Name</th>
        <th>Birth Date</th>
        <th>Height</th>
        <th>Mass</th>
        <th>Homeworld</th>
        <th>Species</th>
      </tr>
    </Table>
  );
}

export default Characters;
