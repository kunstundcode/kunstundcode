import React, { Component } from 'react'
import api from '../../api';
// import sketch from './sketch'
// import P5Wrapper from './P5Wrapper';

export default class CodekunstDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      code: '',
      thumbnail: '',
      userarts: [],
      codekunst: null
    }
  }

  //TODO: Upadte the State when key is pressed! Does not work, why? 
  handleKeyboardInput = (e) => {
    const code = e.keyCode ? e.keyCode : e.which;

    if (code === 83) { //s key
        // this.setState({ keyboardInput: {'Y', -1 }});
        // setTimeout(() => {
          console.log("From the State: " + this.state.userarts)

          api.getCodekunstDetail(this.props.match.params.codekunstId)
          .then(codekunst => {
            console.log("From the Db: " + codekunst.userarts);
            this.setState({
              userarts: codekunst.userarts,
            })
            console.log("From the State: " + this.state.userarts)

          })
          .catch(err => console.log(err))
        // }, 1500);
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

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyboardInput.bind(this));
  }
  
  componentDidMount() {

    api.getCodekunstDetail(this.props.match.params.codekunstId)
      .then(codekunst => {
        this.setState({
          codekunst: codekunst,
          name: codekunst.name,
          code: codekunst.code,
          thumbnail: codekunst.thumbnail,
          userarts: codekunst.userarts
        })

        //console.log('TCL: CodekunstDetail -> componentDidMount -> codekunst', codekunst)
        
        let executeArtsyCode = function(projectcode) {
          // eslint-disable-next-line
          eval(codekunst.code)
        }
        executeArtsyCode(codekunst.projectcode);
      })
      .catch(err => console.log(err))
  }
}
