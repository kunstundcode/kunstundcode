import React, { Component } from 'react'
import api from '../../api';

export default class CodekunstDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      code: '',
      thumbnail: '',
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

        <pre style={{textAlign: 'left', margin: 20}}>{this.state.code}</pre>
        <div id="box" style={{border: '1px solid black'}}></div>

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
          codekunst: codekunst,
          name: codekunst.name,
          code: codekunst.code,
          thumbnail: codekunst.thumbnail
        })
        // eslint-disable-next-line
        eval(codekunst.code)

      })
      .catch(err => console.log(err))
  }
}
