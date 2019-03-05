import React, { Component } from "react";
import api from "../../api";
import SpinnerPage from '../SpinnerPage';
import CardDetail from '../CardDetail';
import ModalPage from '../ModalPage';

export default class CodekunstDetail extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    window.addEventListener("keydown", this.handleKeyboardInput.bind(this));
    this.state = {
      name: "",
      code: "",
      thumbnail: "",
      userarts: [],
      description: '',
      codekunst: null,
      saving: false
    };
  }

  handleKeyboardInput = e => {
    const code = e.keyCode ? e.keyCode : e.which;

    if (code === 83) {
      //s key
      console.log("S clicked on react, timeout and setstate!");
      console.log(
        "S clicked, before Timeout-SetState-Update length in state is " +
          this.state.userarts.length
      );
      console.log(
        "Please wait, your art is going to be saved and will appear shortly"
      );

      this.setState({
        saving: true
      })

      this._isMounted &&
      setTimeout(() => {
        console.log("Timeout called!");
        api
          .getCodekunstDetail(this.props.match.params.codekunstId)
          .then(codekunst => {
            this.setState({ //FIXME: all keys really needed to be updated?
              codekunst: codekunst,
              name: codekunst.name,
              code: codekunst.code,
              thumbnail: codekunst.thumbnail,
              userarts: codekunst.userarts,
              description: codekunst.description,
              saving: false
            });
            console.log(
              "S clicked, AFTER Timeout-SetState-Update length in state is " +
                this.state.userarts.length
            );
          })
          .catch(err => console.log(err));
      }, 3000);
    }
  };

  render() {
    setTimeout(() => {
      if (!window.location.hash) {
          window.location = window.location + '#loaded';
          window.location.reload();
      }
    }, 1)

    
    if (!this.state.codekunst) {
      return <SpinnerPage />;
    }
    return (
      <div className="Codekuenste CodekunstDetail d-flex flew-row">
        <div className="left col-6">
          {!this.state.saving && <h3><strong>Projectcode</strong>: {this.state.codekunst.projectcode}</h3>}
          {this.state.saving && <h2><SpinnerPage />Well done! Saving your art :)</h2> }
          <div className="d-flex flex-row flex-wrap">
            {this.state.codekunst.userarts.map((item, i) => (
              <div key={i}><CardDetail c={item} /></div>
              ))}
          </div>
        </div>
        <div className="right col-6">
          <ModalPage codekunst={this.state.codekunst}/>
          <div id="box" style={{ border: "0px solid white" }} />  
              {/* <pre>{this.state.codekunst.code}</pre> */}
        </div>
      </div>
    );
  }
  
  componentDidMount() {
    console.log("***** Component did mount *****")
    console.log("Execute code with eval");
    this._isMounted = true;
    this._isMounted &&
    api
      .getCodekunstDetail(this.props.match.params.codekunstId)
      .then(codekunst => {
        this.setState({
          codekunst: codekunst,
          name: codekunst.name,
          code: codekunst.code,
          thumbnail: codekunst.thumbnail,
          userarts: codekunst.userarts,
          description: codekunst.description
        });
        let executeArtsyCode = function(projectcode) {
          // eslint-disable-next-line
          eval(codekunst.code);
        };
        executeArtsyCode(codekunst.projectcode);
      })
      .catch(err => console.log(err));
  }

  componentWillUpdate() {
    console.log("***** Component will update *****")
  }

  componentDidUpdate() {
    console.log("***** Component did update *****")
    console.log(
      "Did update called. Userarts length when -componentDidUpdate: " + this.state.userarts.length
    );
  }

  componentWillUnmount() {
    console.log("***** Component will unmount *****")
    this._isMounted = false;
  }
}
