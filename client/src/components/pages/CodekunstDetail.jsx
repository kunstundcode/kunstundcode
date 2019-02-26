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
        <strong>Name</strong>: {this.state.codekunst.name}<br/>
        <strong>Capitals</strong>: {this.state.codekunst.capitals.join(', ')}<br/>
        <strong>Area</strong>: {this.state.codekunst.area}<br/>
        <strong>Description</strong>: {this.state.codekunst.description}<br/>
        <strong>Creator</strong>: {this.state.codekunst._creator.username}<br/>
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
