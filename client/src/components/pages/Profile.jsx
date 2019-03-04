import React, { Component } from 'react'
import api from '../../api';
import CardUserDetail from '../CardUserDetail';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userarts: [],
      userId: this.props.match.params.userId,
      ownerName: ''
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
          {(username === this.state.ownerName) && <h1>This is your awesome art, {username} </h1>}
          {!(username === this.state.ownerName) && <h1>This is the incredible art of {this.state.ownerName} </h1>}
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
  
  componentWillMount(){
    api.getUserArts(this.state.userId)
    .then(userarts => {
      this.setState({
        userarts: userarts,
        ownerName: userarts[0]._user.username
      })
    }).catch(err => console.log(err))
  }
  

  componentDidMount(){
   
  }
}
