import React, { Component } from "react";
import { Card, Form, Col, Button, ListGroup } from "react-bootstrap";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latlon: [],
    
    };
  }



  getLocation = async (event) => {
    event.preventDefault();
    const locationKey = process.env.REACT_APP_LOCATION_IQ_KEY;
    try {
      const backendParks = `https://us1.locationiq.com/v1/search.php?key=${locationKey}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(backendParks);
      const location = response.data[0];
      this.setState({ location: location });
      this.getWeatherDay();
    } catch (err) {
      console.log(err);
    }
  };


  render() {
    return (
      <div>
        <Card
          text="light"
          className="search-card"
          style={{ marginTop: "100px" }}
        >
          <Card.Header>❤️🛒</Card.Header>
          <Card.Body>
            <Card.Title>Shoping list</Card.Title>
            <Card.Text>
              Log in to see shoping list
            </Card.Text>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Control placeholder="First name" />
                </Col>
                <Col>
                  <Form.Control placeholder="Last name" />
                </Col>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>User</Form.Label>
                  <Form.Control as="select" defaultValue="Choose...">
                    <option>admin</option>
                    <option>...</option>
                  </Form.Control>
                </Form.Group> 
              </Form.Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div
        style={{
          marginTop: "30px",
          paddingBottom: "10%",
        }}
        >
        <Card>
          <Card.Header>Shoping List</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            
            <Button variant="primary">Display list</Button>
          </Card.Body>
        </Card>
        </div>

        
      </div>
    );
  }
}
