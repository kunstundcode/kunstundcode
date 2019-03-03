import React, { Component } from 'react'
import api from '../../api';
import CardUserDetail from '../CardUserDetail';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userarts: [],
      userId: this.props.match.params.userId
    }
    
  }

  render() {
    let username
    if (localStorage.getItem('user')) {
      username = JSON.parse(localStorage.getItem('user')).username;
    }

    return (
      <div className="Profile d-flex flex-column flex-wrap">
        <div>
          {username && <h1>This is your art, {username} </h1>}
        </div>
        <div className="Codekuenste d-flex flex-row flex-wrap"> 
          {this.state.userarts.map((item, i) => (
            <div key={i}>
            <CardUserDetail c={item}/>
            </div>
          ))}
          {this.state.message && <div className="info">
            {this.state.message}
          </div>}
        </div>
        
      </div>
    )
  }
  componentDidMount(){
    api.getUserArts(this.state.userId)
      .then(userarts => {
        this.setState({
          userarts: userarts
        })
      })
  }
}
