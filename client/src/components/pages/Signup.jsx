import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./LoginSignup.css";
import api from '../../api';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      // <div className="Signup">
      //   <h2>Signup</h2>
      //   <form>
      //     Username: <input type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
      //     Password: <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
      //     <button onClick={(e) => this.handleClick(e)}>Signup</button>
      //   </form>
      //   {this.state.message && <div className="info info-danger">
      //     {this.state.message}
      //   </div>}
      // </div>
      <div className="Signup">
        <h1>Get involved and sign up!</h1>
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

export default Signup;
