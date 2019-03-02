import React, { Component } from "react";
import api from "../../api";

export default class CodekunstDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      thumbnail: "",
      userarts: [],
      codekunst: null
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
      setTimeout(() => {
        console.log("Timeout called!");
        api
          .getCodekunstDetail(this.props.match.params.codekunstId)
          .then(codekunst => {
            this.setState({
              codekunst: codekunst,
              name: codekunst.name,
              code: codekunst.code,
              thumbnail: codekunst.thumbnail,
              userarts: codekunst.userarts
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
    if (!this.state.codekunst) {
      return <div className="CodekunstDetail">Loading...</div>;
    }
    return (
      <div className="CodekunstDetail">
        <h1>CodekunstDetail</h1>
        <strong>Projectcode</strong>: {this.state.codekunst.projectcode}
        <br />
        <img
          src={this.state.codekunst.thumbnail}
          alt="codekunstimage"
          className="thumbnail"
        />
        {/* <pre style={{ textAlign: "left", margin: 20 }}>{this.state.code}</pre> SHOW CODEBLOCK, HIDDEN FOR DEV PURPOSEki */}
        <div id="box" style={{ border: "1px solid black" }} />
        <div className="d-flex flex-row">
          {this.state.codekunst.userarts.map((item, i) => (
            <div key={i}>
              <img
                src={item.pictureUrl}
                alt="userartimage"
                className="thumbnail"
              />
              <br />
              <strong>Creator: </strong>
              <em>{item._user.username}</em>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }

  componentWillMount() {
    window.addEventListener("keydown", this.handleKeyboardInput.bind(this));
    console.log("Component will mount. Eventlistener added!");
    api
      .getCodekunstDetail(this.props.match.params.codekunstId)
      .then(codekunst => {
        this.setState({
          codekunst: codekunst,
          name: codekunst.name,
          code: codekunst.code,
          thumbnail: codekunst.thumbnail,
          userarts: codekunst.userarts
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("Component did mount. Execute code with eval");

    api
      .getCodekunstDetail(this.props.match.params.codekunstId)
      .then(codekunst => {
        this.setState({
          userarts: codekunst.userarts
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
    console.log("Will updated called");
  }

  componentDidUpdate() {
    console.log("Did update called");
    console.log(
      "Userarts length when -componentDidUpdate: " + this.state.userarts.length
    );
  }

  componentWillUnmount() {
    console.log("Will unmount called");
  }
}
