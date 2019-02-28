import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import api from '../../api';

class Codekunst extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codekuenste: []
    }
  }

  deleteCodekunst(codekunstId){
    api.deleteCodekunst(codekunstId)
      .then(data => {
        this.setState({
          codekuenste: this.state.codekuenste.filter(c => c._id !== codekunstId),
          message: data.message
        })
        // Remove the message after 3 seconds
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 3000)
      })
  }

  render() {
    return (
      <div className="Codekuenste">
        <h2>List of codekuenste</h2>
        {/* `c` represents the current codekunst */}
        <ul>
          {this.state.codekuenste.map(c => <li key={c._id}>
            {c.projectcode}{' '}
            <img src={c.thumbnail} alt="codekunstpicture" className="thumbnail"/>
            <Link to={"/codekuenste/"+c._id}>Detail</Link>{' '}
            {/* <Link to={"/edit-codekunst/"+c._id}>Edit</Link>{' '} */}
            {api.isAdmin() && <button onClick={()=>this.deleteCodekunst(c._id)}>Delete</button>}
          </li>)}
        </ul>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }

  componentDidMount() {
    api.getCodekuenste()
      .then(codekuenste => {
        console.log(codekuenste)
        this.setState({
          codekuenste: codekuenste
        })
      })
      .catch(err => console.log(err))
  }
}

export default Codekunst;
