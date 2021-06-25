import React, { Component } from "react";
import { Card, Form, Col, Button, ListGroup, Container } from "react-bootstrap";
import axios from "axios";
import base64 from "base-64";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      signedIn: false,
      signedUp: false,
      shopping: true,
      authorized: true,
      name: "",
      password: "",
      roles: ""
    };
  }

  

  signIn = async (event) => {
    event.preventDefault();
    let base64encoded = base64.encode(`${this.state.name}:${this.state.password}`);

    try{
      const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Basic ' + base64encoded},
        body: JSON.stringify(this.state.name , this.state.password)
      };

      const response = axios('https://lab401-09.herokuapp.com/signin', {requestOptions})

      const userData = response.data;

      this.setState({ user: userData })
      console.log('this is the user response',this.state.user);

    } catch(err){
      console.log(err);
    }
   
  };

  signUp = async (event) => {
    event.preventDefault();
    try{
      const body ={
        "username": this.state.name,
        "password": this.state.password,
        "role": this.state.roles
      }
        axios({
          method: 'POST',
          url: 'https://lab401-09.herokuapp.com/signup',
          data: body
        })

  
        this.setState({ signedUp: true, signedIn: true })
        console.log('this is the user response',this.state.user);

    } catch(err){
      console.log(err);
    }
  };


  render() {
    console.log(this.state.name, this.state.password, this.state.roles);
    return (
      <div>
        <Container>
          {
            (this.state.signedUp) === true ? (
              <div></div>
            ) : (
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
              <Form onSubmit={this.signUp}>
                <Form.Row>
                  <Col>
                    <Form.Control 
                    placeholder="Name"
                    onChange={(e) => this.setState({ name: e.target.value })} 
                    />
                  </Col>
                  <Col>
                    <Form.Control 
                    placeholder="Password"
                    onChange={(e) => this.setState({ password: e.target.value })} 
                    />
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>User Roles  </Form.Label>
                    <Form.Control 
                    as="select" 
                    defaultValue="Choose..."
                    onChange={(e) => this.setState({ roles: e.target.value })} 
                    >
                      <option value="admin">parent</option>
                      <option value="user">child</option>
                    </Form.Control>
                  </Form.Group> 
                </Form.Row>
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
            )
          }
          
        </Container>

        <Container>
          {
            (this.state.signedIn) === false ? (
              <div></div>
            ) : (
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
              <Form onSubmit={this.signIn}>
                <Form.Row>
                  <Col>
                    <Form.Control 
                    placeholder="Name"
                    onChange={(e) => this.setState({ name: e.target.value })} 
                    value={this.state.name}
                    />
                  </Col>
                  <Col>
                    <Form.Control 
                    placeholder="Pasword"
                    onChange={(e) => this.setState({ password: e.target.value })} 
                    value={this.state.password}
                    />
                  </Col>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
            )
          }
        </Container>

        <Container>
          {
            (this.state.user) < 1 ? (
              <div></div>
            ) : (
              <div
              style={{
                marginTop: "30px",
                paddingBottom: "10%",
              }}
              >
              <Card
              className="shopping-card"
              >
                <Card.Header>Shoping List</Card.Header>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio <Button> Delete </Button></ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in <Button> Delete </Button></ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros <Button> Delete </Button></ListGroup.Item>
                  </ListGroup>
                  
                  <Button variant="primary">Display list</Button>
                </Card.Body>
              </Card>
              </div>
            )
          }
        
        </Container>
        

        

        
      </div>
    );
  }
}
