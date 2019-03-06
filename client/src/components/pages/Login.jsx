import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import api from '../../api';
import "./LoginSignup.css";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null
    }
  }

  handleSubmit = event => {
    event.preventDefault();
  }
  
  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err }))
  }

  render() {
    return (
      <div className="Login">
        <h1>Login and play around!</h1>
        <form onSubmit={(e) => this.handleClick(e)}>
          <FormGroup controlId="username" bsSize="large">
            Username
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={(e) => this.handleInputChange("username", e)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            Password
            <FormControl
              value={this.state.password}
              onChange={(e) => this.handleInputChange("password", e)}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}