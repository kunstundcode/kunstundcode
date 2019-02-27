import React, { Component } from 'react';
import api from '../../api';

class Secret extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectcode: "",
      code: "",
      thumbnail: "",
      secret: null,
      message: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.projectcode, this.state.code)
    let data = {
      projectcode: this.state.projectcode,
      code: this.state.code,
      thumbnail: this.state.thumbnail
    }
    api.postCodekuenste(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          projectcode: "",
          code: "",
          thumbnail: "",
          message: `Your Codekunst '${this.state.projectcode}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }



  render() {
    return (
      <div className="Admin">
        <h2>Admin</h2>

        <div className="result">
          {this.state.secret}
        </div>

        <div>
          <h2>Add Codekunst</h2>
          <form>
            Projectcode: <input type="text" value={this.state.projectcode} name="projectcode" onChange={this.handleInputChange} /> <br />
            Thumbnail: <input type="text" value={this.state.thumbnail} name="thumbnail" onChange={this.handleInputChange} /> <br />
            Code: <textarea value={this.state.code} name="code" cols="100" rows="10" onChange={this.handleInputChange} ></textarea> <br />
            <button onClick={(e) => this.handleClick(e)}>Create Codekunst</button>
          </form>
        </div>

        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }

  componentDidMount() {
    api.getSecret()
      .then(data => this.setState({ secret: data.secret }))
      .catch(err => this.setState({ message: err.toString() }))
  }
}

export default Secret;
