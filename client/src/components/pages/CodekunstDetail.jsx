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
        {/* //TODO: show all results, when seed is updated with results array */}
        {/* {this.state.codekunst.result} */}  
        {/* <strong>Creator</strong>: {this.state.codekunst._user.username}<br/> */}
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
