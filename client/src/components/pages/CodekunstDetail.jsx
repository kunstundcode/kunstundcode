import React, { Component } from 'react'
import api from '../../api';

export default class CodekunstDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codekunst: null
    }
  }
  render() {
    if (!this.state.codekunst) {
      return <div className="CodekunstDetail">Loading...</div>
    }
    return (
      <div className="CodekunstDetail">
        <h1>CodekunstDetail</h1>
        <strong>Projectcode</strong>: {this.state.codekunst.projectcode}<br/>
        <img src={this.state.codekunst.thumbnail} alt="codekunstimage" className="thumbnail" />
        {this.state.codekunst.userarts.map((item, i) =>
            <div key={i}>
              <img src={item.pictureUrl} alt="userartimage" className="thumbnail" />
              <br />
              <strong>Creator: </strong><em>{item._user.username}</em>
              <br />
            </div>
        )}
      </div>
    )
  }
  componentDidMount() {
    api.getCodekunstDetail(this.props.match.params.codekunstId)
      .then(codekunst => {
        this.setState({
          codekunst: codekunst
        })
      })
      .catch(err => console.log(err))
  }
}
